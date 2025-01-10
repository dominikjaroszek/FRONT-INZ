import React from "react";
import SideBar from "../../components/SideBar";
import TopBar from "../../components/TopBar";
import TeamBar from "./TeamBar";
import Team from "./Team";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import MatchList from "../../components/MatchList";
import { useState } from "react";
import styles from "./Team.module.css";

const TeamUpcoming = () => {
  const { teamName } = useParams();

  const [childData, setChildData] = useState(null);

  const {
    data: matchesData,
    loading: matchesLoading,
    error: matchesError,
  } = useFetch(`/team/${teamName}/upcoming/2`);

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
          <div className={styles.leagueHeader}>
            <div className={styles.button}>Upcoming matches</div>
          </div>
          <MatchList matches={matchesData} finished={0} />
        </div>
      </div>
    </div>
  );
};

export default TeamUpcoming;
