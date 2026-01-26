"use client";
import { safeJSONParse } from "@/lib/safe-utils";
import { PersistenceManager } from "@/lib/persistence";

import React, { createContext, useContext, useState, useEffect } from "react";

export type SubscriptionStatus = 'free' | 'freemium' | 'premium';

interface ProfileContextType {
    profile: any;
    loading: boolean;
    subscriptionStatus: SubscriptionStatus;
    updateStarDust: (amount: number) => Promise<void>;
    updateProfile: (newData: any) => Promise<void>;
    setSubscriptionStatus: (status: SubscriptionStatus) => Promise<void>;
    refreshProfile: () => Promise<void>;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children }: { children: React.ReactNode }) {
    const [profile, setProfile] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [subscriptionStatus, setSubscriptionState] = useState<SubscriptionStatus>('free');

    const fetchProfile = async () => {
        try {
            // Offline mode: Always use localStorage (guest mode)
            const guestData = localStorage.getItem('ayla_user_data');
            if (guestData) {
                try {
                    const parsed = safeJSONParse(guestData, {} as any);
                    setProfile({
                        ...parsed,
                        id: parsed.id || 'guest',
                        star_dust: parsed.star_dust ?? 150,
                        aura_streak: parsed.aura_streak ?? 1,
                    });
                    if (parsed.subscription_status) {
                        setSubscriptionState(parsed.subscription_status as SubscriptionStatus);
                    }
                } catch (parseError) {
                    console.error('Failed to parse user data:', parseError);
                    setProfile(null);
                }
            } else {
                setProfile(null);
            }
        } catch (error) {
            console.error('Error fetching profile:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    const setSubscriptionStatus = async (status: SubscriptionStatus) => {
        setSubscriptionState(status);
        
        // Update persistent store
        if (status === 'premium') {
            PersistenceManager.setPremiumStatus(true);
        }

        if (profile) {
            await updateProfile({ subscription_status: status });
        } else {
             // If no profile exists yet, create a partial one in local storage
             const storageKey = 'ayla_user_data';
             const existingData = localStorage.getItem(storageKey);
             let newData = {};
             if (existingData) {
                 try {
                     newData = safeJSONParse(existingData, {});
                 } catch (e) { console.error(e); }
             }
             const updated = { ...newData, subscription_status: status };
             localStorage.setItem(storageKey, JSON.stringify(updated));
             
             // We also need to update the profile state if it was null, but usually updateProfile handles that logic better
             // Let's just use updateProfile logic which handles merging
             await updateProfile({ subscription_status: status });
        }
    };

    const updateStarDust = async (amount: number) => {
        if (!profile) return;
        const newAmount = Math.max(0, (profile.star_dust || 0) + amount);

        // Offline mode: Always persist to localStorage
        const storageKey = 'ayla_user_data';
        const existingData = localStorage.getItem(storageKey);
        if (existingData) {
            try {
                const parsed = safeJSONParse(existingData, {});
                const updated = { ...parsed, star_dust: newAmount };
                localStorage.setItem(storageKey, JSON.stringify(updated));
                setProfile({ ...profile, ...updated, star_dust: newAmount });
            } catch (parseError) {
                console.error('Failed to parse existing data:', parseError);
                const updated = { ...profile, star_dust: newAmount };
                setProfile(updated);
            }
        } else {
            // Fallback if no existing data
            const updated = { ...profile, star_dust: newAmount };
            setProfile(updated);
        }
    };

    const updateProfile = async (newData: any) => {
        // Allows creating a profile if it doesn't exist (e.g. first save)

        const storageKey = 'ayla_user_data';
        const existingData = localStorage.getItem(storageKey);
        let updatedProfile = { ...(profile || {}), ...newData };

        if (existingData) {
            try {
                const parsed = safeJSONParse(existingData, {});
                updatedProfile = { ...parsed, ...newData }; // Merge with existing to keep other fields
            } catch (parseError) {
                console.error('Failed to parse existing data:', parseError);
            }
        }

        // Ensure vital defaults if creating new
        if (!updatedProfile.id) updatedProfile.id = 'guest';
        if (updatedProfile.star_dust === undefined) updatedProfile.star_dust = 150;
        if (updatedProfile.aura_streak === undefined) updatedProfile.aura_streak = 1;

        localStorage.setItem(storageKey, JSON.stringify(updatedProfile));
        setProfile(updatedProfile);
    };

    return (
        <ProfileContext.Provider value={{ profile, loading, subscriptionStatus, updateStarDust, updateProfile, setSubscriptionStatus, refreshProfile: fetchProfile }}>
            {children}
        </ProfileContext.Provider>
    );
}

export function useProfileContext() {
    const context = useContext(ProfileContext);
    if (context === undefined) {
        throw new Error("useProfileContext must be used within a ProfileProvider");
    }
    return context;
}
