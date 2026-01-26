
import { safeLocalStorage, safeJSONParse } from "./safe-utils";

const PERSISTENT_STORE_KEY = "ayla_persistent_store";

interface PersistentState {
  isPremium: boolean;
  unlockedContent: Record<string, number>; // contentId -> timestamp
}

// Helper to check if a timestamp is from today
const isToday = (timestamp: number): boolean => {
  const date = new Date(timestamp);
  const today = new Date();
  return date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();
};

const getPersistentState = (): PersistentState => {
  const data = safeLocalStorage.getItem(PERSISTENT_STORE_KEY);
  if (!data) return { isPremium: false, unlockedContent: {} };
  
  try {
    const parsed = JSON.parse(data);
    
    // Migration from old format (string[]) to new format (Record<string, number>)
    if (Array.isArray(parsed.unlockedContentIds)) {
      const newState: PersistentState = {
        isPremium: parsed.isPremium || false,
        unlockedContent: {}
      };
      
      // Assume old unlocks are from today to be safe, or expire them. 
      // Let's set them to now so they are valid for the rest of today.
      const now = Date.now();
      parsed.unlockedContentIds.forEach((id: string) => {
        newState.unlockedContent[id] = now;
      });
      
      return newState;
    }
    
    return {
        isPremium: parsed.isPremium || false,
        unlockedContent: parsed.unlockedContent || {}
    };
  } catch (e) {
    return { isPremium: false, unlockedContent: {} };
  }
};

const savePersistentState = (state: PersistentState) => {
  safeLocalStorage.setItem(PERSISTENT_STORE_KEY, JSON.stringify(state));
};

export const PersistenceManager = {
  setPremiumStatus: (isPremium: boolean) => {
    const state = getPersistentState();
    state.isPremium = isPremium;
    savePersistentState(state);
  },

  getPremiumStatus: (): boolean => {
    return getPersistentState().isPremium;
  },

  unlockContent: (contentId: string) => {
    const state = getPersistentState();
    state.unlockedContent[contentId] = Date.now();
    savePersistentState(state);
  },

  getUnlockedContent: (): string[] => {
    const state = getPersistentState();
    // Filter out expired content (not from today)
    const validIds = Object.entries(state.unlockedContent)
      .filter(([_, timestamp]) => isToday(timestamp))
      .map(([id]) => id);
      
    // Optional: Prune expired entries to keep storage clean
    if (Object.keys(state.unlockedContent).length > validIds.length) {
        const newState = { ...state, unlockedContent: {} as Record<string, number> };
        validIds.forEach(id => {
            newState.unlockedContent[id] = state.unlockedContent[id];
        });
        savePersistentState(newState);
    }
    
    return validIds;
  },

  isContentUnlocked: (contentId: string): boolean => {
    const state = getPersistentState();
    // We rely on subscriptionStatus context for premium check, 
    // this function should only check for specific content unlocks (ads/points)
    
    const timestamp = state.unlockedContent[contentId];
    if (!timestamp) return false;
    
    if (isToday(timestamp)) {
      return true;
    }
    
    return false;
  },

  // Helper to preserve data during reset
  getRawData: () => safeLocalStorage.getItem(PERSISTENT_STORE_KEY),
  restoreRawData: (data: string | null) => {
    if (data) safeLocalStorage.setItem(PERSISTENT_STORE_KEY, data);
  }
};
