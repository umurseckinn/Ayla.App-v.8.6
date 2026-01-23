/**
 * Safely parses a JSON string, returning a fallback value if parsing fails.
 * Prevents application crashes due to malformed JSON in localStorage or APIs.
 */
export function safeJSONParse<T>(jsonString: string | null | undefined, fallback: T): T {
    if (!jsonString) return fallback;
    try {
        return JSON.parse(jsonString) as T;
    } catch (e) {
        console.warn('safeJSONParse failed:', e);
        return fallback;
    }
}

/**
 * Safe wrapper for localStorage to prevent SSR errors (window is undefined)
 * and handle quota exceeded errors.
 */
export const safeLocalStorage = {
    getItem: (key: string): string | null => {
        if (typeof window === 'undefined') return null;
        try {
            return localStorage.getItem(key);
        } catch (e) {
            console.warn(`Error getting item ${key} from localStorage:`, e);
            return null;
        }
    },

    setItem: (key: string, value: string): void => {
        if (typeof window === 'undefined') return;
        try {
            localStorage.setItem(key, value);
        } catch (e) {
            console.warn(`Error setting item ${key} to localStorage:`, e);
        }
    },

    removeItem: (key: string): void => {
        if (typeof window === 'undefined') return;
        try {
            localStorage.removeItem(key);
        } catch (e) {
            console.warn(`Error removing item ${key} from localStorage:`, e);
        }
    },

    clear: (): void => {
        if (typeof window === 'undefined') return;
        try {
            localStorage.clear();
        } catch (e) {
            console.warn('Error clearing localStorage:', e);
        }
    }
};
