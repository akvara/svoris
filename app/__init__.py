from flask_api import FlaskAPI
from flask_sqlalchemy import SQLAlchemy
from flask import request, jsonify, abort
from instance.config import app_config

db = SQLAlchemy()

def create_app(config_name):
    from app.models import Weight

    app = FlaskAPI(__name__, instance_relative_config = True)
    app.config.from_object(app_config[config_name])
    app.config.from_pyfile('config.py')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    db.init_app(app)

    @app.route('/weights/', methods=['POST', 'GET'])
    def weights():
        if request.method == "POST":
            for_date = str(request.data.get('for_date', ''))
            weight = str(request.data.get('weight', ''))
            if for_date and weight:
                weight = Weight(for_date = for_date, weight = weight)
                weight.save()
                response = jsonify({
                    'id': weight.id,
                    'for_date': weight.for_date,
                    'weight': weight.weight,
                    'date_created': weight.date_created,
                    'date_modified': weight.date_modified
                })
                response.status_code = 201
                return response
        else:
            # GET
            weights = Weight.get_all()
            results = []

            for weight in weights:
                obj = {
                    'id': weight.id,
                    'for_date': weight.for_date,
                    'weight': weight.weight,
                    'date_created': weight.date_created,
                    'date_modified': weight.date_modified
                }
                results.append(obj)
            response = jsonify(results)
            response.status_code = 200
            return response

    @app.route('/weights/<int:id>', methods=['GET'])
    def weight_manipulation(id, **kwargs):
        # retrieve a buckelist using it's ID
        weight = Weight.query.filter_by(id=id).first()
        if not weight:
            # Raise an HTTPException with a 404 not found status code
            abort(404)

        # GET
        response = jsonify({
            'id': weight.id,
            'for_date': weight.for_date,
            'weight': weight.weight,
            'date_created': weight.date_created,
            'date_modified': weight.date_modified
        })
        response.status_code = 200
        return response

    return app