from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from api.config import Config

db = SQLAlchemy()


def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(Config)
    CORS(app)

    db.init_app(app)

    from api.user.routes import user
    from api.evaluate.routes import evaluate
    from api.errors.handlers import errors

    app.register_blueprint(user, url_prefix='/api')
    app.register_blueprint(evaluate, url_prefix='/api')
    app.register_blueprint(errors)

    return app
