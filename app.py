from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# In-memory storage for demonstration purposes
user_database = {}

@app.route('/register', methods=['POST'])
def register():
    # Get JSON data from request body
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'message': 'Email and password are required'}), 400

    # Store email and password in the in-memory database
    if email in user_database:
        return jsonify({'message': 'User already exists'}), 400

    user_database[email] = password
    return jsonify({'message': f'User {email} registered successfully'}), 201

@app.route('/login', methods=['POST'])
def login():
    # Get JSON data from request body
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'message': 'Email and password are required'}), 400

    # Authenticate user
    if email in user_database and user_database[email] == password:
        return jsonify({'message': 'Login successful'}), 200
    else:
        return jsonify({'message': 'Unauthorized'}), 401  # Return 401 if credentials are incorrect

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000)
