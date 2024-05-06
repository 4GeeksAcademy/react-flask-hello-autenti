"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from werkzeug.security import generate_password_hash, check_password_hash
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/signup', methods=['POST'])
def signup():
    # Obtener datos del cuerpo de la solicitud
    data = request.json
    email = data.get('email')
    password = data.get('password')

    # Verificar si el usuario ya existe en la base de datos
    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        raise APIException('Usuario ya registrado', status_code=400)

    # Crear un nuevo usuario
    new_user = User(email=email, password=generate_password_hash(password), is_active=True)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'Usuario registrado exitosamente'}), 201

@api.route('/login', methods=['POST'])
def login():
    # Obtener datos del cuerpo de la solicitud
    data = request.json
    email = data.get('email')
    password = data.get('password')

    # Verificar si el usuario existe en la base de datos
    user = User.query.filter_by(email=email).first()
    if not user or not check_password_hash(user.password, password):
        raise APIException('Credenciales inválidas', status_code=401)

    # En este punto, las credenciales son válidas
    # Aquí es donde normalmente crearías y devolverías un token JWT
    # Por ahora, simplemente devolvemos un mensaje de éxito
    return jsonify({'message': 'Inicio de sesión exitoso'}), 200