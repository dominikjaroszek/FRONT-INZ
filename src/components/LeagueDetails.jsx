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
          <img
            src={leagueDetails?.logo}
            style={{ width: "100px" }}
            alt={`${leagueDetails?.league_name} logo`}
          />

          <div className={styles.data}>
            <div>{leagueName}</div>
            <div>Country: {leagueDetails?.country}</div>
            <div>
              Season: {leagueDetails?.season_start_year} /{" "}
              {leagueDetails?.season_end_year}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeagueDetails;
