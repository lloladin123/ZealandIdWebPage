from flask import Flask, jsonify, request
from flask_cors import CORS # import CORS from flask_cors

app = Flask(__name__)
CORS(app)   # Enable CORS for all routes in your Flask app

# List to store lokaler and sensors (replace with a DB later)
lokaler_list = []
sensors_list = []

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
    
# Routes for Sensors
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

    
if __name__ == '__main__':
    app.run(debug=True)