// pages/LeagueDetails.jsx
import React from "react";
import { Button } from "antd";
import { useParams } from "react-router-dom";
import TopBar from "../../components/TopBar";
import SideBar from "../../components/SideBar";
import useFetch from "../../hooks/useFetch"; // Upewnij się, że importujesz useFetch
import LeagueBar from "../../components/LeagueBar";
import StandingBar from "../../components/Standing/StandingBar";
import styles from "./LeagueHome.module.css";
import LeagueDetails from "../../components/LeagueDetails";

const StandingTeam = () => {
  const { leagueName } = useParams(); // Odbieranie nazwy ligi z URL
  const { season } = useParams(); // Odbieranie sezonu z URL

  return (
    <div className={styles.container}>
      <TopBar />
      <div className={styles.content}>
        <SideBar />
        <div className={styles.leagueDetails}>
          <LeagueDetails leagueName={leagueName} season={season} />
          <LeagueBar leagueName={leagueName} />
          <StandingBar leagueName={leagueName} season={season} />
        </div>
      </div>
    </div>
  );
};

export default StandingTeam;
