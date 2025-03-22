import React, { useState, useEffect } from "react";
import axios from "axios";

function Homepage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchHomepageData();
  }, []);

  const fetchHomepageData = () => {
    axios
      .get("http://localhost:5000/api/homepage-data")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching homepage data:", error);
      });
  };

  return (
    <div>
      <h1>Homepage</h1>
      <ul>
        {data.map((item, index) => (
          <li key={index}>
            Artist: {item.artist_name}, Album: {item.album_name}, Song:{" "}
            {item.song_name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Homepage;
