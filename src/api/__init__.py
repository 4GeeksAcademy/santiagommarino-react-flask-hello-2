# src/api/__init__.py
from flask import Blueprint

api_blueprint = Blueprint('api', __name__)

from .models import User
from .routes import *
