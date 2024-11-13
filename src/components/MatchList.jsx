import React from "react";
import { useNavigate } from "react-router-dom";

const MatchList = ({ matches, finished }) => {
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

  const matchesArray = Array.isArray(matches) ? matches : [];
  if (matchesArray.length === 0) {
    return <p>Brak meczów</p>;
  }
  if (finished === 1) {
    return (
      <ul>
        {matchesArray.map((match) => {
          const matchDate = new Date(match.match_date);
          const formattedDate = formatDate(matchDate);
          return (
            <li
              key={match.match_id}
              onClick={() => navigate(`/match/${match.match_id}`)}
            >
              <img
                style={{ width: "20px", height: "20px" }}
                src={match?.home_team_logo}
                alt={`${match?.home_team_logo} logo`}
              />
              {match.home_team} vs {match.away_team} {formattedDate}{" "}
              {match.home_score} - {match.away_score}
              <img
                style={{ width: "20px", height: "20px" }}
                src={match?.away_team_logo}
                alt={`${match?.away_team_logo} logo`}
              />
            </li>
          );
        })}
      </ul>
    );
  } else if (finished === 0) {
    return (
      <ul>
        {matchesArray.map((match) => {
          const matchDate = new Date(match.match_date);
          const formattedDate = formatDate(matchDate);
          return (
            <li
              key={match.match_id}
              onClick={() => navigate(`/match/${match.match_id}`)}
            >
              <img
                style={{ width: "20px", height: "20px" }}
                src={match?.home_team_logo}
                alt={`${match?.home_team_logo} logo`}
              />
              {match.home_team} vs {match.away_team}{" "}
              <img
                style={{ width: "20px", height: "20px" }}
                src={match?.away_team_logo}
                alt={`${match?.away_team_logo} logo`}
              />{" "}
              {formattedDate}{" "}
            </li>
          );
        })}
      </ul>
    );
  } else {
    return (
      <ul>
        {matchesArray.map((match) => {
          const matchDate = new Date(match.match_date);
          const formattedDate = formatDate(matchDate);
          return (
            <li
              key={match.match_id}
              onClick={() => navigate(`/match/${match.match_id}`)}
            >
              <img
                style={{ width: "20px", height: "20px" }}
                src={match?.home_team_logo}
                alt={`${match?.home_team_logo} logo`}
              />
              {match.home_team} vs {match.away_team}{" "}
              <img
                style={{ width: "20px", height: "20px" }}
                src={match?.away_team_logo}
                alt={`${match?.away_team_logo} logo`}
              />{" "}
              {match?.fans_rank_generally} {formattedDate}
            </li>
          );
        })}
      </ul>
    );
  }
};

export default MatchList;
