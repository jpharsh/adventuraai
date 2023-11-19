from flask import Flask, request, jsonify
from lightfm import LightFM
from lightfm.data import Dataset

app = Flask(__name__)

# Placeholder for the trained model
model = None
dataset = None
user_dict = None
item_dict = None

@app.route('/train', methods=['POST'])
def train_model():
    global model, dataset, user_dict, item_dict

    # Assume the data is sent as JSON with the structure {"interactions": [...], "user_features": [...], "item_features": [...]}
    data = request.get_json()

    # Prepare dataset and model as before
    dataset = Dataset()
    dataset.fit(users=user_dict.values(), items=item_dict.values())

    interactions, _ = dataset.build_interactions(data['interactions'])
    
    # Assuming binary user and item features
    user_features = dataset.build_user_features(data['user_features'], normalize=False)
    item_features = dataset.build_item_features(data['item_features'], normalize=False)

    model = LightFM(loss='warp')
    model.fit(interactions, user_features=user_features, item_features=item_features, epochs=30, num_threads=2)

    return jsonify({"message": "Model trained successfully"})

@app.route('/predict/<int:user_id>', methods=['GET'])
def predict(user_id):
    global model, user_dict, item_dict

    if model is None:
        return jsonify({"error": "Model not trained yet"})

    user_id_to_predict = user_dict[user_id]
    item_ids = range(len(item_dict))

    # Assume binary user and item features
    #Users are entities for whom recommendations are being generated.
    #Items are entities that are being recommended to users.
    user_features = [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1]  # Replace with actual binary user features
    item_features = [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0]  # Replace with actual binary item features

    # Predict scores for the items
    scores = model.predict(user_id_to_predict, item_ids, user_features=user_features, item_features=item_features)

    # Rank items based on scores
    ranked_items = sorted(zip(item_ids, scores), key=lambda x: -x[1])

    # Return the top N recommendations (let's say top 5)
    top_recommendations = [{"item_id": item_id, "score": score} for item_id, score in ranked_items[:5]]

    return jsonify({"user_id": user_id, "recommendations": top_recommendations})

if __name__ == '__main__':
    app.run(debug=True)
