import React from "react";
import useFetch from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import styles from "./Standing.module.css"; 

const AwayStanding = ({ season, leagueName }) => {
  const {
    data: standingsDetail,
    loading,
    error,
  } = useFetch(`/leagues/standings/away/${leagueName}/${season}`);

  const navigate = useNavigate();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>#</th>
            <th>Team</th>
            <th>P</th>
            <th>M</th>
            <th>W</th>
            <th>D</th>
            <th>L</th>
            <th>G</th>
            <th>DG</th>
          </tr>
        </thead>
        <tbody>
          {standingsDetail.map((team, index) => (
            <tr key={index}>
              <td>{team.position}</td>
              <td
                className={styles.teamName}
                onClick={() => navigate(`/team/${team.team_name}`)}
              >
                {team.team_name}
              </td>
              <td>{team.points}</td>
              <td>{team.played}</td>
              <td>{team.win}</td>
              <td>{team.draw}</td>
              <td>{team.lose}</td>
              <td>
                {team.goalsFor}:{team.goalsAgainst}
              </td>
              <td>{team.goalDifference}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AwayStanding;
