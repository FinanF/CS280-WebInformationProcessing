import React, { useState, useEffect } from "react";
import axios from "axios";

function Album() {
  const [albums, setAlbums] = useState([]);
  const [artists, setArtists] = useState([]);
  const [newAlbum, setNewAlbum] = useState({
    album_name: "",
    artist_id: "",
    release_year: "",
    number_of_listens: "",
  });

  useEffect(() => {
    fetchAlbums();
    fetchArtists();
  }, []);

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

  const addAlbum = () => {
    axios
      .post("http://localhost:5000/api/album", newAlbum)
      .then(() => {
        fetchAlbums();
        setNewAlbum({
          album_name: "",
          artist_id: "",
          release_year: "",
          number_of_listens: "",
        });
      })
      .catch((error) => {
        console.error("Error adding album:", error);
      });
  };

  const deleteAlbum = (id) => {
    axios
      .delete(`http://localhost:5000/api/album/${id}`)
      .then(() => {
        fetchAlbums();
      })
      .catch((error) => {
        console.error("Error deleting album:", error);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAlbum((prevAlbum) => ({
      ...prevAlbum,
      [name]: value,
    }));
  };

  return (
    <div>
      <h1>Album</h1>
      <ul>
        {albums.map((album) => (
          <li key={album.album_id}>
            {album.album_name} - {album.release_year} -{" "}
            {album.number_of_listens} listens
            <button onClick={() => deleteAlbum(album.album_id)}>Delete</button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        name="album_name"
        value={newAlbum.album_name}
        onChange={handleInputChange}
        placeholder="Album Name"
      />
      <select
        name="artist_id"
        value={newAlbum.artist_id}
        onChange={handleInputChange}
      >
        <option value="">Select Artist</option>
        {artists.map((artist) => (
          <option key={artist.artist_id} value={artist.artist_id}>
            {artist.artist_name}
          </option>
        ))}
      </select>
      <input
        type="text"
        name="release_year"
        value={newAlbum.release_year}
        onChange={handleInputChange}
        placeholder="Release Year"
      />
      <input
        type="number"
        name="number_of_listens"
        value={newAlbum.number_of_listens}
        onChange={handleInputChange}
        placeholder="Number of Listens"
      />
      <button onClick={addAlbum}>Add Album</button>
    </div>
  );
}

export default Album;
