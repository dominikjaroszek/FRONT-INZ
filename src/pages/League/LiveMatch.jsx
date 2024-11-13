// pages/LeagueDetails.jsx
import React from "react";
import { Button } from "antd";
import { useParams } from "react-router-dom";
import TopBar from "../../components/TopBar";
import SideBar from "../../components/SideBar";
import useFetch from "../../hooks/useFetch"; // Upewnij się, że importujesz useFetch
import LeagueBar from "../../components/LeagueBar";
import styles from "./LeagueHome.module.css";
import LeagueDetails from "../../components/LeagueDetails";
import MatchList from "../../components/MatchList";

const LiveMatch = () => {
  const { leagueName, season } = useParams();

  const {
    data: matchesData,
    loading: matchesLoading,
    error: matchesError,
  } = useFetch(`/live/${leagueName}`);

  if (matchesLoading) return <p>Loading...</p>;
  if (matchesError) return <p>Error: {matchesError.message}</p>;
  return (
    <div className={styles.container}>
      <TopBar />
      <div className={styles.content}>
        <SideBar />
        <div className={styles.leagueDetails}>
          <LeagueDetails leagueName={leagueName} season={season} />
          <LeagueBar leagueName={leagueName} />

          <h2>Nadchodzące mecze</h2>
          <MatchList matches={matchesData} finished={1} />
        </div>
      </div>
    </div>
  );
};

export default LiveMatch;
