from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Home route for '/'
@app.route('/', methods=['GET'])
def index():
    return jsonify({'message': 'This is the homepage of the Asifunde API!'})

# API route for '/api'
@app.route('/api', methods=['GET'])
def home():
    return jsonify({'message': 'Welcome to the Asifunde API!'})

if __name__ == '__main__':
    app.run(debug=True)
