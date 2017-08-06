from flask_api import FlaskAPI
from flask_cors import CORS, cross_origin
from flask_sqlalchemy import SQLAlchemy
from flask import request, jsonify, abort
from instance.config import app_config
import logging
import sys

db = SQLAlchemy()

def create_app(config_name):
    from app.models import Weight

    app = FlaskAPI(__name__, instance_relative_config = True)
    CORS(app)
    # cors = CORS(app, resources={r"/*": {"origins": "*"}})

    app.logger.addHandler(logging.StreamHandler(sys.stdout))
    app.logger.setLevel(logging.DEBUG)

    logging.debug('This message should go to the log file')
    logging.info('So should this')
    logging.warning(config_name)

    app.config.from_object(app_config[config_name])
    app.config.from_pyfile('config.py')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    db.init_app(app)

    @app.route('/weights/', methods=['POST', 'GET'])
    # @cross_origin()
    def weights():
        if request.method == "POST":
            for_date = str(request.data.get('for_date', ''))
            weight_data = str(request.data.get('weight', ''))
            if for_date and weight_data and weight_data.replace('.','',1).isdigit():
                weight = Weight.query.filter_by(for_date = for_date).first()
                if not weight:
                    weight = Weight(for_date = for_date, weight = weight_data)
                else:
                    weight.weight = weight_data
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
                missing = []
                if not weight_data:
                    missing.append('weight')
                if not for_date:
                    missing.append('for_date')

                response = jsonify({
                    'message': 'Missing: ' + (', ').join(missing),
                    'data': request.data
                })
                response.status_code = 400
                return response

        else:
            # GET
            weights = Weight.get_all()
            weights.sort(key=lambda it: it.for_date, reverse=True)
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
        weight = Weight.query.filter_by(id = id).first()
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

    # @app.after_request
    # def after_request(response):
    #     response.headers.add('Access-Control-Allow-Origin', '*')
    #     response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    #     response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    #     return response

    return app