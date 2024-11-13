// LeagueBar.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const TeamBar = ({ teamName, leagueName }) => {
  const navigate = useNavigate();

  return (
    <nav>
      <ul>
        <li>
          <button onClick={() => navigate(`/team/${teamName}`)}>General</button>
        </li>
        <li>
          <button onClick={() => navigate(`/team/${teamName}/result`)}>
            Result
          </button>
          <button onClick={() => navigate(`/team/${teamName}/upcoming`)}>
            Upcoming
          </button>
        </li>
        <li>
          <button
            onClick={() =>
              navigate(
                `/team/${leagueName}/${"2024 - 2025"}/${teamName}/standing`
              )
            }
          >
            Standings
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default TeamBar;
