#!/bin/bash

echo "Starting React frontend..."
npm start &

echo "Activating Python virtual environment..."
cd backend
venv/Scripts/activate


cd amazon
echo "Installing Python dependencies..."
pip install -r requirements.txt

# Run the Flask app
echo "Starting Flask backend..."
python app.py