# app.py

from flask import Flask, request, jsonify
from lightfm import LightFM
from lightfm.datasets import fetch_movielens
import numpy as np

app = Flask(__name__)

# Load the MovieLens dataset
data = fetch_movielens()

# Train the LightFM model
model = LightFM(loss='warp')
model.fit(data['train'], epochs=30, num_threads=2)

# Store user feedback (dummy data for demonstration purposes)
user_feedback = {}

@app.route('/recommend', methods=['POST'])
def recommend():
    try:
        user_id = int(request.json['user_id'])
        n_recommendations = int(request.json['n_recommendations'])
    except KeyError:
        return jsonify({"error": "Invalid request. 'user_id' and 'n_recommendations' are required."}), 400

    # Get recommendations for the user
    recommendations = model.predict(user_id, range(data['item_features'].shape[0]))

    # Sort recommendations by predicted scores
    recommendations = sorted(zip(data['item_labels'], recommendations), key=lambda x: -x[1])[:n_recommendations]

    return jsonify({"user_id": user_id, "recommendations": recommendations})

@app.route('/feedback', methods=['POST'])
def feedback():
    try:
        user_id = int(request.json['user_id'])
        item_id = int(request.json['item_id'])
        feedback = int(request.json['feedback'])  # Assume 1 for like, -1 for dislike
    except KeyError:
        return jsonify({"error": "Invalid request. 'user_id', 'item_id', and 'feedback' are required."}), 400

    # Update the user feedback
    user_feedback.setdefault(user_id, {})
    user_feedback[user_id][item_id] = feedback

    # Create a new matrix including the user feedback
    feedback_matrix = np.zeros_like(data['train'].toarray())
    for user, feedback_dict in user_feedback.items():
        for item, f in feedback_dict.items():
            feedback_matrix[user - 1, item - 1] = f

    # Retrain the model with the updated matrix
    model.fit(feedback_matrix, epochs=30, num_threads=2)

    return jsonify({"success": True})

if __name__ == '__main__':
    app.run(debug=True)
