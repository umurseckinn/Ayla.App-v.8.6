import { useState, useEffect } from "react";
import { UserLifeEvent, LIFE_EVENTS } from "@/lib/data/life-events";
import {
  getHappinessAffirmation,
  getCombinedInsights,
  getEventAffirmations
} from "@/lib/data/affirmations";

interface AffirmationData {
  affirmation: string;
  warning: string;
  guidance: string;
}

export function useAylaAffirmations(happiness: number, userEvents: UserLifeEvent[]) {
  const [data, setData] = useState<AffirmationData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAffirmations() {
      try {
        setLoading(true);

        // 1. Get Happiness Affirmation from static data
        const rangeId = Math.min(10, Math.floor(happiness / 10) + 1);
        const hapData = getHappinessAffirmation(happiness);

        // 2. Determine Active Events
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const activeEventIds = userEvents.filter(ue => {
          const eventData = LIFE_EVENTS.find(e => e.event_id === ue.event_id);
          if (!eventData) return false;

          const eventDate = new Date(ue.event_date);
          eventDate.setHours(0, 0, 0, 0);

          const diffDays = Math.floor((today.getTime() - eventDate.getTime()) / (1000 * 60 * 60 * 24));
          return (diffDays >= -eventData.anticipation_window && diffDays <= eventData.recovery_window);
        }).map(ue => ue.event_id);

        let finalAffirmation = "";
        let finalWarning = "";
        let finalGuidance = "";

        if (activeEventIds.length > 0) {
          // Get Combined Insights from static data
          const combinedData = getCombinedInsights(activeEventIds, rangeId);

          const matchedEventIds = combinedData.map(c => c.event_id);
          const unmatchedEventIds = activeEventIds.filter(id => !matchedEventIds.includes(id));

          let parts: string[] = [];
          let warningParts: string[] = [];
          let guidanceParts: string[] = [];

          // Add combined insights first
          if (combinedData.length > 0) {
            parts.push(...combinedData.map(c => c.affirmation));
            warningParts.push(...combinedData.map(c => c.warning));
            guidanceParts.push(...combinedData.map(c => c.guidance));
          } else if (hapData) {
            // Fallback to individual happiness if no combined matches
            parts.push(hapData.affirmation);
            warningParts.push(hapData.warning);
            guidanceParts.push(hapData.guidance);
          }

          // Add unmatched event affirmations from static data
          if (unmatchedEventIds.length > 0) {
            const evtData = getEventAffirmations(unmatchedEventIds);

            if (evtData.length > 0) {
              parts.push(...evtData.map(e => e.affirmation));
              warningParts.push(...evtData.map(e => e.warning));
              guidanceParts.push(...evtData.map(e => e.guidance));
            }
          }

          finalAffirmation = parts.filter(Boolean).join(" Ayrıca ");
          finalWarning = warningParts.filter(Boolean).join(" Ve unutma: ");
          finalGuidance = guidanceParts.filter(Boolean).join(" ");
        } else {
          // No active events, just show happiness
          finalAffirmation = hapData?.affirmation || "";
          finalWarning = hapData?.warning || "";
          finalGuidance = hapData?.guidance || "";
        }

        setData({
          affirmation: finalAffirmation || "Yıldızlar bugün senin için parlıyor.",
          warning: finalWarning || "Bugün dengede kalmaya odaklan.",
          guidance: finalGuidance || "İç sesini dinle ve akışta kal."
        });
      } catch (error) {
        console.error("Error fetching Ayla affirmations:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchAffirmations();
  }, [happiness, userEvents]);

  return { data, loading };
}
