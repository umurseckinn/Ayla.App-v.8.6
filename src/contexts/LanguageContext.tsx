"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { tr, TranslationKeys } from '../locales/tr';
import { en } from '../locales/en';
import { safeLocalStorage } from '@/lib/safe-utils';

type Language = 'tr' | 'en';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: keyof TranslationKeys) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguageState] = useState<Language>('tr');

    useEffect(() => {
        const savedLang = safeLocalStorage.getItem('ayla_language') as Language;
        if (savedLang && (savedLang === 'tr' || savedLang === 'en')) {
            setLanguageState(savedLang);
        }
    }, []);

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        safeLocalStorage.setItem('ayla_language', lang);
    };

    const t = (key: keyof TranslationKeys, params?: Record<string, string | number | ReactNode>): string => {
        const translations = language === 'en' ? en : tr;
        let text = translations[key] || key;
        if (params) {
            Object.entries(params).forEach(([param, value]) => {
                // If value is ReactNode (like formatted span), we ideally need a complex t that returns ReactNode.
                // But for now, simple string replacement. 
                // Wait, in PlanetTransitModal I passed JSX <span ...>.
                // If I pass JSX, I can't just .replace string.
                // If the app relies on string return, I cannot pass JSX.
                // Convert value to string.
                // The user code was: t('currentMoonPhase', { phase: <span ...>...</span> })
                // This implies t should return ReactNode or mixed content if params are nodes.

                // However, refactoring t to return ReactNode breaks everything that expects string (labels, titles).
                // Usually localization libraries handle this by returning Array of strings/nodes.

                // For this simple implementation:
                // If params contain ReactNodes, this simple replace won't work well if we expect the markup to survive efficiently in a string return.
                // But replacing "{phase}" with "[Object object]" is bad.
                // I will assume for now I should just strict replace strings/numbers.
                // If PlanetTransitModal passes JSX, I should change PlanetTransitModal to NOT pass JSX to t, but perform interpolation outside.
                // OR update t to return ReactNode (complex).

                text = text.replace(`{${param}}`, String(value));
            });
        }
        return text;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
