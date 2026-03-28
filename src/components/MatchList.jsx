import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./MatchList.module.css";

const MatchList = ({ matches = [], finished, sortBy }) => {
  const navigate = useNavigate();

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDateShort = (date) => {
    return date.toLocaleDateString([], { day: 'numeric', month: 'short' });
  };

  if (!Array.isArray(matches) || matches.length === 0) {
    return <div className={styles.noMatches}>No matches found</div>;
  }

  const matchesWithIndicator = matches.filter(
    (match) => sortBy && match[sortBy] != null
  );

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
        
        const rawValue = match[sortBy];
        const hasValue = rawValue != null;
        const displayValue = hasValue ? Number(rawValue).toFixed(1) : "-";

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
            <div className={styles.teamsContainer}>
              {/* Gospodarz */}
              <div className={styles.teamRow}>
                <img
                  className={styles.teamLogo}
                  src={match?.home_team_logo}
                  alt="home logo"
                />
                <span className={styles.teamName}>{match.home_team}</span>
                {finished === 1 && (
                    <span className={styles.goalScore}>{match.home_score}</span>
                )}
              </div>

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

            <div className={styles.matchDetails}>
              
              {sortBy && (
                <div className={styles.indicatorBadge}>
                  {displayValue}
                </div>
              )}

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