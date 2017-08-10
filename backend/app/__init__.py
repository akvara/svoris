import logging
import sys

from flask import request, jsonify, abort
from flask_api import FlaskAPI
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from instance.config import app_config

db = SQLAlchemy()

def create_app(config_name):
    from app.weight import Weight
    from app.pressure import Pressure

    app = FlaskAPI(__name__, instance_relative_config = True)
    CORS(app)

    app.logger.addHandler(logging.StreamHandler(sys.stdout))
    app.logger.setLevel(logging.DEBUG)

    app.config.from_object(app_config[config_name])
    app.config.from_pyfile('config.py')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    db.init_app(app)

    #=========== Weight ======================================
    @app.route('/weights/', methods=['POST', 'GET'])
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

    #=========== Pressure ======================================
    @app.route('/pressures/', methods=['POST', 'GET'])
    def pressures():
        if request.method == "POST":
            for_date = str(request.data.get('for_date', ''))
            for_hour = str(request.data.get('for_hour', ''))
            sys_data = str(request.data.get('sys', ''))
            dia_data = str(request.data.get('dia', ''))
            pul_data = str(request.data.get('pul', ''))
            if for_date and for_hour and sys_data and dia_data and pul_data:
                pressure = Pressure.query.filter_by(for_date = for_date, for_hour = for_hour).first()
                if not pressure:
                    pressure = Pressure(
                        for_date = for_date,
                        for_hour = for_hour,
                        sys = sys_data,
                        dia = dia_data,
                        pul = pul_data
                    )
                else:
                    pressure.sys = sys_data
                    pressure.dia = dia_data
                    pressure.pul = pul_data

                pressure.save()
                response = jsonify({
                    'id': pressure.id,
                    'for_date': pressure.for_date,
                    'for_hour': pressure.for_hour,
                    'sys': pressure.sys,
                    'dia': pressure.dia,
                    'pul': pressure.pul,
                    'date_created': pressure.date_created,
                    'date_modified': pressure.date_modified
                })

                response.status_code = 201
                return response
            else:
                missing = []
                if not sys_data:
                    missing.append('sys')
                if not dia_data:
                    missing.append('dia')
                if not pul_data:
                    missing.append('pul')
                if not for_date:
                    missing.append('for_date')
                if not for_hour:
                    missing.append('for_hour')

                response = jsonify({
                    'message': 'Missing: ' + (', ').join(missing),
                    'data': request.data
                })
                response.status_code = 400
                return response

        else:
            # GET
            pressures = Pressure.get_all()
            pressures.sort(key=lambda it: it.for_date, reverse=True)
            results = []

            for pressure in pressures:
                obj = {
                    'id': pressure.id,
                    'for_date': pressure.for_date,
                    'for_hour': pressure.for_hour,
                    'sys': pressure.sys,
                    'dia': pressure.dia,
                    'pul': pressure.pul,
                    'date_created': pressure.date_created,
                    'date_modified': pressure.date_modified
                }
                results.append(obj)
            response = jsonify(results)
            response.status_code = 200
            return response

    @app.route('/pressures/<int:id>', methods=['GET'])
    def pressure_manipulation(id, **kwargs):
        pressure = Pressure.query.filter_by(id = id).first()
        if not pressure:
            # Raise an HTTPException with a 404 not found status code
            abort(404)

        # GET
        response = jsonify({
            'id': pressure.id,
            'for_date': pressure.for_date,
            'for_hour': pressure.for_hour,
            'sys': pressure.sys,
            'dia': pressure.dia,
            'pul': pressure.pul,
            'date_created': pressure.date_created,
            'date_modified': pressure.date_modified
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