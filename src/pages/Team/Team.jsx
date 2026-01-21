import React, { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import styles from "./Team.module.css";

const Team = ({ teamName, onDataSend }) => {
  const { data: teamDetails, loading, error } = useFetch(`/teams/${teamName}`);

  useEffect(() => {
    onDataSend(teamDetails?.league_name);
  }, [teamDetails]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className={styles.team}>
      <img
        style={{ padding: "20px" }}
        src={teamDetails?.logo}
        alt={`${teamDetails?.logo} logo`}
      />
      <div className={styles.information}>
        <div>Team Name: {teamDetails?.name}</div>
        <div>Country: {teamDetails?.country}</div>
        <div>Founded: {teamDetails?.founded}</div>
        <div>League: {teamDetails?.league_name}</div>
        <div>Venue: {teamDetails?.venue_name}</div>
        <div>Address: {teamDetails?.venue_city}</div>
        <div>Capacity: {teamDetails?.venue_capacity}</div>
      </div>
    </div>
  );
};

export default Team;
