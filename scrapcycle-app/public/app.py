from flask_cors import CORS
from flask import Flask, request, jsonify, render_template
from math import radians, sin, cos, sqrt, atan2

app = Flask(__name__)  # ✅ Correct

CORS(app)  # Enable CORS for all routes


# Fixed source coordinates (latitude, longitude)
source = (12.971598, 77.594566)  # Example: Bangalore, India

# Predefined dictionary of places with their coordinates
places = {
    "New York": (40.712776, -74.005974),
    "London": (51.507351, -0.127758),
    "Tokyo": (35.676192, 139.650311),
    "Paris": (48.856613, 2.352222),
    "Sydney": (-33.868820, 151.209290),
}

def haversine_distance(coord1, coord2):
    """Calculate the Haversine distance between two latitude-longitude pairs."""
    R = 6371  # Earth's radius in km

    lat1, lon1 = radians(coord1[0]), radians(coord1[1])
    lat2, lon2 = radians(coord2[0]), radians(coord2[1])

    dlat = lat2 - lat1
    dlon = lon2 - lon1

    a = sin(dlat / 2)*2 + cos(lat1) * cos(lat2) * sin(dlon / 2)*2
    c = 2 * atan2(sqrt(a), sqrt(1 - a))

    return R * c

@app.route('/')
def index():
    # Serve the HTML page when the user accesses the root URL
    return render_template('index.html')

@app.route('/find_closest', methods=['POST'])
def find_closest():
    # Get the data sent by the frontend (destination names)
    data = request.json
    destinations = data.get('destinations', [])

    if not destinations:
        return jsonify({"error": "No destinations provided"}), 400

    closest = None
    shortest_distance = float('inf')

    # Loop through the destinations and find the closest one
    for destination in destinations:
        name = destination.get('name')
        
        # Check if the name exists in the predefined places dictionary
        coords = places.get(name)
        
        if not coords:
            return jsonify({"error": f"Unknown destination: {name}"}), 400

        distance = haversine_distance(source, coords)
        if distance < shortest_distance:
            shortest_distance = distance
            closest = name

    # Return the closest destination and the distance
    return jsonify({"closest": closest, "distance": round(shortest_distance, 2)})

if __name__ == '__main__':
    # Run the app on http://127.0.0.1:5000/
    app.run(debug=True)