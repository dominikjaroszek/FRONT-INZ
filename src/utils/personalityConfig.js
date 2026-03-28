export const FOOTBALL_PROFILE_MAP = {
  "Konfrontator": "Agresor",
  "Stabilizator": "Defensor",
  "Analityk": "Strateg",
  "Poszukiwacz Doznań": "Kibic Adrenaliny"
};

export const PERSONALITY_PRESETS = {
  "Konfrontator": {
    base_hype: 60,
    base_tactical: 30,
    base_aggression: 90,
    base_defense: 40
  },
  "Stabilizator": {
    base_hype: 20,
    base_tactical: 50,
    base_aggression: 30,
    base_defense: 90
  },
  "Analityk": {
    base_hype: 30,
    base_tactical: 90,
    base_aggression: 20,
    base_defense: 60
  },
  "Poszukiwacz Doznań": {
    base_hype: 85,
    base_tactical: 40,
    base_aggression: 60,
    base_defense: 20
  }
};

export const calculateQuizStats = (counts, totalQuestions) => {
  const calc = (votes) => {
    if (!votes) return 10; 
    const percentage = (votes / totalQuestions) * 100;
    
    return Math.min(Math.round(percentage), 100); 
  };

  return {
    base_aggression: calc(counts["Konfrontator"]),
    base_defense: calc(counts["Stabilizator"]),
    base_tactical: calc(counts["Analityk"]),
    base_hype: calc(counts["Poszukiwacz Doznań"])
  };
};