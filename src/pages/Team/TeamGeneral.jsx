import React, { useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import TopBar from "../../components/TopBar";
import SideBar from "../../components/SideBar";
import MatchList from "../../components/MatchList";
import Team from "./Team";
import TeamBar from "./TeamBar";
import useFetch from "../../hooks/useFetch";
import styles from "./Team.module.css";

const TeamGeneral = () => {
  const { teamName } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [childData, setChildData] = useState(null);

  const {
    data: matchesFinishedData,
    loading: matchesFinishedLoading,
    error: matchesFinishedError,
  } = useFetch(`/teams/${teamName}/finished/2/`);

  const {
    data: matchesData,
    loading: matchesLoading,
    error: matchesError,
  } = useFetch(`/teams/${teamName}/upcoming/2/`);

  if (matchesFinishedLoading || matchesLoading) return <p>Loading...</p>;

  if (matchesFinishedError || matchesError)
    return (
      <p>Error: {matchesFinishedError?.message || matchesError?.message}</p>
    );

  const handleDataFromChild = (data) => {
    setChildData(data);
  };

  return (
    <div key={location.pathname} className={styles.container}>
      <TopBar />
      <div className={styles.content}>
        <SideBar />
        <div className={styles.leagueDetails}>
          <Team teamName={teamName} onDataSend={handleDataFromChild} />
          <TeamBar teamName={teamName} leagueName={childData} />

          <div className={styles.section}>
            <div className={styles.leagueHeader}>
              <div className={styles.button}>Finished matches</div>
            </div>
            <MatchList matches={matchesFinishedData} finished={1} />
            {matchesFinishedData.length > 0 && (
              <div
                className={styles.ShowMore}
                onClick={() => navigate(`/team/${teamName}/result`)}
              >
                See more
              </div>
            )}
          </div>

          <div className={styles.section}>
            <div className={styles.leagueHeader}>
              <div className={styles.button}>Upcoming matches</div>
            </div>
            {matchesData.length === 0 && <p>Brak nadchodzących meczów</p>}
            <MatchList matches={matchesData} finished={0} />
            {matchesData.length > 0 && (
              <div
                className={styles.ShowMore}
                onClick={() => navigate(`/team/${teamName}/upcoming`)}
              >
                See more
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamGeneral;