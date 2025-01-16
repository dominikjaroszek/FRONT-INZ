
import React from "react";
import { Button } from "antd";
import { useParams } from "react-router-dom";
import TopBar from "../../components/TopBar";
import SideBar from "../../components/SideBar";
import useFetch from "../../hooks/useFetch"; 
import LeagueBar from "../../components/LeagueBar";
import StandingBar from "../../components/Standing/StandingBar";
import styles from "./LeagueHome.module.css";
import LeagueDetails from "../../components/LeagueDetails";

const StandingTeam = () => {
  const { leagueName } = useParams(); 
  const { season } = useParams(); 

  return (
    <div className={styles.container}>
      <TopBar />
      <div className={styles.content}>
        <SideBar />
        <div className={styles.main}>
          <LeagueDetails leagueName={leagueName} season={season} />
          <LeagueBar leagueName={leagueName} />
          <StandingBar leagueName={leagueName} season={season} />
        </div>
      </div>
    </div>
  );
};

export default StandingTeam;
