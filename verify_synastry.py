import json
import os

def get_canonical_pair(pair_str, lang='tr'):
    signs = [s.strip().lower() for s in pair_str.split('-')]
    if len(signs) != 2:
        return None
    
    tr_map = {
        'koç': 'koç', 'koc': 'koç',
        'boğa': 'boğa', 'boga': 'boğa',
        'ikizler': 'ikizler',
        'yengeç': 'yengeç', 'yengec': 'yengeç',
        'aslan': 'aslan',
        'başak': 'başak', 'basak': 'başak',
        'terazi': 'terazi',
        'akrep': 'akrep',
        'yay': 'yay',
        'oğlak': 'oğlak', 'oglak': 'oğlak',
        'kova': 'kova',
        'balık': 'balık', 'balik': 'balık'
    }
    
    if lang == 'tr':
        s1 = tr_map.get(signs[0], signs[0])
        s2 = tr_map.get(signs[1], signs[1])
        # Handle İ/i encoding issues
        s1 = s1.replace('i̇', 'i').replace('ı̇', 'i')
        s2 = s2.replace('i̇', 'i').replace('ı̇', 'i')
    else:
        s1 = signs[0]
        s2 = signs[1]
        
    return tuple(sorted([s1, s2]))

def verify():
    tr_1_6_file = '/Users/umurseckin/Desktop/AYLA.app-v.8.2/src/lib/data/Synastry_Interpretations_House_1-6_CLEANED.json'
    tr_7_12_file = '/Users/umurseckin/Desktop/AYLA.app-v.8.2/src/lib/data/Synastry_Interpretations_House_7-12_CLEANED.json'
    en_file = '/Users/umurseckin/Desktop/AYLA.app-v.8.2/src/lib/data/Synastry_Interpretations_en.json'
    report_file = '/Users/umurseckin/Desktop/AYLA.app-v.8.2/synastry_missing_report.txt'
    
    mapping_tr = {
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
    
    mapping_en = {
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
    
    with open(tr_1_6_file, 'r', encoding='utf-8') as f:
        tr_1_6 = json.load(f)
    with open(tr_7_12_file, 'r', encoding='utf-8') as f:
        tr_7_12 = json.load(f)
    with open(en_file, 'r', encoding='utf-8') as f:
        en_data = json.load(f)
        
    tr_data = tr_1_6 + tr_7_12
    en_data_flat = []
    if "Synastry_Interpretations_House_1-6.json" in en_data:
        en_data_flat.extend(en_data["Synastry_Interpretations_House_1-6.json"])
    if "Synastry_Interpretations_House_7-12.json" in en_data:
        en_data_flat.extend(en_data["Synastry_Interpretations_House_7-12.json"])
    
    report_lines = []
    
    signs_tr = ["koç", "boğa", "ikizler", "yengeç", "aslan", "başak", "terazi", "akrep", "yay", "oğlak", "kova", "balık"]
    signs_en = ["aries", "taurus", "gemini", "cancer", "leo", "virgo", "libra", "scorpio", "sagittarius", "capricorn", "aquarius", "pisces"]
    
    all_pairs_tr = []
    for i in range(len(signs_tr)):
        for j in range(i + 1, len(signs_tr)):
            all_pairs_tr.append(tuple(sorted([signs_tr[i], signs_tr[j]])))
            
    all_pairs_en = []
    for i in range(len(signs_en)):
        for j in range(i + 1, len(signs_en)):
            all_pairs_en.append(tuple(sorted([signs_en[i], signs_en[j]])))
            
    total_missing_tr = 0
    total_missing_en = 0
    
    report_lines.append("SYNASTRY MISSING PAIRS REPORT")
    report_lines.append("=============================")
    
    for house_id in range(1, 13):
        tr_name = mapping_tr[house_id]
        en_name = mapping_en[house_id]
        report_lines.append(f"\n--- HOUSE {house_id}: {tr_name} / {en_name} ---")
        
        # Turkish
        house_pairs_tr = [get_canonical_pair(item['burc_eslesmesi'], 'tr') for item in tr_data if item.get('ozellik') == tr_name]
        missing_tr = [p for p in all_pairs_tr if p not in house_pairs_tr]
        total_missing_tr += len(missing_tr)
        
        # English
        house_pairs_en = [get_canonical_pair(item.get('burc_eslesmesi') or item.get('pair') or "", 'en') for item in en_data_flat if item.get('ozellik') == en_name]
        missing_en = [p for p in all_pairs_en if p not in house_pairs_en]
        total_missing_en += len(missing_en)
        
        report_lines.append(f"Turkish Missing ({len(missing_tr)}): " + (", ".join([f"{p[0]}-{p[1]}" for p in missing_tr]) if missing_tr else "None"))
        report_lines.append(f"English Missing ({len(missing_en)}): " + (", ".join([f"{p[0]}-{p[1]}" for p in missing_en]) if missing_en else "None"))
        
    report_lines.append("\n" + "="*30)
    report_lines.append(f"TOTAL MISSING TURKISH: {total_missing_tr}")
    report_lines.append(f"TOTAL MISSING ENGLISH: {total_missing_en}")
    
    with open(report_file, 'w', encoding='utf-8') as f:
        f.write("\n".join(report_lines))
        
    print(f"Report generated: {report_file}")
    print(f"Total Missing TR: {total_missing_tr}")
    print(f"Total Missing EN: {total_missing_en}")

if __name__ == "__main__":
    verify()
