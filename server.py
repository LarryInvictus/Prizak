from flask import Flask, request, jsonify
import json
import os
import hashlib

app = Flask(__name__)

DB_FILE = "accounts.json"

# Create DB if missing
if not os.path.exists(DB_FILE):
    with open(DB_FILE, "w") as f:
        json.dump({}, f)

def load_accounts():
    with open(DB_FILE, "r") as f:
        return json.load(f)

def save_accounts(data):
    with open(DB_FILE, "w") as f:
        json.dump(data, f, indent=4)

def hash_password(password):
    return hashlib.sha256(password.encode()).hexdigest()

@app.route("/signup", methods=["POST"])
def signup():
    data = request.json
    username = data.get("username")
    password = data.get("password")

    if not username or not password:
        return jsonify({"status": "error", "message": "Missing fields"}), 400

    accounts = load_accounts()

    if username in accounts:
        return jsonify({"status": "error", "message": "User already exists"}), 400

    accounts[username] = hash_password(password)
    save_accounts(accounts)

    return jsonify({"status": "success", "message": "Account created"})

@app.route("/login", methods=["POST"])
def login():
    data = request.json
    username = data.get("username")
    password = data.get("password")

    accounts = load_accounts()

    if username not in accounts:
        return jsonify({"status": "error", "message": "User not found"}), 404

    if accounts[username] != hash_password(password):
        return jsonify({"status": "error", "message": "Incorrect password"}), 403

    return jsonify({"status": "success", "message": "Login successful"})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=3000)
