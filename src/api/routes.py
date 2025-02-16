"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from api.models import db, Users, Posts


api = Blueprint('api', __name__)
CORS(api)  # Allow CORS requests to this API


@api.route('/users', methods = ['GET'])
def users():
    response_body = {}
    if request.method == 'GET':
        rows = db.session.execute(db.select(Users)).scalars()
        result = [ row.serialize() for row in rows]
        response_body['message'] = f'Listado de usuarios'
        response_body['results'] = result
        return response_body, 200  

# CRUD DE LAS APLICACIONES
@api.route('/posts', methods=['GET', 'POST'])
def posts():
    response_body = {}
    if request.method == 'GET':
        rows = db.session.execute(db.select(Posts)).scalars()
        result = [ row.serialize() for row in rows]
        response_body['message'] = f'Listado de publicaciones de todos los usuarios'
        response_body['results'] = result
        return response_body, 200     
    if request.method == 'POST':
        data = request.json
        row = Posts(title=data.get('title'),
                    description=data.get('description'),
                    body=data['body'],
                    image_url=data['image_url'],
                    user_id=data['user_id'])
        db.session.add(row)
        db.session.commit()
        response_body['message'] = f'Response from the {request.method}'
        response_body['results'] = data
        return response_body, 200

@api.route('/posts/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def post(id): 
    response_body = {}
    row = db.session.execute(db.select(Posts).where(Posts.id == id)).scalar()
    if not row:
        response_body['message'] = f'La publicacion con el id: {id} no existe en nuestros registros'
        return response_body, 400
    if request.method == 'GET':
        response_body['message'] = f'Response from the {request.method} para el id {id}'
        response_body['results'] = row.serialize()    
        return response_body, 200 
    if request.method == 'PUT':
        data = request.json
        row.title = data['title']
        row.description = data['description']
        row.body = data['body']
        row.image_url = data['image_url']
        row.user_id = data['user_id']
        db.session.commit()
        response_body['message'] = f'Response from the {request.method} para el id {id}'
        response_body['results'] = row.serialize() 
        return response_body, 200
    if request.method == 'DELETE':
        db.session.delete(row)
        db.session.commit()
        response_body['message'] = f'Response from the {request.method} para el id {id}'
        response_body['results'] = row.serialize() 
        return response_body, 200
    


@api.route('/hello', methods=['GET'])
def handle_hello():
    response_body = {}
    response_body['message'] = "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    return response_body, 200


# Todas las publicaciones de un usuario 

@api.route('/users/<int:user_id>/posts', methods=['GET'])
def users_posts(user_id):
    response_body = {}
    response_body['message'] = "Todos las publicaciones de un usuario"
    return response_body, 200

@api.route('/posts/<int:post_id>/comments', methods=['GET'])
def posts_comments(post_id):
    response_body = {}
    response_body['message'] = "Todos los comentarios de mi posts"
    return response_body, 200


@api.route('/people', methods=['GET'])
def characters():
    response_body = {}
    url = 'https:/www.swapi.tech/api/people/'
    response = request.get(url)
    if response.status_code == 200: 
        data = response.json() 
        response_body['results'] = data 
        return response_body, 200









# Create a route to authenticate your users and return JWTs. The
# create_access_token() function is used to actually generate the JWT.
# @api.route("/login", methods=["POST"])
# def login():
    username = request.json.get("username", None)
    password = request.json.get("password", None)
    if username != "test" or password != "test":
        return jsonify({"msg": "Bad username or password"}), 401

    access_token = create_access_token(identity=username)
    return jsonify(access_token=access_token)