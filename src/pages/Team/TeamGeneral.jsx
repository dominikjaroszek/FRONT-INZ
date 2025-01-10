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
  } = useFetch(`/team/${teamName}/finished/2`);

  const {
    data: matchesData,
    loading: matchesLoading,
    error: matchesError,
  } = useFetch(`/team/${teamName}/upcoming/2`);

  const {
    data: matchesLiveData,
    loading: matchesLiveLoading,
    error: matchesLiveError,
  } = useFetch(`/team/${teamName}/live`);

  if (matchesFinishedLoading || matchesLoading || matchesLiveLoading)
    return <p>Loading...</p>;

  if (matchesFinishedError || matchesError || matchesLiveError)
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

          <div className={styles.section}>
            <div className={styles.leagueHeader}>
              <div className={styles.button}>Live matches</div>
            </div>
            {matchesLiveData.length === 0 && <p>Brak trwających meczów</p>}
            <MatchList matches={matchesLiveData} finished={1} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamGeneral;
