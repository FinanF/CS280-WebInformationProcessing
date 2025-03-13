import React, { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/message") // URL to backend API
      .then((response) => response.json()) // Parse the JSON response
      .then((data) => setMessage(data.message)) // Set the message state
      .catch((error) => console.error("Error:", error)); // Handle errors
  }, []);

  return (
    <div>
      <h1>Full-Stack Music App</h1>
      <p>Backend says: {message}</p>
    </div>
  );
}

export default App;
