import React from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";

const GeneralStanding = ({ season, leagueName }) => {
  const {
    data: standingsDetail,
    loading,
    error,
  } = useFetch(`/leagues/standings/${leagueName}/${season}`);

  const navigate = useNavigate();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <div>
        {standingsDetail && (
          <table>
            <thead>
              <tr>
                <th>Position</th>
                <th>Team</th>
                <th>Points</th>
                <th>Played</th>
                <th>Won</th>
                <th>Drawn</th>
                <th>Lost</th>
                <th>Goals For</th>
                <th>Goals Against</th>
                <th>Goal Difference</th>
                <th>Form</th>
              </tr>
            </thead>
            <tbody>
              {standingsDetail.map((team, index) => (
                <tr key={index}>
                  <td>{team.position}</td>
                  <td onClick={() => navigate(`/team/${team.team_name}`)}>
                    {team.team_name}
                  </td>
                  <td>{team.points}</td>
                  <td>{team.played}</td>
                  <td>{team.win}</td>
                  <td>{team.draw}</td>
                  <td>{team.lose}</td>
                  <td>{team.goalsFor}</td>
                  <td>{team.goalsAgainst}</td>
                  <td>{team.goalDifference}</td>
                  <td>{team.form}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default GeneralStanding;
