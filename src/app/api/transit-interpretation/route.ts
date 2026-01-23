import { NextResponse } from 'next/server';
import { getTransitInterpretationAsJSON, getTransitInterpretation, TransitInterpretationJSON, OrbStatus } from '@/lib/data/transit-interpretations';

export async function POST(request: Request) {
    try {
        const { transit, profile, language, format } = await request.json();

        const lang = language === 'en' ? 'en' : 'tr';
        const sign = transit.houseSign || (lang === 'en' ? 'Aries' : 'Koç');
        const orbStatus: OrbStatus = transit.orbStatus || 'applying';
        const natalPlanetKey = transit.natalPlanetKey || transit.transitPlanetKey;

        if (format === 'json') {
            const interpretationJSON: TransitInterpretationJSON = getTransitInterpretationAsJSON(
                transit.transitPlanetKey,
                natalPlanetKey,
                sign,
                transit.aspectType,
                transit.house,
                orbStatus,
                lang
            );

            return NextResponse.json({ 
                interpretation: interpretationJSON.main_text + '\n\n' + interpretationJSON.action_advice,
                data: interpretationJSON
            });
        }

        const interpretation = getTransitInterpretation(
            transit.transitPlanetKey,
            transit.house,
            sign,
            transit.aspectType,
            lang
        );

        return NextResponse.json({ interpretation });
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }
}
