import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Pages/Home";
import Artists from "./Pages/Artist";
import Songs from "./Pages/Song";
import Albums from "./Pages/Album";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <Link to="/">Home</Link> | 
          <Link to="/artists">Artists</Link> | 
          <Link to="/songs">Songs</Link> | 
          <Link to="/albums">Albums</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/artists" element={<Artists />} />
          <Route path="/songs" element={<Songs />} />
          <Route path="/albums" element={<Albums />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
