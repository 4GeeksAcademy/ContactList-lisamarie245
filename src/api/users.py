from flask import Flask, request, jsonify, url_for, Blueprint
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from api.models import db, Users, FavoritesCharacters, FavoritesPlanets
import requests
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import get_jwt
from flask_jwt_extended import create_access_token


users_api = Blueprint('usersApi', __name__)
CORS(users_api ) 


@users_api.route('/users', methods = ['GET', 'POST'])
def users():
    response_body = {}
    if request.method == 'GET':
        rows = db.session.execute(db.select(Users)).scalars()
        result = [ row.serialize() for row in rows]
        response_body['message'] = f'Listado de usuarios'
        response_body['results'] = result
        return jsonify(response_body), 200  
    if request.method == 'POST': 
        response_body = {}
        data = request.json
        if not data.get('email') or not data.get('password'):
            return jsonify({"message": "Email, username y password son requeridos"}), 400
        new_user = Users(username=data.get('username'),
                    email=data.get('email'),
                    password=data.get('password'),
                    is_active=True)
        rowdb = db.session.execute(db.select(Users).where(Users.username == data.get('username'), Users.password == data.get('password'))).scalar()
        if rowdb:
            response_body['message'] = f'El usuario ya existe'
            return response_body, 401
        db.session.add(new_user)
        db.session.commit()
        claims = {"user_id": new_user.id, "email": new_user.email}
        access_token = create_access_token(identity=new_user.email, additional_claims=claims)
        response_body['message'] = f'El usuario se ha agregado exitosamente.'
        response_body['access_token'] = access_token
        response_body['results'] = new_user.serialize()
        return response_body, 201 

@users_api.route('/users/<int:id>', methods=['GET'])
@jwt_required()
def user_get(id):
    response_body = {}
    additional_claims = get_jwt()
    user_id = additional_claims["user_id"]
    if id != user_id: 
        return jsonify({"msg": "Unauthorized"}), 401
    row = db.session.execute(db.select(Users).where(Users.id == id)).scalar()
    if not row:
        response_body['message'] = 'Usuario no encontrado'
        return jsonify(response_body), 404
    response_body['results'] = row.serialize()
    return jsonify(response_body),200


@users_api.route('/users/favorites', methods=['GET'])
@jwt_required()
def favorites():
    response_body = {}
    additional_claims = get_jwt()
    current_user_id = additional_claims["user_id"]
    fav_planets = FavoritesPlanets.query.filter_by(user_id=current_user_id).all()
    planets_list = [{
            "id": fav.planet_id,
            "name": fav.planet_to.name if fav.planet_to else None
    } for fav in fav_planets]
    fav_characters = FavoritesCharacters.query.filter_by(user_id=current_user_id).all()
    characters_list = []
    for fav in fav_characters:
        characters_list.append({
            "id": fav.character_id,
            "name": fav.character_to.name 
        })
    response_body = {
        "planets": planets_list,
        "characters": characters_list }
    return jsonify(response_body), 200

@users_api.route('/favorite/planet/<int:planet_id>', methods=['POST', 'DELETE'])
@jwt_required()
def add_favorite_planet(planet_id):
    response_body = {}
    current_user_id = get_jwt()["user_id"]
    if request.method == 'POST':
        user_id =current_user_id
        new_favorite = FavoritesPlanets(
                        user_id=user_id,
                        planet_id=planet_id)
        db.session.add(new_favorite)
        db.session.commit()
        response_body['message'] = f'Has agregado el planeta {planet_id} a tu lista de favoritos'
        return jsonify(response_body),201
    if request.method == 'DELETE':
        favorite = FavoritesPlanets.query.filter_by(
                    user_id=current_user_id,
                    planet_id=planet_id).first()
        if not favorite:
            return jsonify({"message": "El planeta no estaba en favoritos"}), 404
        db.session.delete(favorite)
        db.session.commit()
        response_body['message'] = f"El planeta {planet_id} eliminado de favoritos correctamente"
        return jsonify(response_body), 200



@users_api.route("/favorite/character/<int:character_id>", methods=['POST', 'DELETE'])
@jwt_required()
def favorite_character(character_id):
    response_body = {}
    current_user_id = get_jwt()["user_id"]
    if request.method == 'POST':
        new_favorite = FavoritesCharacters(
            user_id=current_user_id,
            character_id=character_id)
        db.session.add(new_favorite)
        db.session.commit()
        response_body['message'] = f'Has agregado el personaje {character_id} a tu lista de favoritos'
        return jsonify(response_body),201
    if request.method == 'DELETE':
        favorite = FavoritesCharacters.query.filter_by(
            user_id=current_user_id,
            character_id=character_id
        ).first()
        if not favorite:
            return jsonify({"message": "El personaje no estaba en favoritos"}), 404
        db.session.delete(favorite)
        db.session.commit()
        response_body['message'] = f"El personaje {character_id} eliminado de favoritos correctamente"
        return jsonify(response_body), 200

    