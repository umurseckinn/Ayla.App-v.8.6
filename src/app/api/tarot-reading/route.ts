import { NextResponse } from 'next/server';
import { generatePersonalizedReading, TarotTopic } from '@/lib/tarot-engine';
import { AstroModifier } from '@/lib/tarot-engine-data';

export async function POST(request: Request) {
  try {
    const { cards, topic, dominantElement, birthChartHouses, language } = await request.json();

    const interpretation = generatePersonalizedReading({
      cards,
      topic: topic as TarotTopic,
      dominantElement: dominantElement as keyof AstroModifier,
      birthChartHouses,
      language: language || 'tr'
    });

    return NextResponse.json({ interpretation });
  } catch (error) {
    console.error('Tarot API Error:', error);
    return NextResponse.json({ error: 'Failed to generate tarot reading' }, { status: 500 });
  }
}
