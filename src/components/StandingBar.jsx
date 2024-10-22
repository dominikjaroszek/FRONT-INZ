import React, { useState } from "react";
import { Button } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import GeneralStanding from "./GeneralStanding";
import HomeStanding from "./HomeStanding";
import AwayStanding from "./AwayStanding";
import TopScorerStanding from "./TopScorerStanding";

const StandingBar = () => {
  const { leagueName, season } = useParams(); // Wyciągnij leagueName i season jednocześnie
  const [activeView, setActiveView] = useState("general"); // Stan do zarządzania aktywnym widokiem
  const navigate = useNavigate(); // Używamy navigate do obsługi nawigacji
  const {
    data: leagueDetails,
    loading,
    error,
  } = useFetch(`/leagues/${leagueName}/${season}`);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Funkcja renderująca widok na podstawie aktywnego stanu
  const renderView = () => {
    switch (activeView) {
      case "general":
        return <GeneralStanding season={season} leagueName={leagueName} />;
      case "standingHome":
        return <HomeStanding />; // Możesz zamienić to na faktyczny komponent
      case "standingAway":
        return <AwayStanding />; // Możesz zamienić to na faktyczny komponent
      case "topScorers":
        return <TopScorerStanding />; // Możesz zamienić to na faktyczny komponent
      default:
        return <GeneralStanding  />; // Domyślnie wyświetl General
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
