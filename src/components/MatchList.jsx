import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./MatchList.module.css";

const MatchList = ({ matches = [], finished, sortBy }) => {
  const navigate = useNavigate();

  const formatDate = (matchDate) => {
    const formattedDate = `${matchDate.getDate()}.${
      matchDate.getMonth() + 1
    }.${matchDate.getFullYear()} ${matchDate.getHours()}:${
      matchDate.getMinutes() < 10
        ? "0" + matchDate.getMinutes()
        : matchDate.getMinutes()
    }`;
    return formattedDate;
  };

  if (!Array.isArray(matches) || matches.length === 0) {
    return <div className={styles.noMatches}>No live matches</div>;
  }

  // Sprawdzenie, czy istnieje przynajmniej jeden zdefiniowany wskaźnik
  const hasDefinedIndicators = matches.some(
    (match) => match[sortBy] !== undefined
  );

  // Znajdź mecz z najwyższym wskaźnikiem, tylko jeśli wskaźniki są zdefiniowane
  const maxIndicatorMatch =
    hasDefinedIndicators &&
    matches.reduce((max, match) => (match[sortBy] > max[sortBy] ? match : max));

  return (
    <div>
      {matches.map((match) => {
        const matchDate = new Date(match.match_date);
        const formattedDate = formatDate(matchDate);
        const hasSortByData = match[sortBy] !== undefined;

        // Obliczamy procenty i zaokrąglamy do jednego miejsca po przecinku
        const percentage = hasSortByData && match[sortBy].toFixed(1);

        // Czy ten mecz ma być wyróżniony
        const isMaxIndicator =
          hasDefinedIndicators && match === maxIndicatorMatch;

        return (
          <div
            key={match.match_id}
            onClick={() => navigate(`/match/${match.match_id}`)}
            className={`${styles.content} ${
              isMaxIndicator ? styles.highlighted : ""
            }`}
          >
            <div className={styles.teams}>
              <div className={styles.team}>
                <img
                  style={{ width: "20px", height: "20px" }}
                  src={match?.home_team_logo}
                  alt={`${match?.home_team_logo} logo`}
                />
                {match.home_team}
              </div>
              <div className={styles.team}>
                <img
                  style={{ width: "20px", height: "20px" }}
                  src={match?.away_team_logo}
                  alt={`${match?.away_team_logo} logo`}
                />
                {match.away_team}
              </div>
            </div>
            <div className={styles.rightContent}>
              <div className={styles.scores}>
                <div className={styles.score}>
                  {finished === 1 ? match.home_score : "-"}
                </div>
                <div className={styles.score}>
                  {finished === 1 ? match.away_score : "-"}
                </div>
              </div>

              <div className={styles.formate}>
                {hasSortByData && (
                  <span className={styles.indicator}>{percentage}%</span>
                )}
                {formattedDate}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MatchList;
