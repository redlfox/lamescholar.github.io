import json

# Load your original JSON file
with open("dictionary.json", "r", encoding="utf-8") as f:
    raw_data = json.load(f)

# Convert to the correct format
converted_data = [
    {"word": word, "definition": definition}
    for word, definition in raw_data.items() if not word.startswith("##")  # Skip metadata
]

# Save the new JSON file
with open("converted_dictionary.json", "w", encoding="utf-8") as f:
    json.dump(converted_data, f, ensure_ascii=False, indent=4)

print("✅ Conversion complete! Saved as 'converted_dictionary.json'")