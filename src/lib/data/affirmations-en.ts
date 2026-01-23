
export const ENGLISH_GENERAL_AFFIRMATIONS = [
  "My soul shines brighter every day.",
  "My soul radiates in harmony with the universe.",
  "My soul glows with infinite joy.",
  "My soul shines with determination.",
  "My soul radiates with grace.",
  "My soul pulses with cosmic rhythm.",
  "My soul never stops shining.",
  "My soul glows effortlessly.",
  "My soul shines miraculously.",
  "My soul radiates with complete confidence.",
  "My soul glows with love at its center.",
  "My soul spreads light everywhere.",
  "My soul shines with wisdom.",
  "My soul radiates with deep peace.",
  "My soul shines courageously.",
  "My soul glows with a brand new vision.",
  "My soul shines with gratitude.",
  "My soul radiates with awareness.",
  "My soul glows with self-assurance.",
  "My soul shines inspiring admiration.",
  "My soul grows stronger every day.",
  "My soul strengthens in harmony with the universe.",
  "My soul grows stronger with infinite joy.",
  "My soul strengthens with determination.",
  "My soul grows stronger with grace.",
  "My soul strengthens with cosmic rhythm.",
  "My soul never stops growing stronger.",
  "My soul strengthens effortlessly.",
  "My soul grows stronger miraculously.",
  "My soul strengthens with complete confidence.",
  "My soul grows stronger with love at its center.",
  "My soul strengthens spreading light.",
  "My soul grows stronger with wisdom.",
  "My soul strengthens with deep peace.",
  "My soul grows stronger courageously.",
  "My soul strengthens with a brand new vision.",
  "My soul grows stronger with gratitude.",
  "My soul strengthens with awareness.",
  "My soul grows stronger with self-assurance.",
  "My soul strengthens inspiring admiration.",
  "I am aligned with the cosmic flow.",
  "The universe supports every step I take.",
  "I embrace change with open arms.",
  "My intuition guides me perfectly.",
  "I am worthy of all good things.",
  "I release what no longer serves me.",
  "I trust the divine timing of my life.",
  "My energy attracts beautiful experiences.",
  "I am connected to infinite wisdom.",
  "Every challenge strengthens my spirit."
];

export const ENGLISH_COSMIC_WARNINGS = [
  "Don't let external energies distract you from your path.",
  "Trust your instincts over others' opinions today.",
  "Avoid making hasty decisions under pressure.",
  "Protect your boundaries; not everyone deserves your energy.",
  "Be mindful of overcommitting yourself today.",
  "Mercury's influence suggests double-checking communications.",
  "Guard against impulsive spending during this transit.",
  "Take time to reflect before reacting emotionally.",
  "Don't let others' negativity affect your vibration.",
  "Stay grounded when faced with uncertainty.",
  "The stars warn against rushing important decisions.",
  "Be cautious of people who drain your energy.",
  "Avoid conflict; choose diplomacy instead.",
  "Don't ignore red flags in relationships today.",
  "Take care of your physical health during this period.",
  "The cosmos advise patience over action right now.",
  "Be wary of illusions; seek the truth.",
  "Protect your peace above all else today.",
  "Don't let fear hold you back from opportunities.",
  "The universe warns against self-doubt today."
];

export const ENGLISH_FOCUS_OF_THE_DAY = [
  "Focus on self-care and inner harmony.",
  "Channel your energy into creative projects.",
  "Prioritize meaningful connections today.",
  "Direct your attention to financial planning.",
  "Focus on completing unfinished tasks.",
  "Concentrate on your spiritual growth.",
  "Put your energy into health and wellness.",
  "Focus on expressing your authentic self.",
  "Direct your efforts toward your career goals.",
  "Concentrate on nurturing relationships.",
  "Focus on learning something new today.",
  "Put your attention on home and family.",
  "Direct your energy toward personal development.",
  "Focus on releasing old patterns.",
  "Concentrate on manifesting your desires.",
  "Put your energy into helping others.",
  "Focus on finding inner peace.",
  "Direct your attention to your passions.",
  "Concentrate on building solid foundations.",
  "Focus on embracing new opportunities."
];

export const ENGLISH_DAY_TO_DAY = [
  "Today carries yesterday's momentum into new possibilities.",
  "The cosmic energy shifts, bringing fresh perspectives.",
  "Build upon recent insights for continued growth.",
  "Today's energy supports gentle transitions.",
  "The stars align for productive progress.",
  "Carry forward the lessons learned recently.",
  "Today brings opportunities for course correction.",
  "The universe offers a reset button today.",
  "Yesterday's seeds begin to sprout today.",
  "Cosmic winds shift in your favor now.",
  "Today bridges past experiences with future potential.",
  "The energy today supports consolidation.",
  "Take what you've learned into new adventures.",
  "Today's transit supports steady advancement.",
  "The flow between days brings clarity.",
  "Yesterday's challenges become today's wisdom.",
  "The cosmic rhythm supports your daily progress.",
  "Today offers space for reflection and action.",
  "The universe weaves yesterday into today's tapestry.",
  "Each day brings you closer to alignment."
];

export const ENGLISH_GUIDANCE_TEMPLATES = {
  // No dominant event scenarios
  noEvent: {
    sadLowEnergy: "Today your spirit feels a bit tired and the sky is quiet. You have no obligation other than showing yourself compassion; let the world wait for you.",
    happyHighEnergy: "Your inner joy and the cosmic void make a wonderful pair. Today you're ready to make your own rules and shine without any plans!",
    neutral: "The sky is following a calm course today. You're in the most peaceful moments for a journey of discovery in your inner world."
  },
  emotionImpact: {
    happy: "Your optimism is contagious to those around you.",
    sad: "Your sadness will deepen you.",
    neutral: "A balanced day."
  },
  eventImpact: {
    noEvent: "Right now, your focus should be on yourself.",
    positive: [
      "This positive wind from the process will create lasting beauties in your life.",
      "The stars support you every step of the way during this period.",
      "Your soul finds peace in this beautiful flow and your potential is revealed.",
      "Open your heart fully to the good news and surprises that are coming.",
      "This process is a candidate to be one of the most unforgettable and fruitful periods of your life."
    ],
    negative: [
      "Although this process challenges you, it helps you discover your true strength.",
      "Storms only exist to strengthen your roots; be patient.",
      "This experience is one of the most important tests on your soul's path to wisdom.",
      "Imagine how bright the light that comes after darkness will be.",
      "Every difficulty experienced now is part of your unshakeable character in the future."
    ]
  },
  luckyColor: "Your intuition will whisper your color to you."
};

export function getEnglishGuidance(
  isHappy: boolean,
  isSad: boolean,
  isHighEnergy: boolean,
  isLowEnergy: boolean,
  isPositiveEvent: boolean,
  hasDominantEvent: boolean,
  eventNameEn: string = "cosmic journey",
  planetEn: string = "Sun"
): {
  guidance: string;
  affirmation: string;
  warning: string;
  focus: string;
  emotionImpact: string;
  eventImpact: string;
  dayToDay: string;
  luckyColor: string;
} {
  const getRandom = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

  if (!hasDominantEvent) {
    return {
      guidance: isSad && isLowEnergy
        ? ENGLISH_GUIDANCE_TEMPLATES.noEvent.sadLowEnergy
        : isHappy && isHighEnergy
          ? ENGLISH_GUIDANCE_TEMPLATES.noEvent.happyHighEnergy
          : ENGLISH_GUIDANCE_TEMPLATES.noEvent.neutral,
      affirmation: getRandom(ENGLISH_GENERAL_AFFIRMATIONS),
      warning: getRandom(ENGLISH_COSMIC_WARNINGS),
      focus: getRandom(ENGLISH_FOCUS_OF_THE_DAY),
      emotionImpact: isHappy 
        ? ENGLISH_GUIDANCE_TEMPLATES.emotionImpact.happy 
        : isSad 
          ? ENGLISH_GUIDANCE_TEMPLATES.emotionImpact.sad 
          : ENGLISH_GUIDANCE_TEMPLATES.emotionImpact.neutral,
      eventImpact: ENGLISH_GUIDANCE_TEMPLATES.eventImpact.noEvent,
      dayToDay: getRandom(ENGLISH_DAY_TO_DAY),
      luckyColor: ENGLISH_GUIDANCE_TEMPLATES.luckyColor
    };
  }

  let guidance = "";
  if (isSad && isLowEnergy && !isPositiveEvent) {
    guidance = `Today I sense that your spirit has darkened a bit and your body has grown tired. The effects of ${eventNameEn} may be challenging you, but remember that ${planetEn}'s light is with you even in the darkest moments. Just rest and wait for the storm to pass.`;
  } else if (isSad && isHighEnergy && isPositiveEvent) {
    guidance = `Even though there's sadness in your heart, the life energy within you is still very vibrant. The effect of ${eventNameEn} offers you a tremendous opportunity; transform this high potential into creativity. ${planetEn}'s whisper will show you a new path.`;
  } else if (isHappy && isLowEnergy && isPositiveEvent) {
    guidance = `Your smile is wonderful, but your body is saying 'slow down'. Even though luck is on your side during the ${eventNameEn} process, ${planetEn} suggests you use your energy sparingly today. You can achieve great victories with small steps.`;
  } else if (isHappy && isHighEnergy && isPositiveEvent) {
    guidance = `You're at a cosmic peak! Both your joy and strength are in place, and you have the wind of ${eventNameEn} at your back. Today you can easily overcome any obstacle with ${planetEn}'s support and turn your dreams into reality.`;
  } else if (isSad && isPositiveEvent) {
    guidance = `I see that you're very unhappy today; perhaps you'd want to postpone ${eventNameEn}, but ${planetEn} says you'll be successful in this process even if you're unhappy.`;
  } else if (isLowEnergy && !isPositiveEvent) {
    guidance = `I sense that your energy is depleted and ${eventNameEn} is stressing you. ${planetEn} advises you to quietly withdraw today; sometimes the greatest victories are won by waiting silently.`;
  } else {
    guidance = `As the effect of ${eventNameEn} opens a brand new page in your life, ${planetEn} reminds you to maintain your spiritual balance. If you surrender to this flow, you'll emerge stronger at the end of the process.`;
  }

  let warning = "";
  if (isHighEnergy && !isPositiveEvent) {
    warning = `Don't let your high motivation drag you into hasty decisions about ${eventNameEn}. ${planetEn}'s warning is clear: Be patient and don't let anger cloud your vision.`;
  } else if (isLowEnergy && isPositiveEvent) {
    warning = `Beautiful opportunities are knocking at your door, but you may not feel strong enough to open it. ${planetEn} wants you to focus on just the most critical task today, not to scatter your energy.`;
  } else if (isSad && !isPositiveEvent) {
    warning = `The dark clouds in your mind may make the effect of ${eventNameEn} seem bigger than it is. ${planetEn} whispers the truth to you: Your fears are just shadows, walk towards them.`;
  } else {
    warning = getRandom(ENGLISH_COSMIC_WARNINGS);
  }

  let affirmation = "";
  if (isSad) {
    const sadAffs = [
      `With ${planetEn}'s healing light, I transform my sadness into strength. ${eventNameEn} is my path of transformation.`,
      "My tears cleanse my soul; I grow stronger with each drop.",
      "I choose to see the light within the darkness, approaching myself with compassion.",
      "This sadness is temporary, but the cosmic power within me is eternal and unshakeable.",
      "I trust my soul's deepening process, healing with the flow.",
      ...ENGLISH_GENERAL_AFFIRMATIONS.slice(0, 10)
    ];
    affirmation = getRandom(sadAffs);
  } else if (isHappy) {
    const happyAffs = [
      `My inner joy is the song of the universe. I continue to shine during ${eventNameEn}.`,
      "My happiness resonates with the stars; every moment is full of miracles.",
      "My positive energy spreads light around me; I am in complete harmony with the universe.",
      "I embrace every color of life with enthusiasm, generously sharing my joy.",
      "Every cell of my being vibrates with love and joy.",
      ...ENGLISH_GENERAL_AFFIRMATIONS.slice(10, 20)
    ];
    affirmation = getRandom(happyAffs);
  } else {
    affirmation = getRandom(ENGLISH_GENERAL_AFFIRMATIONS);
  }

  let focus = "";
  if (isLowEnergy) {
    focus = "Simplicity and spiritual purification. Today, just enjoy being and leave all complexity outside.";
  } else if (isHighEnergy) {
    focus = `Take action and finish your incomplete tasks. Today you can complete everything that's half-done with ${planetEn}'s support.`;
  } else if (isHappy) {
    focus = `Focus on sharing the joy that ${eventNameEn} brings with those around you and strengthening your social bonds.`;
  } else {
    focus = getRandom(ENGLISH_FOCUS_OF_THE_DAY);
  }

  let dayToDay = "";
  if (isHappy && isHighEnergy) {
    dayToDay = "The positive momentum from yesterday peaks today; courageously knock on every door the universe offers you.";
  } else if (isSad && isLowEnergy) {
    dayToDay = "Yesterday's fatigue gives way to acceptance today; the sky invites you to rest.";
  } else {
    dayToDay = getRandom(ENGLISH_DAY_TO_DAY);
  }

  let eventImpact = "";
  if (isPositiveEvent) {
    eventImpact = getRandom(ENGLISH_GUIDANCE_TEMPLATES.eventImpact.positive);
  } else {
    eventImpact = getRandom(ENGLISH_GUIDANCE_TEMPLATES.eventImpact.negative);
  }

  let emotionImpact = "";
  if (isHappy && isHighEnergy) {
    emotionImpact = "Today your aura is so bright that you can illuminate even the darkest rooms. Your happiness is contagious!";
  } else if (isSad && isLowEnergy) {
    emotionImpact = "Your emotions are like a deep ocean; today just let yourself float peacefully in that depth.";
  } else if (isHappy) {
    emotionImpact = "Your inner joy is powerful enough to turn every challenge you face into child's play.";
  } else if (isSad) {
    emotionImpact = "Your sadness reflects the purest and most genuine state of your soul. Live the power of giving yourself this space.";
  } else {
    emotionImpact = "Your emotional balance allows you to respond to every situation you encounter today with grace.";
  }

  return {
    guidance,
    affirmation,
    warning,
    focus,
    emotionImpact,
    eventImpact,
    dayToDay,
    luckyColor: ENGLISH_GUIDANCE_TEMPLATES.luckyColor
  };
}
