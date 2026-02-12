import json

def fix_json_keys():
    tr_1_6_file = '/Users/umurseckin/Desktop/AYLA.app-v.8.2/src/lib/data/Synastry_Interpretations_House_1-6_CLEANED.json'
    tr_7_12_file = '/Users/umurseckin/Desktop/AYLA.app-v.8.2/src/lib/data/Synastry_Interpretations_House_7-12_CLEANED.json'
    
    mapping = {
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
    
    for file_path in [tr_1_6_file, tr_7_12_file]:
        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        fixed_data = []
        for item in data:
            if 'ev' in item:
                house_id = item['ev']
                item['ozellik'] = mapping.get(house_id, item.get('ozellik', ''))
                del item['ev']
            fixed_data.append(item)
            
        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump(fixed_data, f, ensure_ascii=False, indent=2)

if __name__ == "__main__":
    fix_json_keys()
