import React, { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch"; // Udivewnij się, że imdivortujesz useFetch
import styles from "./Team.module.css";

const Team = ({ teamName, onDataSend }) => {
  const { data: teamDetails, loading, error } = useFetch(`/team/${teamName}`);

  useEffect(() => {
    onDataSend(teamDetails?.league);
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
        <div>Team Name: {teamDetails?.team_name}</div>
        <div>Country: {teamDetails?.country}</div>
        <div>Founded: {teamDetails?.founded}</div>
        <div>League: {teamDetails?.league}</div>
        <div>Venue: {teamDetails?.venue_name}</div>
        <div>Address: {teamDetails?.city}</div>
        <div>Capacity: {teamDetails?.capacity}</div>
      </div>
    </div>
  );
};

export default Team;
