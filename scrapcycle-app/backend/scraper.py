import requests
from bs4 import BeautifulSoup
from flask import Flask, jsonify
from flask_cors import CORS  # Import CORS to fix frontend issues

app = Flask(__name__)
CORS(app)  # Enable CORS to allow frontend requests

URL = "https://www.dailymetalprice.com/"  # Replace with actual URL

def scrape_metal_prices():
    try:
        response = requests.get(URL)
        response.raise_for_status()  # Raise an error for bad HTTP status codes
        soup = BeautifulSoup(response.text, 'html.parser')

        data = []
        table = soup.find("table")  # Assuming the prices are inside a <table>
        
        if table:
            rows = table.find_all("tr")[1:]  # Skip the header row

            for row in rows:
                cols = row.find_all("td")
                if len(cols) >= 3:  # Ensure there are enough columns
                    metal = cols[0].text.strip()
                    price = cols[1].text.strip()
                    date = cols[2].text.strip()
                    data.append({"metal": metal, "price": price, "date": date})
        else:
            print("No table found on the page. Check the page structure.")

        return data if data else [{"error": "No data found"}]  # Return a default error if no data found

    except requests.RequestException as e:
        print(f"Error fetching data: {e}")
        return [{"error": "Failed to fetch metal prices"}]  # Return error as JSON

@app.route("/scrape", methods=["GET"])
def get_metal_prices():
    print("Scrape route was hit!")
    metals = scrape_metal_prices()
    return jsonify(metals)

if __name__ == "__main__":
    app.run(debug=True, port=5000)  # Run Flask on port 5001
