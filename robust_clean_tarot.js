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

function cleanContent(content) {
  // 1. Unicode escapes: \u305, \uc0\u305, etc.
  content = content.replace(/\\uc\d+\\u(\d+)\s?/g, (match, grp) => String.fromCharCode(parseInt(grp, 10)));
  content = content.replace(/\\u(\d+)\s?/g, (match, grp) => String.fromCharCode(parseInt(grp, 10)));

  // 2. Hex escapes: \'e7, \'f6, etc.
  const hexMap = {
    'e7': 'ç', 'f0': 'ğ', 'fd': 'ı', 'f6': 'ö', 'fe': 'ş', 'fc': 'ü',
    'c7': 'Ç', 'd0': 'Ğ', 'dd': 'İ', 'd6': 'Ö', 'de': 'Ş', 'dc': 'Ü',
    'e2': 'â', 'ee': 'î', 'fb': 'û'
  };
  content = content.replace(/\\'([0-9a-f]{2})/g, (match, grp) => hexMap[grp.toLowerCase()] || match);

  // 3. Remove RTF commands
  content = content.replace(/\\rtf1[^{]*/g, '');
  content = content.replace(/\\fonttbl[^{]*({[^}]*})*/g, '');
  content = content.replace(/\\colortbl[^{]*({[^}]*})*/g, '');
  content = content.replace(/\\expandedcolortbl[^{]*({[^}]*})*/g, '');
  content = content.replace(/\\paperw\d+/g, '');
  content = content.replace(/\\paperh\d+/g, '');
  content = content.replace(/\\marg\w\d+/g, '');
  content = content.replace(/\\vieww\d+/g, '');
  content = content.replace(/\\viewh\d+/g, '');
  content = content.replace(/\\viewkind\d+/g, '');
  content = content.replace(/\\pard/g, '');
  content = content.replace(/\\tx\d+/g, '');
  content = content.replace(/\\f\d+/g, '');
  content = content.replace(/\\fs\d+/g, '');
  content = content.replace(/\\cf\d+/g, '');
  content = content.replace(/\\par/g, '');
  content = content.replace(/\\uc\d+/g, '');
  content = content.replace(/\\cocoartf\d+/g, '');
  content = content.replace(/\\cocoatextscaling\d+/g, '');
  content = content.replace(/\\cocoaplatform\d+/g, '');
  content = content.replace(/\\pardirnatural/g, '');
  content = content.replace(/\\partightenfactor0/g, '');
  
  // Remove backslashes before braces and quotes
  content = content.replace(/\\\{/g, '{');
  content = content.replace(/\\\}/g, '}');
  content = content.replace(/\\"/g, '"');
  content = content.replace(/\\,/g, ',');
  
  // Final cleanup of backslashes
  content = content.replace(/\\/g, '');

  return content;
}

function findCardObjects(content) {
    const cards = [];
    let braceCount = 0;
    let startIndex = -1;
    let inString = false;
    let escape = false;

    for (let i = 0; i < content.length; i++) {
        const char = content[i];
        
        if (char === '"' && !escape) {
            inString = !inString;
        }
        
        if (!inString) {
            if (char === '{') {
                if (braceCount === 0) startIndex = i;
                braceCount++;
            } else if (char === '}') {
                braceCount--;
                if (braceCount === 0 && startIndex !== -1) {
                    const objStr = content.substring(startIndex, i + 1);
                    // Check if it's a card object
                    if (objStr.includes('"card_id"')) {
                        try {
                            // Fix trailing commas inside the string before parsing
                            const fixedObjStr = objStr.replace(/,\s*([}\]])/g, '$1');
                            const parsed = JSON.parse(fixedObjStr);
                            if (parsed.card_id !== undefined) {
                                cards.push(parsed);
                            } else {
                                // Maybe it's a container object like { "tarot_database": [...] }
                                if (parsed.tarot_database && Array.isArray(parsed.tarot_database)) {
                                    cards.push(...parsed.tarot_database);
                                } else {
                                    // Search deeper
                                    Object.values(parsed).forEach(val => {
                                        if (Array.isArray(val) && val.length > 0 && val[0].card_id !== undefined) {
                                            cards.push(...val);
                                        }
                                    });
                                }
                            }
                        } catch (e) {
                            // If parse fails, it might be truncated or have internal issues
                            // We can try to recover parts of it if needed, but for now skip
                        }
                    }
                }
            }
        }
        
        if (char === '\\') escape = !escape;
        else escape = false;
    }
    
    return cards;
}

files.forEach(file => {
  const filePath = path.join(dataDir, file);
  console.log(`Processing ${file}...`);
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const cleaned = cleanContent(content);
    const cards = findCardObjects(cleaned);
    
    // De-duplicate cards by card_id
    const uniqueCards = [];
    const seenIds = new Set();
    cards.forEach(card => {
        if (!seenIds.has(card.card_id)) {
            uniqueCards.push(card);
            seenIds.add(card.card_id);
        }
    });

    if (uniqueCards.length > 0) {
      uniqueCards.sort((a, b) => a.card_id - b.card_id);
      fs.writeFileSync(filePath, JSON.stringify(uniqueCards, null, 2), 'utf8');
      console.log(`Successfully processed ${file}. Found ${uniqueCards.length} unique cards.`);
    } else {
      console.error(`Could not extract any cards from ${file}. Saving cleaned version to .err`);
      fs.writeFileSync(filePath + '.err', cleaned, 'utf8');
    }
  } catch (err) {
    console.error(`Error processing ${file}: ${err.message}`);
  }
});
