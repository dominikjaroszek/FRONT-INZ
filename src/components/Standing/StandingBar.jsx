import React, { useState } from "react";
import { Button } from "antd";
import useFetch from "../../hooks/useFetch";
import GeneralStanding from "./GeneralStanding";
import HomeStanding from "./HomeStanding";
import AwayStanding from "./AwayStanding";
import TopScorerStanding from "./TopScorerStanding";
import styles from "./Standing.module.css";

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
    <div className={styles.Bar}>
      <nav className={styles.nav}>
        <div
          className={`${styles.navItem} ${
            activeView === "general" ? styles.active : ""
          }`}
        >
          <button onClick={() => setActiveView("general")}>General</button>
        </div>
        <div
          className={`${styles.navItem} ${
            activeView === "standingHome" ? styles.active : ""
          }`}
        >
          <button onClick={() => setActiveView("standingHome")}>
            Standing home
          </button>
        </div>
        <div
          className={`${styles.navItem} ${
            activeView === "standingAway" ? styles.active : ""
          }`}
        >
          <button onClick={() => setActiveView("standingAway")}>
            Standing away
          </button>
        </div>
        <div
          className={`${styles.navItem} ${
            activeView === "topScorers" ? styles.active : ""
          }`}
        >
          <button onClick={() => setActiveView("topScorers")}>
            Top scorers
          </button>
        </div>
      </nav>

      <div>{renderView()}</div>
    </div>
  );
};

export default StandingBar;
