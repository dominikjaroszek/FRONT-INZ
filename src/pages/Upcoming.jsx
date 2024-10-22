// pages/LeagueDetails.jsx
import React, { useState, useEffect } from "react";
import { Button } from "antd";
import { useParams } from "react-router-dom";
import TopBar from "../components/TopBar";
import SideBar from "../components/SideBar";
import useFetch from "../hooks/useFetch"; // Upewnij się, że importujesz useFetch
import styles from "./League.module.css";
import LeagueBar from "../components/LeagueBar";

const Upcoming = () => {
  const { leagueName } = useParams();
  const { season } = useParams();

  // Fetch details about the league
  const {
    data: leagueDetails,
    loading,
    error,
  } = useFetch(`/leagues/${leagueName}/${season}`);

  // Fetch upcoming matches for the league
  const {
    data: matchesData,
    loading: matchesLoading,
    error: matchesError,
  } = useFetch(`/upcoming-matches/${leagueName}/${season}/2`);

  console.log(matchesData);
  const matches = matchesData || [];
  console.log(matches);
  const validSeason = season === "2024-2025";

  if (loading || matchesLoading) return <p>Loading...</p>;
  if (error || matchesError)
    return <p>Error: {error ? error.message : matchesError.message}</p>;

  return (
    <div className={styles.container}>
      <TopBar />
      <div className={styles.content}>
        <SideBar />
        <div className={styles.leagueDetails}>
          <h1>Szczegóły Ligi: {leagueDetails?.league_name}</h1>
          <img
            src={leagueDetails?.logo}
            alt={`${leagueDetails?.league_name} logo`}
          />
          <p>Kraj: {leagueDetails?.country}</p>
          <p>
            Sezon: {leagueDetails?.season_start_year} /{" "}
            {leagueDetails?.season_end_year}
          </p>
          <LeagueBar leagueName={leagueName} />
          {validSeason ? (
            <>
              <h2>Nadchodzące mecze</h2>
              {matches.length === 0 && <p>Brak nadchodzących meczów</p>}

              <ul>
                {matches?.map((match) => (
                  <li key={match.id}>
                    {match.home_team} vs {match.away_team} - {match.match_date}
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p>Brak danych dla sezonu: {season}</p> // Komunikat dla niewłaściwego sezonu
          )}
        </div>
      </div>
    </div>
  );
};

export default Upcoming;
