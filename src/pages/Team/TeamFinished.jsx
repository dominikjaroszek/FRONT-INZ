import React, { useState } from "react";
import { useParams } from "react-router-dom";
import TopBar from "../../components/TopBar";
import SideBar from "../../components/SideBar";
import TeamBar from "./TeamBar";
import Team from "./Team";
import useFetch from "../../hooks/useFetch";
import MatchList from "../../components/MatchList";
import styles from "./Team.module.css";

const TeamFinished = () => {
  const { teamName } = useParams();

  const [childData, setChildData] = useState(null);

  const {
    data: matchesData,
    loading: matchesLoading,
    error: matchesError,
  } = useFetch(`/teams/${teamName}/finished/2/`);

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

          {/* DODANO WRAPPER .section TUTAJ: */}
          <div className={styles.section}>
            <div className={styles.leagueHeader}>
              <div className={styles.button}>Finished matches</div>
            </div>
            <MatchList matches={matchesData} finished={1} />
          </div>
          {/* KONIEC WRAPPERA */}
          
        </div>
      </div>
    </div>
  );
};

export default TeamFinished;