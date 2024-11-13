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

const TeamGeneral = () => {
  const { teamName } = useParams();

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
    return <p>Error: {matchesFinishedError?.message}</p>;

  const handleDataFromChild = (data) => {
    setChildData(data);
  };

  return (
    <div className={styles.container}>
      <TopBar />
      <div className={styles.content}>
        <SideBar />
        <Team teamName={teamName} onDataSend={handleDataFromChild} />
        <h2>{childData}</h2>
        <TeamBar teamName={teamName} leagueName={childData} />
        <h2>Ukończone mecze</h2>
        <MatchList matches={matchesFinishedData} finished={1} />
        <h2>Nadchodzące mecze</h2>
        <MatchList matches={matchesData} finished={0} />
        <h2>Live mecz</h2>
        <MatchList matches={matchesLiveData} finished={1} />
      </div>
    </div>
  );
};

export default TeamGeneral;
