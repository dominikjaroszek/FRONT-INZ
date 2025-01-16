import React from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import styles from "./Standing.module.css"; 

const GeneralStanding = ({ season, leagueName }) => {
  const {
    data: standingsDetail,
    loading,
    error,
  } = useFetch(`/leagues/standings/${leagueName}/${season}`);

  const navigate = useNavigate();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const renderFormIcons = (form) => {
    return form.split("").map((char, index) => {
      let formClass = "";
      if (char === "W") formClass = styles.win;
      else if (char === "D") formClass = styles.draw;
      else if (char === "L") formClass = styles.lose;

      return <div key={index} className={`${styles.formIcon} ${formClass}`} />;
    });
  };

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
            <th>Form</th>
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
              <td>
                <div className={styles.formIcons}>
                  {renderFormIcons(team.form)}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GeneralStanding;
