import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import TopBar from "../../components/TopBar";
import SideBar from "../../components/SideBar";
import useFetch from "../../hooks/useFetch";
import LeagueBar from "../../components/LeagueBar";
import styles from "./LeagueHome.module.css";
import LeagueDetails from "../../components/LeagueDetails";

const ArchiveSeason = () => {
  const { leagueName, season } = useParams();
  const navigate = useNavigate();

  const {
    data: seasonDetails,
    loading: seasonLoading,
    error: seasonError,
  } = useFetch(`/leagues/${leagueName}/seasons/`);

  if (seasonLoading) return <p>Loading...</p>;
  if (seasonError) return <p>Error: {seasonError.message}</p>;

  const handleChange = (newSeason) => {
    navigate(`/league/${leagueName}/${newSeason}`);
  };

  return (
    <div className={styles.container}>
      <TopBar />
      <div className={styles.content}>
        <SideBar />
        <div className={styles.main}>
          <LeagueDetails leagueName={leagueName} season={season} />
          <LeagueBar leagueName={leagueName} />
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Start Year</th>
                  <th>End Year</th>
                  <th>Winner</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {seasonDetails?.map((seasonItem, index) => (
                  <tr key={seasonItem.id || index}>
                    {/* Pobieramy 'year' z bazy (np. 2024) */}
                    <td>{seasonItem.year}</td>
                    
                    {/* Wyliczamy rok końcowy "w locie" (np. 2025) */}
                    <td>{seasonItem.year + 1}</td>
                    
                    <td>{seasonItem.winner || "N/A"}</td>
                    <td>
                      <button
                        className={styles.button}
                        onClick={() => handleChange(seasonItem.year)}
                      >
                        View Season
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArchiveSeason;