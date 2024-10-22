// pages/LeagueDetails.jsx
import React, { useState, useEffect } from "react";
import { Button } from "antd";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import TopBar from "../components/TopBar";
import SideBar from "../components/SideBar";
import useFetch from "../hooks/useFetch"; // Upewnij się, że importujesz useFetch
import styles from "./League.module.css";
import LeagueBar from "../components/LeagueBar";

const Archive = () => {
  const { leagueName } = useParams();
  const { season } = useParams();
  const navigate = useNavigate();

  const {
    data: leagueDetails,
    loading,
    error,
  } = useFetch(`/leagues/${leagueName}/${season}`); // Prawidłowe użycie useFetch

  const {
    data: seasonDetails,
    loading: seasonLoading,
    error: seasonError,
  } = useFetch(`/leagues/${leagueName}/seasons`);

  if (loading || seasonLoading) return <p>Loading...</p>;
  if (error || seasonError)
    return <p>Error: {error ? error.message : seasonError.message}</p>;

  const handleChange = (newSeason) => {
    console.log(newSeason);
    navigate(`/league/${leagueName}/${newSeason}`);
  };
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
          <h2>Archiwum</h2>
          <ul>
            {seasonDetails?.map((season) => (
              <li
                key={season.id}
                onClick={() =>
                  handleChange(`${season.start_year}-${season.end_year}`)
                }
              >
                {season.start_year} / {season.end_year}
                {season.winner && ` - ${season.winner}`}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Archive;
