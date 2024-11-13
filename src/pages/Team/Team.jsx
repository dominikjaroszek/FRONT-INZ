import React, { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch"; // Upewnij się, że importujesz useFetch

const Team = ({ teamName, onDataSend }) => {
  const { data: teamDetails, loading, error } = useFetch(`/team/${teamName}`);

  useEffect(() => {
    onDataSend(teamDetails?.league);
  }, [teamDetails]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <p>Team Name: {teamDetails?.team_name}</p>
      <p>Country: {teamDetails?.country}</p>
      <p>Founded: {teamDetails?.founded}</p>
      <p>League: {teamDetails?.league}</p>
      <p>Venue: {teamDetails?.venue_name}</p>
      <p>Address: {teamDetails?.city}</p>
      <p>Capacity: {teamDetails?.capacity}</p>
      <p>
        <img
          style={{ width: "20px", height: "20px" }}
          src={teamDetails?.logo}
          alt={`${teamDetails?.logo} logo`}
        />
      </p>
    </div>
  );
};

export default Team;
