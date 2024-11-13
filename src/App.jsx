import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useParams,
} from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import HomeFinished from "./pages/Home/HomeFinished.jsx";
import HomeUpcoming from "./pages/Home/HomeUpcoming.jsx";
import TeamGeneral from "./pages/Team/TeamGeneral.jsx";
import LeagueHome from "./pages/League/General.jsx";
import UpcomingMatch from "./pages/League/UpcomingMatch.jsx";
import FinishedMatch from "./pages/League/FinishedMatch.jsx";
import StandingTeam from "./pages/League/StandingTeam.jsx";
import ArchiveSeason from "./pages/League/ArchiveSeason.jsx";
import LiveMatch from "./pages/League/LiveMatch.jsx";
import Match from "./pages/Match/Match.jsx";
import TeamUpcoming from "./pages/Team/TeamUpcoming.jsx";
import TeamFinished from "./pages/Team/TeamFinished.jsx";
import TeamStanding from "./pages/Team/TeamStanding.jsx";
import HomeTop from "./pages/Home/HomeTop.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home/finished" element={<HomeFinished />} />
        <Route path="/home/upcoming" element={<HomeUpcoming />} />
        <Route path="/home/top" element={<HomeTop />} />
        <Route path="/match/:matchid" element={<Match />} />
        <Route path="/league/:leagueName/:season" element={<LeagueHome />} />
        <Route
          path="/league/:leagueName/:season/upcoming"
          element={<UpcomingMatch />}
        />
        <Route
          path="/league/:leagueName/:season/standing"
          element={<StandingTeam />}
        />
        <Route
          path="/league/:leagueName/:season/archive"
          element={<ArchiveSeason />}
        />
        <Route path="/live/:season/:leagueName" element={<LiveMatch />} />
        <Route
          path="/league/:leagueName/:season/result"
          element={<FinishedMatch />}
        />
        <Route path="/team/:teamName" element={<TeamGeneral />} />

        <Route path="/team/:teamName/upcoming" element={<TeamUpcoming />} />
        <Route path="/team/:teamName/result" element={<TeamFinished />} />

        <Route
          path="/league/:leagueName/:season/result"
          element={<FinishedMatch />}
        />
        <Route
          path="/team/:leagueName/:season/:teamName/standing/"
          element={<TeamStanding />}
        />
      </Routes>
    </Router>
  );
}

export default App;
