import React, { useState, useEffect } from "react";
import TopBar from "../components/TopBar";
import SideBar from "../components/SideBar";
import useFetch from "../hooks/useFetch"; // Upewnij się, że importujesz useFetch
import styles from "./League.module.css";
import LeagueBar from "../components/LeagueBar";

import { useParams, useLocation } from "react-router-dom";

const League = () => {
  const { leagueName } = useParams();
  const { season } = useParams();
  const location = useLocation();

  const {
    data: leagueDetails,
    loading,
    error,
  } = useFetch(`/leagues/${leagueName}/${season}`);

  const {
    data: matches,
    loading: matchesLoading,
    error: matchesError,
  } = useFetch(`/finished-matches/${leagueName}/${season}/10`);

  if (loading || matchesLoading) return <p>Loading...</p>;
  if (error || matchesError)
    return <p>Error: {error ? error.message : matchesError.message}</p>;

  return (
    <div key={location.pathname} className={styles.container}>
      <TopBar />
      <div className={styles.content}>
        <SideBar />
        <div className={styles.leagueDetails}>
          <h1>Szczegóły Ligi: {leagueDetails.league_name}</h1>
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
          <h2>Ukończone mecze</h2>
          <ul>
            {matches?.map((match) => {
              const matchDate = new Date(match.match_date);
              const formattedDate = `${matchDate.getDate()}-${
                matchDate.getMonth() + 1
              }-${matchDate.getFullYear()} ${matchDate.getHours()}:${matchDate.getMinutes()}`;
              return (
                <li key={match.id}>
                  {match.home_team} vs {match.away_team} {formattedDate}{" "}
                  {match.home_score} - {match.away_score}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default League;
