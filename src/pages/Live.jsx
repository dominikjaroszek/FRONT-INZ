// pages/LeagueDetails.jsx
import React from "react";
import { Button } from "antd";
import { useParams } from "react-router-dom";
import TopBar from "../components/TopBar";
import SideBar from "../components/SideBar";
import useFetch from "../hooks/useFetch"; // Upewnij się, że importujesz useFetch
import styles from "./League.module.css";
import LeagueBar from "../components/LeagueBar";

const Live = () => {
  const { leagueName } = useParams(); // Odbieranie nazwy ligi z URL
  const {
    data: leagueDetails,
    loading,
    error,
  } = useFetch(`/leagues/${leagueName}`); // Prawidłowe użycie useFetch

  if (loading) return <p>Loading...</p>; // Obsługa stanu ładowania
  if (error) return <p>Error: {error.message}</p>; // Obsługa błędów

  return (
    <div className={styles.container}>
      <TopBar />
      <div className={styles.content}>
        <SideBar />
        <div className={styles.leagueDetails}>
          <h1>Szczegóły Ligi: {leagueDetails.league_name}</h1>{" "}
          <img
            src={leagueDetails.logo}
            alt={`${leagueDetails.league_name} logo`}
          />
          <p>Kraj: {leagueDetails.country}</p>
          <p>
            Sezon: {leagueDetails.season_start_year} /{" "}
            {leagueDetails.season_end_year}
          </p>
          <LeagueBar leagueName={leagueName} />
        </div>
      </div>
    </div>
  );
};

export default Live;
