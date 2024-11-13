// pages/LeagueDetails.jsx
import React, { useState, useEffect } from "react";
import { Button } from "antd";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import TopBar from "../../components/TopBar";
import SideBar from "../../components/SideBar";
import useFetch from "../../hooks/useFetch";
import LeagueBar from "../../components/LeagueBar";
import styles from "./LeagueHome.module.css";
import LeagueDetails from "../../components/LeagueDetails";

const ArchiveSeason = () => {
  const { leagueName } = useParams();
  const { season } = useParams();
  const navigate = useNavigate();

  const {
    data: seasonDetails,
    loading: seasonLoading,
    error: seasonError,
  } = useFetch(`/leagues/${leagueName}/seasons`);

  if (seasonLoading) return <p>Loading...</p>;
  if (seasonError) return <p>Error: {seasonError.message}</p>;

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
          <LeagueDetails leagueName={leagueName} season={season} />
          <LeagueBar leagueName={leagueName} />
          <h2>Archiwum</h2>
          <ul>
            {seasonDetails?.map((season) => (
              <li
                key={season.season_id}
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

export default ArchiveSeason;
