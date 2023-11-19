# app.py

from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS from flask_cors
import claude_ai


app = Flask(__name__)
CORS(app)  # Enable CORS for all routes by default

@app.route('/receive_data', methods=['POST'])
def receive_data():
    data = request.json  # Assuming the request contains JSON data
    print("Received data:", data)

    # Process the received data as needed
    # ...

    return jsonify({'message': 'Data received successfully'})

if __name__ == '__main__':
    app.run(debug=True)
