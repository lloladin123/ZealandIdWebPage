from flask import Flask, jsonify, request
from flask_cors import CORS
import pyodbc

app = Flask(__name__)
CORS(app)   # Enable CORS for all routes in your Flask app

# SQL server connection details
server = 'mssql11.unoeuro.com'
database = 'zealandid_dk_db_test'
username = 'zealandid_dk'
password = '4tn2gwfADdeRB5EGzm6b'

# Create connection string
connection_string = f'DRIVER=ODBC Driver 18 for SQL Server;SERVER={server};DATABASE={database};UID={username};PWD={password}'

# Create connection to DB
connection = pyodbc.connect(connection_string)

# Create a cursor to execute SQL queries
cursor = connection.cursor()

"""
# List to store lokaler and sensors (replace with a DB later)
# lokaler_list = []
# sensors_list = []
# admins_list = []

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

"""

# Routes for lokaler
@app.route('/lokaler', methods=['GET'])
def get_lokaler():
    cursor.execute('SELECT * FROM Lokale')
    lokaler_data = [{ 'LokaleId': row.LokaleId, 'Navn': row.Navn, 'SensorId': row.SensorId } for row in cursor.fetchall()]
    return jsonify(lokaler_data)
    
@app.route('/lokaler', methods=['POST'])
def add_lokale():
    data = request.get_json()

    if 'Navn' in data and 'SensorId' in data:
        cursor.execute('INSERT INTO Lokale (Navn, SensorId) VALUES (?, ?)', data['Navn'], data['SensorId'])
        connection.commit()
        return jsonify({'LokaleId': cursor.lastrowid, 'Navn': data['Navn'], 'SensorId': data['SensorId']}), 201
    else:
        return jsonify({'error': 'Navn and SensorId are required'}), 400

# Routes for sensors
@app.route('/sensor', methods=['GET'])
def get_sensors():
    cursor.execute('SELECT * FROM Sensor')
    sensor_data = [{'id': row.id, 'name': row.name} for row in cursor.fetchall()]
    return jsonify(sensor_data)

@app.route('/sensor', methods=['POST'])
def add_sensor():
    data = request.get_json()

    if 'name' in data:
        cursor.execute('INSERT INTO Sensor (name) VALUES (?)', data['name'])
        connection.commit()
        return jsonify({'id': cursor.lastrowid, 'name': data['name']}), 201
    else:
        return jsonify({'error': 'Name is required'}), 400

   
if __name__ == '__main__':
    app.run(debug=True)