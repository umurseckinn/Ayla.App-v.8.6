import json
import os
import re

# Paths
parsed_json_path = '/Users/umurseckin/Desktop/AYLA.app-v.8.2/parsed_interpretations.json'
ts_file_path = '/Users/umurseckin/Desktop/AYLA.app-v.8.2/src/lib/synastry-ayla-guide-data.ts'

# Load parsed data
with open(parsed_json_path, 'r', encoding='utf-8') as f:
    parsed_data = json.load(f)

# Read the TS file
with open(ts_file_path, 'r', encoding='utf-8') as f:
    content = f.read()

def update_house(content, house_num, house_data):
    # Pattern to find the house object: "7": { ... }
    # Using a non-greedy match that respects nested braces
    pattern = rf'"{house_num}": \{{(.*?)\}}'
    
    # Format the new house data as a TS object string
    lines = []
    for pair, interpretation in house_data.items():
        # Escape double quotes in interpretation
        interpretation_escaped = interpretation.replace('"', '\\"')
        lines.append(f'    "{pair}": "{interpretation_escaped}"')
    
    new_house_content = ',\n'.join(lines)
    replacement = f'"{house_num}": {{\n{new_house_content}\n  }}'
    
    # We need a regex that matches the entire block from "house_num": { to the closing }
    # This is tricky because interpretations can contain braces (though unlikely here)
    # Let's use a simpler approach: find the start of the house and the start of the next house or the end of the object
    
    start_match = re.search(rf'"{house_num}":\s*\{{', content)
    if not start_match:
        print(f"Could not find house {house_num} in TS file")
        return content
    
    start_index = start_match.start()
    
    # Find the matching closing brace
    brace_count = 0
    end_index = -1
    for i in range(start_index, len(content)):
        if content[i] == '{':
            brace_count += 1
        elif content[i] == '}':
            brace_count -= 1
            if brace_count == 0:
                end_index = i + 1
                break
    
    if end_index == -1:
        print(f"Could not find closing brace for house {house_num}")
        return content
        
    return content[:start_index] + replacement + content[end_index:]

# Update each house
updated_content = content
for house_num in ["7", "8", "9", "10", "11", "12"]:
    if house_num in parsed_data:
        updated_content = update_house(updated_content, house_num, parsed_data[house_num])

# Write back to TS file
with open(ts_file_path, 'w', encoding='utf-8') as f:
    f.write(updated_content)

print("TS file updated successfully.")
