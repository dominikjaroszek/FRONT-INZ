// pages/LeagueDetails.jsx
import React, { useState, useEffect } from "react";
import { Button } from "antd";
import { useParams } from "react-router-dom";
import TopBar from "../../components/TopBar";
import SideBar from "../../components/SideBar";
import useFetch from "../../hooks/useFetch"; // Upewnij się, że importujesz useFetch
import LeagueBar from "../../components/LeagueBar";
import { useNavigate } from "react-router-dom";
import styles from "./LeagueHome.module.css";
import LeagueDetails from "../../components/LeagueDetails";
import MatchList from "../../components/MatchList";

const FinishedMatch = () => {
  const { leagueName } = useParams();
  const { season } = useParams();

  const navigate = useNavigate();

  // Fetch upcoming matches for the league
  const {
    data: matchesData,
    loading: matchesLoading,
    error: matchesError,
  } = useFetch(`/finished-matches/${leagueName}/${season}/2`);

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
          <MatchList matches={matchesData} finished={1} />
        </div>
      </div>
    </div>
  );
};

export default FinishedMatch;
