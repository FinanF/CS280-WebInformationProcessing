const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
const port = 5000;

// Enable CORS for React app
app.use(cors());
app.use(express.json()); // Add this line to parse JSON request bodies

// MySQL connection pool
const pool = mysql
  .createConnection({
    host: "webcourse.cs.nuim.ie",
    user: "u230198",
    database: "cs230_u230198",
    password: "ugoo7Ohmiechiebi",
  })
  .promise();

// API endpoint to fetch data
app.get("/api/data", async (req, res) => {
  try {
    const [artistRows] = await pool.query("SELECT * FROM Artist");
    const [albumRows] = await pool.query("SELECT * FROM Album");
    const [songRows] = await pool.query("SELECT * FROM Song");
    res.json({ artists: artistRows, albums: albumRows, songs: songRows });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// API endpoint to fetch joined data
app.get("/api/homepage-data", async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        Artist.artist_name, 
        Album.album_name, 
        Song.song_name 
      FROM 
        Artist 
      JOIN 
        Album ON Artist.artist_id = Album.artist_id 
      JOIN 
        Song ON Album.album_id = Song.album_id
    `);
    res.json(rows);
  } catch (error) {
    console.error("Error fetching homepage data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// API endpoint to add an artist
app.post("/api/artist", async (req, res) => {
  const { artist_name, monthly_listeners, genre } = req.body;
  try {
    await pool.query(
      "INSERT INTO Artist (artist_name, monthly_listeners, genre) VALUES (?, ?, ?)",
      [artist_name, monthly_listeners, genre]
    );
    res.status(201).json({ message: "Artist added successfully" });
  } catch (error) {
    console.error("Error adding artist:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// API endpoint to delete an artist
app.delete("/api/artist/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM Artist WHERE artist_id = ?", [id]);
    res.status(200).json({ message: "Artist deleted successfully" });
  } catch (error) {
    console.error("Error deleting artist:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// API endpoint to add an album
app.post("/api/album", async (req, res) => {
  const { album_name, artist_id, release_year, number_of_listens } = req.body;
  try {
    await pool.query(
      "INSERT INTO Album (album_name, artist_id, release_year, number_of_listens) VALUES (?, ?, ?, ?)",
      [album_name, artist_id, release_year, number_of_listens]
    );
    res.status(201).json({ message: "Album added successfully" });
  } catch (error) {
    console.error("Error adding album:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// API endpoint to delete an album
app.delete("/api/album/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM Album WHERE album_id = ?", [id]);
    res.status(200).json({ message: "Album deleted successfully" });
  } catch (error) {
    console.error("Error deleting album:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// API endpoint to add a song
app.post("/api/song", async (req, res) => {
  const { song_name, release_year, album_id } = req.body;
  try {
    await pool.query(
      "INSERT INTO Song (song_name, release_year, album_id) VALUES (?, ?, ?)",
      [song_name, release_year, album_id]
    );
    res.status(201).json({ message: "Song added successfully" });
  } catch (error) {
    console.error("Error adding song:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// API endpoint to delete a song
app.delete("/api/song/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM Song WHERE song_id = ?", [id]);
    res.status(200).json({ message: "Song deleted successfully" });
  } catch (error) {
    console.error("Error deleting song:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Backend server running at http://localhost:${port}`);
});
