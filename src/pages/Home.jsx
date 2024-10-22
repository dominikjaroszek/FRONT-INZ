import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useParams,
} from "react-router-dom";
import TopBar from "../components/TopBar";
import SideBar from "../components/SideBar";
import styles from "./Home.module.css"; 

const Home = () => {
  return (
    <div className={styles.container}>
      <TopBar />
      <div className={styles.content}>
        <SideBar />
        <h1>Home</h1>
      </div>
    </div>
  );
};

export default Home;
