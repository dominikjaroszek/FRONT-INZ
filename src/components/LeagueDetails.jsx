import React from "react";
import styles from "./../pages/League/LeagueHome.module.css";
import useFetch from "../hooks/useFetch";

const LeagueDetails = ({ leagueName, season }) => {
  const {
    data: leagueDetails,
    loading,
    error,
  } = useFetch(`/leagues/${leagueName}/${season}`);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className={styles.container}>
      <div className={styles.content}>
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
        </div>
      </div>
    </div>
  );
};

export default LeagueDetails;
