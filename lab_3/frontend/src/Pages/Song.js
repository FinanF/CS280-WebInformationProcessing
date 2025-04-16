import React, { useState, useEffect } from "react";
import axios from "axios";

function Song() {
  const [songs, setSongs] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [newSong, setNewSong] = useState({
    song_name: "",
    release_year: "",
    album_id: "",
  });

  useEffect(() => {
    fetchSongs();
    fetchAlbums();
  }, []);

  const fetchSongs = () => {
    axios
      .get("http://localhost:5000/api/data")
      .then((response) => {
        setSongs(response.data.songs);
      })
      .catch((error) => {
        console.error("Error fetching songs:", error);
      });
  };

  const fetchAlbums = () => {
    axios
      .get("http://localhost:5000/api/data")
      .then((response) => {
        setAlbums(response.data.albums);
      })
      .catch((error) => {
        console.error("Error fetching albums:", error);
      });
  };

  const addSong = () => {
    axios
      .post("http://localhost:5000/api/song", newSong)
      .then(() => {
        fetchSongs();
        setNewSong({ song_name: "", release_year: "", album_id: "" });
      })
      .catch((error) => {
        console.error("Error adding song:", error);
      });
  };

  const deleteSong = (id) => {
    axios
      .delete(`http://localhost:5000/api/song/${id}`)
      .then(() => {
        fetchSongs();
      })
      .catch((error) => {
        console.error("Error deleting song:", error);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSong((prevSong) => ({
      ...prevSong,
      [name]: value,
    }));
  };

  return (
    <div>
      <h1>Song</h1>
      <ul>
        {songs.map((song) => (
          <li key={song.song_id}>
            {song.song_name} - {song.release_year}
            <button onClick={() => deleteSong(song.song_id)}>Delete</button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        name="song_name"
        value={newSong.song_name}
        onChange={handleInputChange}
        placeholder="Song Name"
      />
      <input
        type="numbers"
        name="release_year"
        value={newSong.release_year}
        onChange={handleInputChange}
        placeholder="Release Year"
      />
      <select
        name="album_id"
        value={newSong.album_id}
        onChange={handleInputChange}
      >
        <option value="">Select Album</option>
        {albums.map((album) => (
          <option key={album.album_id} value={album.album_id}>
            {album.album_name}
          </option>
        ))}
      </select>
      <button onClick={addSong}>Add Song</button>
    </div>
  );
}

export default Song;
