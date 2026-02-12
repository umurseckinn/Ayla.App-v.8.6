import json
import re

def clean_rtf(content):
    if not content:
        return ""
    
    # Handle RTF unicode characters: \uc0\u305 -> ı, \u351 -> ş, etc.
    def replace_unicode(match):
        try:
            code = int(match.group(1))
            if code < 0:
                code += 65536
            return chr(code)
        except:
            return match.group(0)
    
    # RTF unicode patterns: \\uc0\\uN or \\uN
    content = re.sub(r'\\uc\d+\\u(\d+)\s?', replace_unicode, content)
    content = re.sub(r'\\u(\d+)\s?', replace_unicode, content)
    
    # Handle RTF special characters like \'f6 (ö), \'e7 (ç), etc.
    def replace_hex(match):
        try:
            return bytes.fromhex(match.group(1)).decode('cp1254')
        except:
            return match.group(0)
    
    content = re.sub(r"\\\'([0-9a-fA-F]{2})", replace_hex, content)
    
    # Remove RTF tags and control characters
    content = re.sub(r'\\[a-z]+\d*\s?', ' ', content)
    content = re.sub(r'[\{\}]', ' ', content)
    
    # Handle escaped quotes and newlines if any
    content = content.replace('\\"', '"').replace('\\n', ' ')
    
    # Normalize whitespace
    content = re.sub(r'\s+', ' ', content).strip()
    
    return content

def normalize_signs(signs_str):
    # Mapping for English sign names to Turkish
    en_to_tr = {
        "Aries": "Koç",
        "Taurus": "Boğa",
        "Gemini": "İkizler",
        "Cancer": "Yengeç",
        "Leo": "Aslan",
        "Virgo": "Başak",
        "Libra": "Terazi",
        "Scorpio": "Akrep",
        "Sagittarius": "Yay",
        "Capricorn": "Oğlak",
        "Aquarius": "Kova",
        "Pisces": "Balık"
    }
    
    # Order for normalization
    signs_order = ["Koç", "Boğa", "İkizler", "Yengeç", "Aslan", "Başak", "Terazi", "Akrep", "Yay", "Oğlak", "Kova", "Balık"]
    
    # Split signs (could be separated by -, / or space)
    parts = re.split(r'[-/ ]+', signs_str)
    if len(parts) < 2:
        return None
    
    s1, s2 = parts[0].strip(), parts[1].strip()
    
    # Translate if in English
    s1 = en_to_tr.get(s1, s1)
    s2 = en_to_tr.get(s2, s2)
    
    if s1 not in signs_order or s2 not in signs_order:
        return None
        
    # Sort according to signs_order
    sorted_signs = sorted([s1, s2], key=lambda x: signs_order.index(x))
    return f"{sorted_signs[0]}-{sorted_signs[1]}"

def parse_interpretations():
    file_path = '/Users/umurseckin/Desktop/AYLA.app-v.8.2/src/lib/Synastry_Interpretations_House_7-12.json'
    
    with open(file_path, 'r', encoding='utf-8') as f:
        try:
            data = json.load(f)
        except json.JSONDecodeError:
            # If it's not a valid single JSON array, try reading it as multiple arrays or blocks
            f.seek(0)
            raw_content = f.read()
            # Find all JSON-like objects or arrays
            data = []
            # This is a bit hacky but let's try to extract blocks if it's multiple arrays
            blocks = re.findall(r'\[\s*\{.*?\}\s*\]', raw_content, re.DOTALL)
            for block in blocks:
                try:
                    data.extend(json.loads(block))
                except:
                    continue
            if not data:
                # Try finding individual objects
                objects = re.findall(r'\{\s*"ozellik":.*?\}(?=\s*[,\]]|\s*$)', raw_content, re.DOTALL)
                for obj in objects:
                    try:
                        data.append(json.loads(obj))
                    except:
                        continue

    # House Mapping based on clean strings
    house_map = {
        "Ortaklık ve Evlilik Evi": "7",
        "Derin Bağ ve Tutku Evi": "8",
        "Vizyon ve İnanç Evi": "9",
        "Kariyer ve Başarı Evi": "10",
        "Sosyal Çevre ve Umutlar Evi": "11",
        "Ruhsal Bütünleşme ve Bilinçaltı Evi": "12"
    }
    
    # Results storage
    mapped_data = {str(i): {} for i in range(7, 13)}
    
    potential_matches = 0
    success_count = 0
    
    for item in data:
        ozellik = item.get('ozellik', '')
        burc_eslesmesi = item.get('burc_eslesmesi', '')
        yorum = item.get('yorum', '')
        
        if not ozellik or not burc_eslesmesi or not yorum:
            continue
            
        potential_matches += 1
        
        # Clean RTF if necessary (though this file seems clean, it doesn't hurt)
        ozellik_clean = clean_rtf(ozellik)
        yorum_clean = clean_rtf(yorum)
        
        house_num = house_map.get(ozellik_clean)
        normalized_pair = normalize_signs(burc_eslesmesi)
        
        if house_num and normalized_pair:
            # Only add if not already present (handles duplicates as requested)
            if normalized_pair not in mapped_data[house_num]:
                mapped_data[house_num][normalized_pair] = yorum_clean
                success_count += 1
            else:
                # Duplicate found, ignore as requested
                pass
        else:
            if not house_num:
                print(f"House mapping failed for: {ozellik_clean}")
            if not normalized_pair:
                print(f"Normalization failed for: {burc_eslesmesi}")

    print(f"Total potential matches found: {potential_matches}")
    print(f"Total successfully mapped interpretations: {success_count}")
    
    # Check for missing pairs in each house
    signs = ["Koç", "Boğa", "İkizler", "Yengeç", "Aslan", "Başak", "Terazi", "Akrep", "Yay", "Oğlak", "Kova", "Balık"]
    all_possible_pairs = []
    for i, s1 in enumerate(signs):
        for s2 in signs[i:]: # Use i: to only get unique pairs (normalized)
            all_possible_pairs.append(f"{s1}-{s2}")

    for house_num, data in mapped_data.items():
        missing = [p for p in all_possible_pairs if p not in data]
        print(f"House {house_num}: Mapped {len(data)}, Missing {len(missing)}")
        if missing:
            print(f"  Missing: {', '.join(missing[:5])}...")

    # Write the mapped data to a file
    with open('/Users/umurseckin/Desktop/AYLA.app-v.8.2/parsed_interpretations.json', 'w', encoding='utf-8') as f:
        json.dump(mapped_data, f, ensure_ascii=False, indent=2)

    return mapped_data

if __name__ == "__main__":
    parse_interpretations()
