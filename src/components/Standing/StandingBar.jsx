import React, { useState } from "react";
import { Button } from "antd";
import useFetch from "../../hooks/useFetch";
import GeneralStanding from "./GeneralStanding";
import HomeStanding from "./HomeStanding";
import AwayStanding from "./AwayStanding";
import TopScorerStanding from "./TopScorerStanding";

const StandingBar = ({ leagueName, season }) => {
  const [activeView, setActiveView] = useState("general"); // Stan do zarządzania aktywnym widokiem

  const renderView = () => {
    switch (activeView) {
      case "general":
        return <GeneralStanding season={season} leagueName={leagueName} />;
      case "standingHome":
        return <HomeStanding season={season} leagueName={leagueName} />; // Możesz zamienić to na faktyczny komponent
      case "standingAway":
        return <AwayStanding season={season} leagueName={leagueName} />; // Możesz zamienić to na faktyczny komponent
      case "topScorers":
        return <TopScorerStanding season={season} leagueName={leagueName} />; // Możesz zamienić to na faktyczny komponent
      default:
        return <GeneralStanding season={season} leagueName={leagueName} />; // Domyślnie wyświetl General
    }
  };

  return (
    <nav>
      <h2>{leagueName}</h2>
      <ul>
        <li>
          <button onClick={() => setActiveView("general")}>General</button>
        </li>
        <li>
          <button onClick={() => setActiveView("standingHome")}>
            Standing home
          </button>
        </li>
        <li>
          <button onClick={() => setActiveView("standingAway")}>
            Standing away
          </button>
        </li>
        <li>
          <button onClick={() => setActiveView("topScorers")}>
            Top scorers
          </button>
        </li>
      </ul>
      {/* Renderuj aktualnie aktywny widok */}
      {renderView()}
    </nav>
  );
};

export default StandingBar;
