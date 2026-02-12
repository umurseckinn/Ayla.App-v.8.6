import json
import os
import time
import sys
from deep_translator import GoogleTranslator

def translate_value(value, translator, cache=None):
    if cache is None:
        cache = {}
        
    if isinstance(value, str):
        if not value.strip():
            return value
        
        if value in cache:
            return cache[value]
            
        max_retries = 3
        for attempt in range(max_retries):
            try:
                translated = translator.translate(value)
                if translated:
                    print(f"  OK: {value[:40]}...")
                    cache[value] = translated
                    time.sleep(0.3)  # Slightly faster but still safe
                    return translated
                else:
                    print(f"  Empty translation for: {value[:40]}...")
            except Exception as e:
                wait_time = (attempt + 1) * 2
                print(f"  Retry {attempt+1}/{max_retries} for '{value[:30]}...' after {wait_time}s error: {e}")
                time.sleep(wait_time)
        
        print(f"  FAILED translating: {value[:40]}")
        return value
        
    elif isinstance(value, dict):
        return {k: translate_value(v, translator, cache) for k, v in value.items()}
    elif isinstance(value, list):
        return [translate_value(item, translator, cache) for item in value]
    else:
        return value

def process_file(file_path):
    print(f"\n>>> STARTING: {file_path}")
    output_path = file_path.replace("_tr.json", "_en.json")
    
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
    except Exception as e:
        print(f"!!! Error reading {file_path}: {e}")
        return

    translator = GoogleTranslator(source='tr', target='en')
    
    # We use a cache to avoid translating the same string multiple times in the same file
    cache = {}
    translated_data = translate_value(data, translator, cache)
    
    try:
        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(translated_data, f, ensure_ascii=False, indent=2)
        print(f"+++ COMPLETED AND SAVED: {output_path}")
    except Exception as e:
        print(f"!!! Error saving {output_path}: {e}")

def main():
    files = [
        "/Users/umurseckin/Desktop/AYLA.app-v.8.2/src/lib/data/Tarot_Reading_Arcana_tr.json",
        "/Users/umurseckin/Desktop/AYLA.app-v.8.2/src/lib/data/Tarot_Reading_Cups_tr.json",
        "/Users/umurseckin/Desktop/AYLA.app-v.8.2/src/lib/data/Tarot_Reading_Wands_tr.json",
        "/Users/umurseckin/Desktop/AYLA.app-v.8.2/src/lib/data/Tarot_Reading_Swords_tr.json",
        "/Users/umurseckin/Desktop/AYLA.app-v.8.2/src/lib/data/Tarot_Reading_Pentacles_tr.json"
    ]
    
    for file in files:
        if os.path.exists(file):
            process_file(file)
        else:
            print(f"!!! File not found: {file}")

if __name__ == "__main__":
    main()
