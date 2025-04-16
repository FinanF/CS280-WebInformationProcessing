import React, { useState, useEffect } from "react";
import axios from "axios";

function HomePage() {
  const [therapists, setTherapists] = useState([]);
  useEffect(() => {
    fetchTherapists();
  }, []);

  const fetchTherapists = () => {
    axios
      .get("http://localhost:5001/api/therapists")
      .then((response) => setTherapists(response.data))
      .catch((error) => console.error("Error fetching therapists:", error));
  };

  return (
    <div>
      <h1>Therapist Client Management System</h1>
      {therapists.map((therapist) => (
        <div key={therapist.therapist_id} className="therapist-section">
          <h2>{therapist.name}</h2>
          <p>
            <strong>Title:</strong> {therapist.title}
          </p>
          <p>
            <strong>Email:</strong> {therapist.email}
          </p>
          <p>
            <strong>Location:</strong> {therapist.location}
          </p>
          <p>
            <strong>Years of Practice:</strong> {therapist.years_of_practice}
          </p>
          <p>
            <strong>Availability:</strong> {therapist.availability}
          </p>
          <h3>Sessions</h3>
        </div>
      ))}
    </div>
  );
}

export default HomePage;
