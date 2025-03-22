import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Homepage from "./Pages/Homepage";
import Artist from "./Pages/Artist";
import Album from "./Pages/Album";
import Song from "./Pages/Song";

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const navigate = useNavigate();

  return (
    <div>
      <header>
        <ul>
          <li>
            <button onClick={() => navigate("/")}>Home</button>
          </li>
          <li>
            <button onClick={() => navigate("/artist")}>Artist</button>
          </li>
          <li>
            <button onClick={() => navigate("/album")}>Album</button>
          </li>
          <li>
            <button onClick={() => navigate("/song")}>Song</button>
          </li>
        </ul>
      </header>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/artist" element={<Artist />} />
        <Route path="/album" element={<Album />} />
        <Route path="/song" element={<Song />} />
      </Routes>
    </div>
  );
}

export default App;
