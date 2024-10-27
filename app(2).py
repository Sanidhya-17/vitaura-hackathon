from flask import Flask, jsonify, request, send_file
import mysql.connector
import pandas as pd

app = Flask(__name__)

# MySQL Database Configuration
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="Rachit@123456",
    database="task_manager"
)

cursor = db.cursor()

@app.route('/')
def index():
    return send_file('index.html')  # Ensure you have 'index.html' in the same directory as your Flask app

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    # Replace with actual authentication logic
    # For demo purposes, let's assume the following credentials are valid
    if email == "test@example.com" and password == "password123":
        return jsonify({"message": "Login successful!"}), 200
    else:
        return jsonify({"message": "Invalid credentials"}), 401

@app.route('/tasks', methods=['GET'])
def get_tasks():
    cursor.execute("SELECT * FROM tasks")
    result = cursor.fetchall()
    tasks = [{"id": row[0], "task": row[1]} for row in result]
    return jsonify(tasks)

@app.route('/tasks', methods=['POST'])
def add_task():
    task = request.json.get('task')
    cursor.execute("INSERT INTO tasks (task) VALUES (%s)", (task,))
    db.commit()
    return jsonify({"task": task}), 201

@app.route('/tasks/<int:task_id>', methods=['DELETE'])
def delete_task(task_id):
    cursor.execute("DELETE FROM tasks WHERE id = %s", (task_id,))
    db.commit()
    return jsonify({"message": "Task deleted"}), 200

@app.route('/export', methods=['GET'])
# @app.route('/export', methods=['GET'])
def export_to_excel():
    cursor.execute("SELECT * FROM tasks")
    result = cursor.fetchall()
    tasks = [{"id": row[0], "task": row[1]} for row in result]
    df = pd.DataFrame(tasks)

    # Save to Excel
    df.to_excel("tasks.xlsx", index=False)

    return send_file("tasks.xlsx", as_attachment=True)  # Send the file for download


if __name__ == '__main__':
    app.run(debug=True)
