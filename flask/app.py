from flask import Flask, jsonify, request
from flask_cors import CORS # import CORS from flask_cors
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
CORS(app)   # Enable CORS for all routes in your Flask app

"""
# Configure the database URI. Replace with your actual database URI
# app.config['SQLALCHEMY_DATABASE_URI'] = 'your_database_connection_string_here'
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False  # Disable Flask-SQLAlchemy modification tracking

# db = SQLAlchemy(app)

# Define your models

class Lokale(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)

class Sensor(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)

# Create tables in the database
with app.app_context():
    db.create_all()

"""
# Outcomment above code when database has been added


# List to store lokaler and sensors (replace with a DB later)
lokaler_list = []
sensors_list = []
admins_list = []

# Route to get the list of lokaler
@app.route('/lokaler', methods=['GET'])
def get_lokaler():
    return jsonify(lokaler_list)

# Route to add a new lokale
@app.route('/lokaler', methods=['POST'])
def add_lokale():
    data = request.get_json()

    if 'name' in data:
        new_lokale = {'id': len(lokaler_list) + 1, 'name': data['name']}
        lokaler_list.append(new_lokale)
        return jsonify(new_lokale), 201
    else:
        return jsonify({'error': 'Name is required'}), 400
    
# Routes for sensors
@app.route('/sensors', methods=['GET'])
def get_sensors():
    return jsonify(sensors_list)

@app.route('/sensors', methods=['POST'])
def add_sensor():
    data = request.get_json()

    if 'name' in data:
        new_sensor = {'id': len(sensors_list) + 1, 'name': data['name']}
        sensors_list.append(new_sensor)
        return jsonify(new_sensor), 201
    else:
        return jsonify({'error': 'Name is required'}), 400
    
# Routes for admins
@app.route('/admins', methods=['GET'])
def get_admins():
    return jsonify(admins_list)

@app.route('/admins', methods=['POST'])
def add_admin():
    data = request.get_json()

    if 'name' in data:
        new_admin = {'id': len(admins_list) + 1, 'name': data['name']}
        admins_list.append(new_admin)
        return jsonify(new_admin), 201
    else:
        return jsonify({'error': 'Name is required'}), 400

 #ADD REMAINING CODE FROM HERE WHEN DB HAS BEEN ADDED
"""
@app.route('/lokaler', methods=['GET'])
def get_lokaler():
    lokaler = Lokale.query.all()
    lokaler_data = [{'id': lokale.id, 'name': lokale.name} for lokale in lokaler]
    return jsonify(lokaler_data)

@app.route('/lokaler', methods=['POST'])
def add_lokale():
    data = request.get_json()

    if 'name' in data:
        new_lokale = Lokale(name=data['name'])
        db.session.add(new_lokale)
        db.session.commit()
        return jsonify({'id': new_lokale.id, 'name': new_lokale.name}), 201
    else:
        return jsonify({'error': 'Name is required'}), 400

@app.route('/sensors', methods=['GET'])
def get_sensors():
    sensors = Sensor.query.all()
    sensors_data = [{'id': sensor.id, 'name': sensor.name} for sensor in sensors]
    return jsonify(sensors_data)

@app.route('/sensors', methods=['POST'])
def add_sensor():
    data = request.get_json()

    if 'name' in data:
        new_sensor = Sensor(name=data['name'])
        db.session.add(new_sensor)
        db.session.commit()
        return jsonify({'id': new_sensor.id, 'name': new_sensor.name}), 201
    else:
        return jsonify({'error': 'Name is required'}), 400

"""



if __name__ == '__main__':
    app.run(debug=True)