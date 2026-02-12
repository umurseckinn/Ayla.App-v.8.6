
import json
import re

def rtf_to_text(rtf_text):
    # Handle Unicode escapes \uNNN (with optional space delimiter)
    def replace_unicode(match):
        code = int(match.group(1))
        # RTF spec: \uN is followed by a placeholder char (often ?) 
        # but in these files it seems to be \uNNN followed by a space delimiter
        return chr(code)

    # First handle \uc0\uNNN or \uNNN
    # The space after \uNNN is a delimiter and should be consumed.
    text = re.sub(r'\\u([0-9]{3,4}) ?', replace_unicode, rtf_text)
    
    # Handle \'XX hex escapes
    def replace_hex(match):
        return bytes.fromhex(match.group(1)).decode('cp1254')
    
    text = re.sub(r"\\\'([0-9a-f]{2})", replace_hex, text)
    
    # Remove remaining RTF commands
    text = re.sub(r'\\[a-z0-9]+ ?', '', text)
    text = text.replace('\\{', '{').replace('\\}', '}')
    text = text.replace('\\\n', '')
    
    return text

def process_file(path, house_name_map):
    with open(path, 'r', encoding='utf-8') as f:
        raw = f.read()
    
    # Clean the entire RTF content first
    clean_text = rtf_to_text(raw)
    
    # Now find JSON-like objects. They should look like { "ozellik": ... }
    # Since it's cleaned text, we look for normal braces
    matches = re.findall(r'\{\s*?"ozellik":.*?"yorum":.*?\}', clean_text, re.DOTALL)
    
    data = []
    for match in matches:
        # Strategy: parse the keys and values separately using regex
        ozellik_match = re.search(r'"ozellik":\s*"(.*?)"', match)
        burc_match = re.search(r'"burc_eslesmesi":\s*"(.*?)"', match)
        yorum_match = re.search(r'"yorum":\s*"(.*?)"', match)
        
        if ozellik_match and burc_match and yorum_match:
            ozellik = ozellik_match.group(1).strip()
            burc = burc_match.group(1).strip()
            yorum = yorum_match.group(1).strip()
            
            data.append({
                "ozellik": ozellik,
                "burc_eslesmesi": burc,
                "yorum": yorum
            })
    return data

def main():
    paths = [
        '/Users/umurseckin/Desktop/AYLA.app-v.8.2/src/lib/Synastry_Interpretations_House_1-6.json',
        '/Users/umurseckin/Desktop/AYLA.app-v.8.2/src/lib/Synastry_Interpretations_House_7-12.json'
    ]
    
    house_name_map = {
        "Benlik Evi": 1,
        "Değerler Evi": 2,
        "İletişim Evi": 3,
        "Yuva Evi": 4,
        "Yaratıcılık ve Aşk Evi": 5,
        "Sağlık ve Günlük Yaşam Evi": 6,
        "Ortaklık ve Evlilik Evi": 7,
        "Derin Bağ ve Tutku Evi": 8,
        "Vizyon ve İnanç Evi": 9,
        "Kariyer ve Başarı Evi": 10,
        "Sosyal Çevre ve Umutlar Evi": 11,
        "Ruhsal Bütünleşme ve Bilinçaltı Evi": 12
    }
    
    combined_data = {}
    
    for path in paths:
        items = process_file(path, house_name_map)
        for item in items:
            house_name = item["ozellik"]
            house_num = house_name_map.get(house_name)
            
            if house_num:
                if house_num not in combined_data:
                    combined_data[house_num] = {}
                
                burc_match = item["burc_eslesmesi"]
                # Normalize key
                signs = sorted([s.strip() for s in burc_match.split('-')])
                # Ensure we use the exact Turkish names for sorting and keys
                order = ["Koç", "Boğa", "İkizler", "Yengeç", "Aslan", "Başak", "Terazi", "Akrep", "Yay", "Oğlak", "Kova", "Balık"]
                signs.sort(key=lambda x: order.index(x) if x in order else 99)
                
                normalized_key = "-".join(signs)
                combined_data[house_num][normalized_key] = item["yorum"]

    # Generate TypeScript file
    ts_content = "export const synastryAylaGuideData: Record<number, Record<string, string>> = "
    ts_content += json.dumps(combined_data, ensure_ascii=False, indent=2)
    ts_content += ";"
    
    with open('/Users/umurseckin/Desktop/AYLA.app-v.8.2/src/lib/synastry-ayla-guide-data.ts', 'w', encoding='utf-8') as f:
        f.write(ts_content)
    
    print("Successfully updated synastry-ayla-guide-data.ts")

if __name__ == "__main__":
    main()
