import { google } from '@ai-sdk/google';
import { generateText } from 'ai';
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

const PLANETS = ['Sun', 'Moon', 'Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune', 'Pluto'];
const ASPECTS = ['conjunction', 'opposition', 'trine', 'square', 'sextile'];
const SIGNS = ['Koç', 'Boğa', 'İkizler', 'Yengeç', 'Aslan', 'Başak', 'Terazi', 'Akrep', 'Yay', 'Oğlak', 'Kova', 'Balık'];
const HOUSES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

async function seedBatch(combinations: any[]) {
  const prompt = `
    Sen bilge astrolog Ayla'sın. Aşağıdaki transit kombinasyonları için derinlemesine, samimi ve bilgece yorumlar üret.
    Her yorum 3-5 paragraf olmalı ve JSON formatında dönmelisin.
    
    Kombinasyonlar:
    ${combinations.map((c, i) => `${i + 1}. Gezegen: ${c.planet}, Açı: ${c.aspect}, Ev: ${c.house}, Burç: ${c.sign}`).join('\n')}
    
    JSON formatı şöyle olmalı:
    [
      { "planet": "...", "aspect": "...", "house": ..., "sign": "...", "interpretation": "..." },
      ...
    ]
    Sadece JSON objesini döndür, başka metin ekleme. Dil Türkçe olmalı.
  `;

  try {
    const { text } = await generateText({
      model: google('gemini-1.5-flash'),
      prompt,
    });

    const results = JSON.parse(text.replace(/```json|```/g, '').trim());
    
    for (const res of results) {
      const { error } = await supabase.from('transit_ai_interpretations').upsert({
        transit_planet: res.planet,
        aspect_type: res.aspect,
        house: res.house,
        house_sign: res.sign,
        interpretation: res.interpretation
      }, { onConflict: 'transit_planet,aspect_type,house,house_sign' });
      
      if (error) console.error('Upsert error:', error);
    }
    console.log(`Seeded ${results.length} interpretations.`);
  } catch (error) {
    console.error('Error in batch seeding:', error);
  }
}

async function main() {
  console.log('Available Env Keys:', Object.keys(process.env).filter(k => k.includes('KEY') || k.includes('API') || k.includes('GOOGLE') || k.includes('GEMINI')));
  const allCombinations = [];
  for (const planet of PLANETS) {
    for (const aspect of ASPECTS) {
      for (const house of HOUSES) {
        for (const sign of SIGNS) {
          allCombinations.push({ planet, aspect, house, sign });
        }
      }
    }
  }

  console.log(`Total combinations: ${allCombinations.length}`);
  
  // Fetch existing combinations to skip
  const { data: existing } = await supabase
    .from('transit_ai_interpretations')
    .select('transit_planet, aspect_type, house, house_sign');
  
  const existingSet = new Set(existing?.map(e => `${e.transit_planet}|${e.aspect_type}|${e.house}|${e.house_sign}`));
  
  const remainingCombinations = allCombinations.filter(c => !existingSet.has(`${c.planet}|${c.aspect}|${c.house}|${c.sign}`));
  
  console.log(`Remaining to seed: ${remainingCombinations.length}`);

    const batchSize = 10;
    const maxBatchesPerRun = 20; // Run 200 at a time

  
  for (let i = 0; i < Math.min(remainingCombinations.length, maxBatchesPerRun * batchSize); i += batchSize) {
    const batch = remainingCombinations.slice(i, i + batchSize);
    await seedBatch(batch);
    // Add a small delay to respect rate limits
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  console.log('Batch run complete.');
}

main();
