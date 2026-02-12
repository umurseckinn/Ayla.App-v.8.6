
const fs = require('fs');
const path = require('path');

const files = [
  'Tarot_Reading_Arcana_tr.json',
  'Tarot_Reading_Cups_tr.json',
  'Tarot_Reading_Pentacles_tr.json',
  'Tarot_Reading_Swords_tr.json',
  'Tarot_Reading_Wands_tr.json'
];

const dataDir = '/Users/umurseckin/Desktop/AYLA.app-v.8.2/src/lib/data';

function cleanRTF(content) {
  if (!content.includes('{\\rtf1')) return content;

  const firstBrace = content.indexOf('{', content.indexOf('{\\rtf1') + 1);
  const lastBrace = content.lastIndexOf('}');
  
  if (firstBrace === -1 || lastBrace === -1) return content;
  
  let jsonPart = content.substring(firstBrace, lastBrace + 1);

  jsonPart = jsonPart.replace(/\\\n/g, '');
  jsonPart = jsonPart.replace(/\\\r\n/g, '');
  jsonPart = jsonPart.replace(/\\par/g, '');
  jsonPart = jsonPart.replace(/\\f\d+\\fs\d+\s?\\cf\d+\s?/g, '');
  jsonPart = jsonPart.replace(/\\tx\d+/g, '');
  jsonPart = jsonPart.replace(/\\pardirnatural\\partightenfactor0/g, '');
  jsonPart = jsonPart.replace(/\\pard/g, '');
  
  jsonPart = jsonPart.replace(/\\uc\d+\\u(\d+)\s?/g, (match, grp) => {
    return String.fromCharCode(parseInt(grp, 10));
  });
  jsonPart = jsonPart.replace(/\\u(\d+)\s?/g, (match, grp) => {
    return String.fromCharCode(parseInt(grp, 10));
  });

  jsonPart = jsonPart.replace(/\\'([0-9a-f]{2})/g, (match, grp) => {
    const map = {
      'e7': 'ç', 'f0': 'ğ', 'fd': 'ı', 'f6': 'ö', 'fe': 'ş', 'fc': 'ü',
      'c7': 'Ç', 'd0': 'Ğ', 'dd': 'İ', 'd6': 'Ö', 'de': 'Ş', 'dc': 'Ü'
    };
    return map[grp.toLowerCase()] || match;
  });

  jsonPart = jsonPart.replace(/\\"/g, '"');
  jsonPart = jsonPart.replace(/\\\{/g, '{');
  jsonPart = jsonPart.replace(/\\\}/g, '}');

  return jsonPart;
}

files.forEach(file => {
  const filePath = path.join(dataDir, file);
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    let cleaned = cleanRTF(content).trim();
    
    // Normalize concatenated JSON objects
    // Look for }{ or } { or }\n{
    cleaned = cleaned.replace(/\}\s*\{/g, '},{');
    if (!cleaned.startsWith('[')) {
        cleaned = '[' + cleaned + ']';
    }

    // Try to parse to validate
    try {
      // Remove trailing commas before closing braces/brackets
      let finalJson = cleaned.replace(/,\s*([}\]])/g, '$1');
      
      const parsed = JSON.parse(finalJson);
      
      // Now merge them into a single list of cards
      let allCards = [];
      if (Array.isArray(parsed)) {
          parsed.forEach(item => {
              if (item.tarot_database) allCards = allCards.concat(item.tarot_database);
              else if (Array.isArray(item)) allCards = allCards.concat(item);
              else {
                  // Check for keys like tarot_database_part_X
                  const keys = Object.keys(item);
                  const partKey = keys.find(k => k.startsWith('tarot_database'));
                  if (partKey && Array.isArray(item[partKey])) {
                      allCards = allCards.concat(item[partKey]);
                  } else {
                      allCards.push(item);
                  }
              }
          });
      } else if (parsed.tarot_database) {
          allCards = parsed.tarot_database;
      } else {
          allCards = [parsed];
      }

      fs.writeFileSync(filePath, JSON.stringify(allCards, null, 2), 'utf8');
      console.log(`Successfully cleaned, merged and validated ${file}. Total cards: ${allCards.length}`);
    } catch (e) {
      console.error(`Failed to parse ${file} after cleaning: ${e.message}`);
      fs.writeFileSync(filePath + '.err', cleaned, 'utf8');
    }
  } catch (err) {
    console.error(`Error processing ${file}: ${err.message}`);
  }
});
