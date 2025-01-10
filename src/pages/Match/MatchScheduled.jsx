import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Match.module.css";

const MatchScheduled = ({ match }) => {
  const navigate = useNavigate();

  function formatDate(matchDate) {
    const formattedDate = `${matchDate.getDate()}.${
      matchDate.getMonth() + 1
    }.${matchDate.getFullYear()} ${matchDate.getHours()}:${
      matchDate.getMinutes() < 10
        ? "0" + matchDate.getMinutes()
        : matchDate.getMinutes()
    }`;
    return formattedDate;
  }
  return (
    <div className={styles.container2}>
      <div className={styles.matchHeader}>
        <div className={styles.team}>
          <img
            style={{ width: "120px", height: "120px" }}
            src={match?.home_team_logo}
            alt={`${match?.home_team_logo} logo`}
          />

          <div
            onClick={() => navigate(`/team/${match?.home_team}`)}
            className={styles.matchTeam}
          >
            {match?.home_team}
          </div>
        </div>
        <div className={styles.matchInformation}>
          <div className={styles.information}>
            {formatDate(new Date(match?.match_date))}
          </div>
          <div className={styles.score}>
            {match?.home_score} - {match?.away_score}
          </div>
        </div>
        <div className={styles.team}>
          <img
            style={{ width: "120px", height: "120px" }}
            src={match?.away_team_logo}
            alt={`${match?.away_team_logo} logo`}
          />
          <div
            onClick={() => navigate(`/team/${match?.away_team}`)}
            className={styles.matchTeam}
          >
            {match?.away_team}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchScheduled;
