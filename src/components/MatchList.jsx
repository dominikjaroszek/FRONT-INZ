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

  // 1. Filtrujemy mecze, które mają wartość dla wybranego wskaźnika (np. hype_score nie jest null)
  const matchesWithIndicator = matches.filter(
    (match) => sortBy && match[sortBy] != null
  );

  // 2. Szukamy meczu z najwyższym wynikiem (do podświetlenia)
  const maxIndicatorMatch =
    matchesWithIndicator.length > 0
      ? matchesWithIndicator.reduce((max, match) =>
          match[sortBy] > max[sortBy] ? match : max
        )
      : null;

  return (
    <div>
      {matches.map((match) => {
        const matchDate = new Date(match.match_date);
        const formattedDate = formatDate(matchDate);

        // Pobieramy surową wartość wskaźnika (np. hype_score)
        const rawValue = match[sortBy];

        // Sprawdzamy, czy wartość istnieje (nie jest null ani undefined)
        const hasValue = rawValue != null;

        // Bezpieczne formatowanie: jeśli jest wartość, formatujemy do 1 miejsca po przecinku
        const displayValue = hasValue ? Number(rawValue).toFixed(1) : null;

        // Sprawdzamy, czy ten mecz jest tym "najlepszym" w grupie
        const isMaxIndicator =
          maxIndicatorMatch && match.match_id === maxIndicatorMatch.match_id;

        return (
          <div
            key={match.match_id}
            onClick={() => navigate(`/match/${match.match_id}`)}
            className={`${styles.content} ${
              isMaxIndicator ? styles.highlighted : ""
            }`}
            data-testid="match"
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
                  {/* finished === 1 oznacza zakończony mecz (pokazujemy gole) */}
                  {finished === 1 ? match.home_score : "-"}
                </div>
                <div className={styles.score}>
                  {finished === 1 ? match.away_score : "-"}
                </div>
              </div>

              <div className={styles.formate}>
                {/* Wyświetlamy wskaźnik tylko jeśli sortBy jest ustawione i wartość istnieje */}
                {sortBy && hasValue && (
                  <span className={styles.indicator}>
                    {displayValue}
                    {/* Usunąłem %, bo scores to zazwyczaj punkty (np. 8.5), a nie procenty. 
                        Jeśli jednak chcesz procenty, odkomentuj linię niżej: */}
                    {/* % */}
                  </span>
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