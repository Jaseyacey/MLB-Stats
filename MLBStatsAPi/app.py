from flask import Flask, jsonify
from flask_cors import CORS
import statsapi

app = Flask(__name__)
CORS(app)

@app.route('/api/data/<stat>/<season>', methods=['GET'])
def get_data_stat(stat, season):
    try:
        data = statsapi.league_leader_data(stat, season=int(season))
        return jsonify(data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5001)
