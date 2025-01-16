import React from "react";
import { Button } from "antd";
import { useParams } from "react-router-dom";
import TopBar from "../../components/TopBar";
import SideBar from "../../components/SideBar";
import useFetch from "../../hooks/useFetch";
import LeagueBar from "../../components/LeagueBar";
import StandingBar from "../../components/Standing/StandingBar";
import styles from "./Team.module.css";
import LeagueDetails from "../../components/LeagueDetails";
import Team from "./Team";
import { useState } from "react";
import TeamBar from "./TeamBar";

const TeamStanding = () => {
  const { leagueName } = useParams();
  const { season } = useParams();
  const { teamName } = useParams();
  const [childData, setChildData] = useState(null);

  const handleDataFromChild = (data) => {
    setChildData(data);
  };

  return (
    <div className={styles.container}>
      <TopBar />
      <div className={styles.content}>
        <SideBar />
        <div className={styles.leagueDetails}>
          <Team teamName={teamName} onDataSend={handleDataFromChild} />

          <TeamBar teamName={teamName} leagueName={childData} />
          <div className={styles.leagueDetails}>
            <StandingBar leagueName={leagueName} season={season} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamStanding;
