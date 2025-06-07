import sqlite3
import os

# Connect to SQLite DB
conn = sqlite3.connect("animals.db")
cursor = conn.cursor()

# Create table
cursor.execute('''
    CREATE TABLE IF NOT EXISTS animals (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        image BLOB
    )
''')

# Function to read image file
def read_image(file_path):
    with open(file_path, 'rb') as file:
        return file.read()

# List of animal names and image file paths
animal_data = [
    ("Lion", "public/lion.jpg"),
    ("Tiger", "public/tiger.jpg"),
    ("Cat", "public/cat.jpg")
]

# Insert each animal and its image
for name, image_file in animal_data:
    if os.path.exists(image_file):
        image_blob = read_image(image_file)
        cursor.execute("INSERT INTO animals (name, image) VALUES (?, ?)", (name, image_blob))
    else:
        print(f"Image not found: {image_file}")

# Commit and close
conn.commit()
conn.close()
