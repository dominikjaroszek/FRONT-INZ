import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./MatchList.module.css";

const MatchList = ({ matches = [], finished, sortBy }) => {
  const navigate = useNavigate();

  // Nowoczesne formatowanie daty
  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDateShort = (date) => {
    return date.toLocaleDateString([], { day: 'numeric', month: 'short' });
  };

  if (!Array.isArray(matches) || matches.length === 0) {
    return <div className={styles.noMatches}>No matches found</div>;
  }

  // 1. Filtrujemy mecze pod kątem wskaźnika
  const matchesWithIndicator = matches.filter(
    (match) => sortBy && match[sortBy] != null
  );

  // 2. Szukamy meczu z najwyższym wynikiem (High Hype)
  const maxIndicatorMatch =
    matchesWithIndicator.length > 0
      ? matchesWithIndicator.reduce((max, match) =>
          match[sortBy] > max[sortBy] ? match : max
        )
      : null;

  return (
    <div className={styles.container}>
      {matches.map((match) => {
        const matchDateObj = new Date(match.match_date);
        
        // Surowa wartość wskaźnika
        const rawValue = match[sortBy];
        const hasValue = rawValue != null;
        const displayValue = hasValue ? Number(rawValue).toFixed(1) : "-";

        // Sprawdzamy czy to ten wyróżniony mecz
        const isMaxIndicator =
          maxIndicatorMatch && match.match_id === maxIndicatorMatch.match_id;

        return (
          <div
            key={match.match_id}
            onClick={() => navigate(`/match/${match.match_id}`)}
            className={`${styles.matchCard} ${
              isMaxIndicator ? styles.highlighted : ""
            }`}
            data-testid="match"
          >
            {/* LEWA STRONA: Drużyny i Gole */}
            <div className={styles.teamsContainer}>
              {/* Gospodarz */}
              <div className={styles.teamRow}>
                <img
                  className={styles.teamLogo}
                  src={match?.home_team_logo}
                  alt="home logo"
                />
                <span className={styles.teamName}>{match.home_team}</span>
                {/* Wynik goli (tylko jeśli mecz zakończony/trwa) */}
                {finished === 1 && (
                    <span className={styles.goalScore}>{match.home_score}</span>
                )}
              </div>

              {/* Gość */}
              <div className={styles.teamRow}>
                <img
                  className={styles.teamLogo}
                  src={match?.away_team_logo}
                  alt="away logo"
                />
                <span className={styles.teamName}>{match.away_team}</span>
                {finished === 1 && (
                    <span className={styles.goalScore}>{match.away_score}</span>
                )}
              </div>
            </div>

            {/* PRAWA STRONA: Wskaźnik i Data */}
            <div className={styles.matchDetails}>
              
              {/* Wskaźnik (Hype Score itp.) */}
              {sortBy && (
                <div className={styles.indicatorBadge}>
                  {displayValue}
                </div>
              )}

              {/* Data i Godzina */}
              <div className={styles.dateColumn}>
                <span className={styles.matchTime}>{formatTime(matchDateObj)}</span>
                <span className={styles.matchDate}>{formatDateShort(matchDateObj)}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MatchList;