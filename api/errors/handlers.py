from flask import Blueprint, jsonify, make_response


errors = Blueprint('errors', __name__)


@errors.app_errorhandler(404)
def error_404(error):
    return make_response(jsonify({'error': 'Bad Request'}), 404)


@errors.app_errorhandler(403)
def error_403(error):
    return make_response(jsonify({'error': 'Not Authorized'}), 403)


@errors.app_errorhandler(500)
def error_500(error):
    return make_response(jsonify({'error': 'Something went wrong. Internal Server Error'}), 500)
