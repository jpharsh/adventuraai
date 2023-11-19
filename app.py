# app.py

from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS from flask_cors

from anthropic import Anthropic, HUMAN_PROMPT, AI_PROMPT
import os
from dotenv import load_dotenv

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes by default
load_dotenv()
api_key = os.getenv("CLAUDE_API_KEY")
anthropic = Anthropic(api_key=api_key)

@app.route('/receive_data', methods=['POST'])
def receive_data():
    data = request.json  # Assuming the request contains JSON data
    print("Received data:", data)
    received_data = data.get('key', '')

    output_file_path = "output.txt"  # Choose your desired file path
    with open(output_file_path, "w") as output_file:
        completion = anthropic.completions.create(
            model="claude-2",
            prompt=f"{HUMAN_PROMPT} {received_data} Create a 1 day trip itinerary out of the data given. Format as a schedule and give as a plain text {AI_PROMPT}",
            max_tokens_to_sample=300,
            stream=True
        )

        for chunk in completion:
            print(chunk.completion, end="")
            if chunk.completion.endswith("..."):
                break
            if chunk.completion == "I'm sorry, I don't understand.":
                break

    return jsonify({'message': 'Data received successfully'})

if __name__ == '__main__':
    app.run(debug=True)
