import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useParams,
} from "react-router-dom";
import Home from "./pages/Home.jsx";
// import Match from "./pages/Match.jsx";
// import Result from "./pages/Result.jsx";
import League from "./pages/League.jsx";
import Upcoming from "./pages/Upcoming.jsx";
import Standing from "./pages/Standing.jsx";
import Archive from "./pages/Archive.jsx";
import Live from "./pages/Live.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/match" element={<Match />} />
        <Route path="/result" element={<Result />} /> */}
        <Route path="/league/:leagueName/:season" element={<League />} />
        <Route
          path="/league/:leagueName/:season/upcoming"
          element={<Upcoming />}
        />
        <Route
          path="/league/:leagueName/:season/standing"
          element={<Standing />}
        />
        <Route
          path="/league/:leagueName/:season/archive"
          element={<Archive />}
        />
        <Route path="/league/:leagueName/:season/live" element={<Live />} />

        {/* <Route path="/match"  element={<Account />} />
          <Route path="/team" element={<Account />} />
          <Route path="/league" element={<Account />} />
          <Route path="/the best match" element={<Account />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
