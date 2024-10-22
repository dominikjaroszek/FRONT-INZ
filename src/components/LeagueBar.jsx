// LeagueBar.jsx
import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const LeagueBar = () => {
  const { leagueName } = useParams();
  const { season } = useParams();

  const navigate = useNavigate();

  return (
    <nav>
      <h2>{leagueName}</h2>
      <ul>
        <li>
          <button onClick={() => navigate(`/league/${leagueName}/${season}`)}>
            Matches
          </button>
        </li>
        <li>
          <button
            onClick={() => navigate(`/league/${leagueName}/${season}/upcoming`)}
          >
            Upcoming
          </button>
        </li>
        <li>
          <button
            onClick={() => navigate(`/league/${leagueName}/${season}/live`)}
          >
            Live
          </button>
        </li>
        <li>
          <button
            onClick={() => navigate(`/league/${leagueName}/${season}/standing`)}
          >
            Standings
          </button>
        </li>
        <li>
          <button
            onClick={() => navigate(`/league/${leagueName}/${season}/archive`)}
          >
            Archive
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default LeagueBar;
