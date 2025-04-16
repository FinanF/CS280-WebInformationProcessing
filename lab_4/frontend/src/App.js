import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import TherapistPage from "./Pages/TherapistPage";
import ClientPage from "./Pages/ClientPage";
import SessionPage from "./Pages/SessionPage";
import "./App.css";

function App() {
  return (
    <Router>
      <div>
        <nav className="navbar">
          <ul className="navbar-list">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/therapists">Therapists</Link>
            </li>
            <li>
              <Link to="/clients">Clients</Link>
            </li>
            <li>
              <Link to="/sessions">Sessions</Link>
            </li>
          </ul>
        </nav>
        <div className="content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/therapists" element={<TherapistPage />} />
            <Route path="/clients" element={<ClientPage />} />
            <Route path="/sessions" element={<SessionPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
