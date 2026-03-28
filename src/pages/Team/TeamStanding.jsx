import React, { useState } from "react";
import { useParams } from "react-router-dom";
import TopBar from "../../components/TopBar";
import SideBar from "../../components/SideBar";
import useFetch from "../../hooks/useFetch";
import StandingBar from "../../components/Standing/StandingBar";
import styles from "./Team.module.css";
import Team from "./Team";
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

          {/* USUNIĘTO: <div className={styles.leagueDetails}> */}
          <StandingBar leagueName={leagueName} season={season} />
          {/* USUNIĘTO: </div> */}
          
        </div>
      </div>
    </div>
  );
};

export default TeamStanding;