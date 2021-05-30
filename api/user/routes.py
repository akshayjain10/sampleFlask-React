from flask import Blueprint, jsonify, g
from flask_expects_json import expects_json
from api.models import Users
from api import db

user = Blueprint('user', __name__)


user_schema = {
    'type': 'object',
    'properties': {
        'first_name': {'type': 'string', "minLength": 3, "maxLength": 50},
        'last_name': {'type': 'string', "minLength": 3, "maxLength": 50},
        'date_of_birth': {'type': 'string', "minLength": 10, "maxLength": 10, "pattern": "[0-9]{4}-[0-9]{2}-[0-9]{2}"},
        'address_line_1': {'type': 'string', "minLength": 3, "maxLength": 150},
        'address_line_2': {'type': 'string', "minLength": 3, "maxLength": 150},
        'city': {'type': 'string', "minLength": 2, "maxLength": 50},
        'country': {'type': 'string', "minLength": 2, "maxLength": 50},
        'state': {'type': 'string', "minLength": 2, "maxLength": 50},
        'pincode': {'type': 'string', "minLength": 4, "maxLength": 12},
    },
    'required': ['first_name', 'date_of_birth', 'address_line_1', 'pincode']
}


@user.route("/register", methods=['POST'])
@expects_json(user_schema)
def register():
    data = g.data
    user = Users(**data)
    db.session.add(user)
    db.session.commit()

    return jsonify(message="Registration Successful"), 201
