// src/utils/personalityConfig.js

// 1. MAPOWANIE NAZW: Psychologia -> Piłka Nożna
export const FOOTBALL_PROFILE_MAP = {
  "Konfrontator": "Agresor",
  "Stabilizator": "Defensor",
  "Analityk": "Strateg",
  "Poszukiwacz Doznań": "Kibic Adrenaliny"
};

// 2. PREDEFINIOWANE WARTOŚCI (Dla osób wybierających z listy)
// To są wartości dla kogoś, kto NIE robi ankiety, tylko wybiera z listy.
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

// 3. LOGIKA OBLICZANIA WYNIKU ANKIETY
// counts: obiekt np. { "Konfrontator": 4, "Analityk": 6 ... }
// totalQuestions: liczba pytań
export const calculateQuizStats = (counts, totalQuestions) => {
  // Funkcja pomocnicza: Oblicza procent i skaluje go (min 10, max 100)
  const calc = (votes) => {
    if (!votes) return 10; // Minimalna wartość statystyki
    const percentage = (votes / totalQuestions) * 100;
    
    // Zaokrąglij i upewnij się, że nie przekracza 100
    return Math.min(Math.round(percentage), 100); 
  };

  // Tutaj mapujemy głosy na konkretne statystyki
  return {
    base_aggression: calc(counts["Konfrontator"]),
    base_defense: calc(counts["Stabilizator"]),
    base_tactical: calc(counts["Analityk"]),
    base_hype: calc(counts["Poszukiwacz Doznań"])
  };
};