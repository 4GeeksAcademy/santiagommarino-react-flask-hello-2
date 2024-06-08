from flask import request, jsonify, Blueprint
from api.models import User, db
from api.utils import APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
import hashlib

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
    body = request.get_json()
    user_email = body['email']
    user_password = hashlib.sha256(body['password'].encode('utf-8')).hexdigest()
    user = User(email=user_email, password=user_password)
    db.session.add(user)
    db.session.commit()
    return jsonify(message="User created successfully"), 201

@api.route('/login', methods=['POST'])
def login():
    body = request.get_json()
    user_email = body['email']
    user_password = hashlib.sha256(body['password'].encode('utf-8')).hexdigest()
    user = User.query.filter_by(email=user_email).first()
    if user and user.password == user_password:
        access_token = create_access_token(identity=user.id)
        return jsonify(access_token=access_token), 200
    return jsonify({"msg": "Bad username or password"}), 401

@api.route('/user', methods=['GET'])
@jwt_required()
def get_user():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    return jsonify(email=user.email), 200

