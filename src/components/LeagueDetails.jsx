import React from "react";
import styles from "./../pages/League/LeagueHome.module.css";
import useFetch from "../hooks/useFetch";

const LeagueDetails = ({ leagueName, season }) => {
  const {
    data: leagueDetails,
    loading,
    error,
  } = useFetch(`/leagues/${leagueName}/${season}/`);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    // Usunięto zbędne divy .container i .content
    // Od razu zwracamy główną kartę
    <div className={styles.leagueDetails}>
      <img
        src={leagueDetails?.logo}
        className={styles.logo} // Używamy naszej klasy CSS zamiast style={{ width: "100px" }}
        alt={`${leagueDetails?.league_name} logo`}
      />

      <div className={styles.data}>
        {/* Warto dodać pogrubienie dla samej nazwy ligi, by wyglądało to jeszcze lepiej */}
        <div style={{ fontSize: '1.2rem', fontWeight: '700', color: '#fff' }}>
          {leagueName}
        </div>
        <div>Country: {leagueDetails?.country}</div>
        <div>
          Season: {leagueDetails?.season_start_year} /{" "}
          {leagueDetails?.season_end_year}
        </div>
      </div>
    </div>
  );
};

export default LeagueDetails;