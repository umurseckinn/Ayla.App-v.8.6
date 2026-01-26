
import { safeLocalStorage, safeJSONParse } from "./safe-utils";

const PERSISTENT_STORE_KEY = "ayla_persistent_store";

interface PersistentState {
  isPremium: boolean;
  unlockedContentIds: string[];
}

const getPersistentState = (): PersistentState => {
  const data = safeLocalStorage.getItem(PERSISTENT_STORE_KEY);
  if (!data) return { isPremium: false, unlockedContentIds: [] };
  return safeJSONParse(data, { isPremium: false, unlockedContentIds: [] });
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
    if (!state.unlockedContentIds.includes(contentId)) {
      state.unlockedContentIds.push(contentId);
      savePersistentState(state);
    }
  },

  getUnlockedContent: (): string[] => {
    return getPersistentState().unlockedContentIds;
  },

  isContentUnlocked: (contentId: string): boolean => {
    const state = getPersistentState();
    return state.isPremium || state.unlockedContentIds.includes(contentId);
  },

  // Helper to preserve data during reset
  getRawData: () => safeLocalStorage.getItem(PERSISTENT_STORE_KEY),
  restoreRawData: (data: string | null) => {
    if (data) safeLocalStorage.setItem(PERSISTENT_STORE_KEY, data);
  }
};
