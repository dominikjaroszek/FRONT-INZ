import React from "react";
import styles from "./Match.module.css";

const MatchFinished = ({ match }) => {
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
    <>
      <div>
        <ul>
          <li>
            <img
              style={{ width: "20px", height: "20px" }}
              src={match?.home_team_logo}
              alt={`${match?.home_team_logo} logo`}
            />
            {match?.home_team} vs {match?.away_team}{" "}
            <img
              style={{ width: "20px", height: "20px" }}
              src={match?.away_team_logo}
              alt={`${match?.awau_team_logo} logo`}
            />
            {match?.home_score} - {match?.away_score}{" "}
            {formatDate(new Date(match?.match_date))}
            {match?.venue_name}
            {match?.referee}
            {match?.league_name}
          </li>
        </ul>
      </div>
    </>
  );
};

export default MatchFinished;
