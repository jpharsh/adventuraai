from flask import Flask, request, jsonify
from lightfm import LightFM
from lightfm.datasets import fetch_movielens

app = Flask(__name__)

# Load the MovieLens dataset
data = fetch_movielens()

# Train the LightFM model
model = LightFM(loss='warp')
model.fit(data['train'], epochs=30, num_threads=2)

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

if __name__ == '__main__':
    app.run(debug=True)
