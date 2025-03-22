import React, { useState, useEffect } from "react";
import axios from "axios";

function Artist() {
  const [artists, setArtists] = useState([]);
  const [newArtist, setNewArtist] = useState({
    artist_name: "",
    monthly_listeners: "",
    genre: "",
  });

  useEffect(() => {
    fetchArtists();
  }, []);

  const fetchArtists = () => {
    axios
      .get("http://localhost:5000/api/data")
      .then((response) => {
        setArtists(response.data.artists);
      })
      .catch((error) => {
        console.error("Error fetching artists:", error);
      });
  };

  const addArtist = () => {
    axios
      .post("http://localhost:5000/api/artist", newArtist)
      .then(() => {
        fetchArtists();
        setNewArtist({ artist_name: "", monthly_listeners: "", genre: "" });
      })
      .catch((error) => {
        console.error("Error adding artist:", error);
      });
  };

  const deleteArtist = (id) => {
    axios
      .delete(`http://localhost:5000/api/artist/${id}`)
      .then(() => {
        fetchArtists();
      })
      .catch((error) => {
        console.error("Error deleting artist:", error);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewArtist((prevArtist) => ({
      ...prevArtist,
      [name]: value,
    }));
  };

  return (
    <div>
      <h1>Artist</h1>
      <ul>
        {artists.map((artist) => (
          <li key={artist.artist_id}>
            {artist.artist_name} - {artist.monthly_listeners} listeners -{" "}
            {artist.genre}{" "}
            <button onClick={() => deleteArtist(artist.artist_id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        name="artist_name"
        value={newArtist.artist_name}
        onChange={handleInputChange}
        placeholder="Artist Name"
      />
      <input
        type="number"
        name="monthly_listeners"
        value={newArtist.monthly_listeners}
        onChange={handleInputChange}
        placeholder="Monthly Listeners"
      />
      <input
        type="text"
        name="genre"
        value={newArtist.genre}
        onChange={handleInputChange}
        placeholder="Genre"
      />
      <button onClick={addArtist}>Add Artist</button>
    </div>
  );
}

export default Artist;
