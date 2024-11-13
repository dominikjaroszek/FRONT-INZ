import React from "react";
import useFetch from "../../hooks/useFetch";

const HomeStanding = ({ season, leagueName }) => {
  const {
    data: standingsDetail,
    loading,
    error,
  } = useFetch(`/leagues/standings/home/${leagueName}/${season}`);

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
              </tr>
            </thead>
            <tbody>
              {standingsDetail.map((team, index) => (
                <tr key={index}>
                  <td>{team.position}</td>
                  <td>{team.team_name}</td>
                  <td>{team.points}</td>
                  <td>{team.played}</td>
                  <td>{team.win}</td>
                  <td>{team.draw}</td>
                  <td>{team.lose}</td>
                  <td>{team.goalsFor}</td>
                  <td>{team.goalsAgainst}</td>
                  <td>{team.goalDifference}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default HomeStanding;
