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

    completion = anthropic.completions.create(
        model="claude-2",
        prompt=f"{HUMAN_PROMPT} Make a story out of {AI_PROMPT}",
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
