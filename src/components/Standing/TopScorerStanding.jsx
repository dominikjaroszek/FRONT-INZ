import React from "react";
import useFetch from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import styles from "./Standing.module.css";

const TopScorerStanding = ({ season, leagueName }) => {
  const {
    data: standingsDetail,
    loading,
    error,
  } = useFetch(`/leagues/top_scorers/${leagueName}/${season}`);

  const navigate = useNavigate();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>#</th>
            <th>Player</th>
            <th>Goals</th>
            <th>Assists</th>
            <th>Team</th>
          </tr>
        </thead>
        <tbody>
          {standingsDetail.map((player, index) => (
            <tr key={index}>
              <td>{player.position}</td>
              <td className={styles.playerName}>{player.player_name}</td>
              <td>{player.goals}</td>
              <td>{player.assists}</td>
              <td
                className={styles.teamName}
                onClick={() => navigate(`/team/${player.team_name}`)}
              >
                {player.team_name}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TopScorerStanding;
