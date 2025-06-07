from flask import Flask, jsonify, send_file
from flask_cors import CORS
import sqlite3
import io
import os

app = Flask(__name__)
CORS(app)

# Get absolute path to animals.db in project root
DB_PATH = os.path.join(os.path.dirname(os.path.dirname(__file__)), "animals.db")

def get_animals():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("SELECT id, name FROM animals")
    animals = [{"id": row[0], "name": row[1]} for row in cursor.fetchall()]
    conn.close()
    return animals

@app.route("/api/animals")
def animals():
    try:
        return jsonify(get_animals())
    except Exception as e:
        print("Error in /api/animals:", e)
        return {"error": str(e)}, 500

@app.route("/api/animal_image/<int:animal_id>")
def animal_image(animal_id):
    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        cursor.execute("SELECT image FROM animals WHERE id=?", (animal_id,))
        row = cursor.fetchone()
        conn.close()
        if row and row[0]:
            return send_file(io.BytesIO(row[0]), mimetype="image/jpeg")
        return "", 404
    except Exception as e:
        print("Error in /api/animal_image:", e)
        return {"error": str(e)}, 500

if __name__ == "__main__":
    app.run(port=5000)
    