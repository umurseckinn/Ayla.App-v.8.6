import json

signs = ["Koç", "Boğa", "İkizler", "Yengeç", "Aslan", "Başak", "Terazi", "Akrep", "Yay", "Oğlak", "Kova", "Balık"]

def get_all_pairs():
    pairs = []
    for i in range(len(signs)):
        for j in range(i, len(signs)):
            pairs.append(f"{signs[i]}-{signs[j]}")
    return pairs

all_expected_pairs = get_all_pairs()

with open('parsed_interpretations.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

for house_num in ["7", "8", "9", "10", "11", "12"]:
    if house_num not in data:
        print(f"House {house_num} is completely missing!")
        continue
    
    existing_pairs = set(data[house_num].keys())
    missing = [p for p in all_expected_pairs if p not in existing_pairs]
    
    if missing:
        print(f"House {house_num} is missing {len(missing)} pairs: {', '.join(missing)}")
    else:
        print(f"House {house_num} is complete.")

# Check for duplicates in the original JSON source file (before parsing)
# Since the source is JSON, duplicates in keys would be overwritten by the parser.
# But we can check if the source has multiple entries that mapped to the same house-pair.
# I'll re-run a slightly modified version of the parser to check for collisions.
