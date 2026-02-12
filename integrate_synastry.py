import json
import re
import os

def normalize_sign(s):
    if not s: return ""
    # Handle Turkish İ/i issue and common variations
    s = s.replace('İ', 'i').replace('I', 'ı').lower()
    mapping = {
        'i̇': 'i', # combining dot
        'ı̇': 'i',
        'boga': 'boğa',
        'koc': 'koç',
        'yengec': 'yengeç',
        'basak': 'başak',
        'oglak': 'oğlak',
        'balik': 'balık'
    }
    for k, v in mapping.items():
        s = s.replace(k, v)
    return s.strip()

def get_canonical_pair(pair_str, lang='tr'):
    signs = [normalize_sign(s) for s in pair_str.split('-')]
    if len(signs) != 2:
        return None
    return tuple(sorted(signs))

# House mappings
tr_house_names = {
    1: "Benlik Evi",
    2: "Maddi Değerler Evi",
    3: "İletişim Evi",
    4: "Yuva ve Kökler Evi",
    5: "Aşk ve Yaratıcılık Evi",
    6: "Sağlık ve Hizmet Evi",
    7: "Ortaklık ve Evlilik Evi",
    8: "Dönüşüm ve Ortak Kaynaklar Evi",
    9: "Felsefe ve Uzak Yollar Evi",
    10: "Kariyer ve Toplum Evi",
    11: "Sosyal Çevre ve Hayaller Evi",
    12: "Ruhsal Bütünleşme ve Bilinçaltı Evi"
}

en_house_names = {
    1: "House of Self",
    2: "House of Values",
    3: "House of Communication",
    4: "Nest House",
    5: "House of Creativity and Love",
    6: "House of Health and Daily Life",
    7: "House of Partnership and Marriage",
    8: "Deep Bond and Passion House",
    9: "House of Vision and Faith",
    10: "House of Career and Success",
    11: "Social Environment and House of Hopes",
    12: "Spiritual Integration and Subconscious House"
}

# Mapping from input file variations to house ID
input_house_map = {
    "yuva ve kökler": 4,
    "sağlık ve hizmet": 6,
    "sosyal çevre ve hayaller": 11,
    "sosyal çevre ve gelecek umutları": 11,
    "house 4": 4,
    "house 6": 6,
    "house 11": 11,
    "home and roots": 4,
    "health and service": 6,
    "social circle and dreams": 11
}

def parse_missing_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    matches = re.findall(r'\{[^{}]*\}', content, re.DOTALL)
    data = []
    for m in matches:
        try:
            obj = json.loads(m)
            data.append(obj)
        except:
            try:
                cleaned = m.strip().rstrip(',')
                obj = json.loads(cleaned)
                data.append(obj)
            except:
                continue
    return data

def integrate():
    input_file = '/Users/umurseckin/Desktop/AYLA.app-v.8.2/src/lib/data/missing_synastry_tr_eng.txt'
    tr_1_6_file = '/Users/umurseckin/Desktop/AYLA.app-v.8.2/src/lib/data/Synastry_Interpretations_House_1-6_CLEANED.json'
    tr_7_12_file = '/Users/umurseckin/Desktop/AYLA.app-v.8.2/src/lib/data/Synastry_Interpretations_House_7-12_CLEANED.json'
    en_file = '/Users/umurseckin/Desktop/AYLA.app-v.8.2/src/lib/data/Synastry_Interpretations_en.json'
    
    new_data = parse_missing_file(input_file)
    print(f"Parsed {len(new_data)} items")
    
    with open(tr_1_6_file, 'r', encoding='utf-8') as f:
        tr_1_6 = json.load(f)
    with open(tr_7_12_file, 'r', encoding='utf-8') as f:
        tr_7_12 = json.load(f)
    with open(en_file, 'r', encoding='utf-8') as f:
        en_data = json.load(f)
    
    # Remove any existing items with 'ev' key (cleanup from previous run)
    tr_1_6 = [item for item in tr_1_6 if 'ev' not in item]
    tr_7_12 = [item for item in tr_7_12 if 'ev' not in item]
    
    tr_updates = 0
    en_updates = 0
    
    for item in new_data:
        lang = item.get('dil', '').lower()
        house_name_in = item.get('ozellik', '')
        pair_str = item.get('burc_eslesmesi', '')
        comment = item.get('yorum', '')
        
        # Determine house ID
        house_id = None
        for key, val in input_house_map.items():
            if key in house_name_in.lower():
                house_id = val
                break
        
        if not house_id:
            num_match = re.search(r'(\d+)', house_name_in)
            if num_match:
                house_id = int(num_match.group(1))
        
        # print(f"DEBUG: lang='{lang}', house='{house_name_in}', house_id={house_id}")
        
        if not house_id:
            # print(f"Skipping item due to no house_id: {house_name_in}")
            continue
            
        if lang in ['türkçe', 'turkce', 'tr']:
            pair = get_canonical_pair(pair_str, 'tr')
            if pair:
                target_list = tr_1_6 if 1 <= house_id <= 6 else tr_7_12
                target_house_name = tr_house_names[house_id]
                
                # Check for duplicates ONLY in the target house
                exists = False
                for existing in target_list:
                    if existing.get('ozellik') == target_house_name:
                        existing_pair = get_canonical_pair(existing.get('burc_eslesmesi', ''), 'tr')
                        if existing_pair == pair:
                            exists = True
                            break
                
                if not exists:
                    # print(f"DEBUG: Integrating TR: {target_house_name} - {pair}")
                    target_list.append({
                        "ozellik": target_house_name,
                        "burc_eslesmesi": f"{pair[0].capitalize()}-{pair[1].capitalize()}",
                        "yorum": comment
                    })
                    tr_updates += 1
                else:
                    # Optional: Print if it exists to verify why it's not integrating
                    # print(f"DEBUG: TR Already exists in {target_house_name}: {pair}")
                    pass
                    
        elif lang in ['english', 'en']:
            pair = get_canonical_pair(pair_str, 'en')
            if pair:
                target_key = "Synastry_Interpretations_House_1-6.json" if 1 <= house_id <= 6 else "Synastry_Interpretations_House_7-12.json"
                target_house_name = en_house_names[house_id]
                
                if target_key not in en_data:
                    en_data[target_key] = []
                
                # Check for duplicates ONLY in the target house
                exists = False
                for existing in en_data[target_key]:
                    if existing.get('ozellik') == target_house_name:
                        existing_pair = get_canonical_pair(existing.get('burc_eslesmesi', ''), 'en')
                        if existing_pair == pair:
                            exists = True
                            # print(f"DEBUG: EN Duplicate found in {target_house_name}: {pair}")
                            break
                
                if not exists:
                    # print(f"DEBUG: Integrating EN: {target_house_name} - {pair}")
                    en_data[target_key].append({
                        "ozellik": target_house_name,
                        "burc_eslesmesi": f"{pair[0].capitalize()}-{pair[1].capitalize()}",
                        "yorum": comment
                    })
                    en_updates += 1

    # Save
    with open(tr_1_6_file, 'w', encoding='utf-8') as f:
        json.dump(tr_1_6, f, ensure_ascii=False, indent=4)
    with open(tr_7_12_file, 'w', encoding='utf-8') as f:
        json.dump(tr_7_12, f, ensure_ascii=False, indent=4)
    with open(en_file, 'w', encoding='utf-8') as f:
        json.dump(en_data, f, ensure_ascii=False, indent=4)
        
    print(f"Done! Integrated {tr_updates} Turkish and {en_updates} English interpretations.")

if __name__ == "__main__":
    integrate()
