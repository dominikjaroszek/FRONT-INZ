import React, { useState } from "react";
import useFetch from "../../hooks/useFetch";
import MatchFinished from "./MatchFinished";
import MatchScheduled from "./MatchScheduled";
import { useParams } from "react-router-dom";
import StandingBar from "../../components/Standing/StandingBar";
import MatchStatists from "./MatchStatists";

const MatchBar = () => {
  const { matchid } = useParams();
  const { data: match, loading, error } = useFetch(`/match/${matchid}`);
  const [activeView, setActiveView] = useState(match?.type);
  console.log(match);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const renderView = () => {
    if (match?.type === "Finished") {
      switch (activeView) {
        case "Finished":
          return <MatchFinished match={match} />;
        case "Statists":
          return <MatchStatists match={match} />;
        case "Standing":
          return (
            <StandingBar leagueName={match.league_name} season={match.season} />
          );
        default:
          return <MatchFinished match={match} />;
      }
    } else {
      switch (activeView) {
        case "In Play":
          return <MatchScheduled matchid={matchid} type={match?.type} />;
        case "Standing":
          return (
            <StandingBar leagueName={match.league_name} season={match.season} />
          );
        case "Scheduled":
          return <MatchScheduled match={match} />;
        default:
          return <MatchScheduled match={match} />;
      }
    }
  };

  const change = () => (
    <div>
      <button onClick={() => setActiveView("Finished")}>General</button>
      <button onClick={() => setActiveView("Statists")}>Statists</button>
    </div>
  );

  return (
    <nav>
      <ul>
        <li>
          {match?.type === "Finished" ? (
            change()
          ) : (
            <button onClick={() => setActiveView("Scheduled")}>General</button>
          )}
        </li>
        <li>
          <button onClick={() => setActiveView("Standing")}>Standing</button>
        </li>
        <li></li>
      </ul>
      {renderView()}
    </nav>
  );
};

export default MatchBar;
