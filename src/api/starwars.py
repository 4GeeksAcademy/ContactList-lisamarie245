from flask import Flask, request, jsonify, url_for, Blueprint
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from api.models import db, Characters, FavoritesCharacters, Planets, FavoritesPlanets
import requests

starwars_api = Blueprint('starwarsApi', __name__)
CORS(starwars_api)

@starwars_api.route("/characters", methods=['GET'])
def character():
    response_body = {}
    url = 'https://swapi.tech/api/people/'
    response = requests.get(url)
    if response.status_code == 200: 
        data = response.json()
        for character_data in data['results']:
            detail_response = requests.get(character_data['url'])
            if detail_response.status_code == 200:
                detail_data = detail_response.json()
                properties = detail_data['result']['properties']
                character = Characters.query.filter_by(id=character_data['uid']).first()
                if not character:
                    character = Characters(id=character_data['uid'])
                    character.name = properties.get('name')
                    character.height = properties.get('height')
                    character.mass = properties.get('mass')
                    character.hair_color = properties.get('hair_color')
                    character.skin_color = properties.get('skin_color')
                    character.eye_color = properties.get('eye_color')
                    character.birth_year = properties.get('birth_year')
                    character.gender = properties.get('gender')
                db.session.add(character)
                db.session.commit()
        response_body['message'] = 'Personajes actualizados en la base de datos'
        response_body['results'] = data
        return response_body, 200
    response_body['message'] = 'Error al obtener datos de SWAPI'
    return response_body, 400

@starwars_api.route("/characters/<int:character_uid>", methods=['GET'])
def people_id(character_uid): 
    response_body = {}
    character = Characters.query.get(character_uid)
    if not character:
        response_body['message'] = "Personaje no encontrado"
        return response_body, 404
    response_body['message'] = "Detalles del personaje"
    response_body['result'] = character.serialize() 
    return response_body, 200

@starwars_api.route("/planets", methods=['GET'])
def planets():
    response_body = {}
    url = 'https://swapi.tech/api/planets/'
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        for planets_data in data['results']:
            detail_response = requests.get(planets_data['url'])
            if detail_response.status_code == 200: 
                detail_data = detail_response.json()
                properties = detail_data['result']['properties']
                planet = db.session.execute(db.select(Planets).where(Planets.id == planets_data['uid'])).scalar()
                if not planet:
                    planet = Planets(id=planets_data['uid'])
                    planet.name = properties.get('name')
                    planet.diameter = properties.get('diameter')
                    planet.rotation_period = properties.get('rotation_period')
                    planet.orbital_period = properties.get('orbital_period')
                    planet.gravity = properties.get('gravity')
                    planet.population = properties.get('population')
                    planet.climate = properties.get('climate')
                    planet.terrain = properties.get('terrain')
                db.session.add(planet)
                db.session.commit()
        response_body['message'] = 'Personajes actualizados en la base de datos'
        response_body['results'] = data
        return response_body, 200
    response_body['message'] = 'Error al obtener datos de SWAPI'
    return response_body, 400

@starwars_api.route("/planets/<int:planet_uid>", methods=['GET'])
def planet_id(planets_uid):
    response_body = {}
    planet = Planets.query.get(planets_uid)
    if not planet:
        response_body['message'] = "Personaje no encontrado"
        return response_body, 404
    response_body['message'] = "Detalles del personaje"
    response_body['result'] = planet.serialize() 
    return response_body, 200

