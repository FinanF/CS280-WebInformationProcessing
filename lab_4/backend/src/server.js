const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
const port = 5001; // Use a different port for lab_4

// Enable CORS for React app
app.use(cors());
app.use(express.json()); // Parse JSON request bodies

// MySQL connection pool
const pool = mysql
  .createConnection({
    host: "webcourse.cs.nuim.ie",
    user: "u230198",
    database: "cs230_u230198",
    password: "ugoo7Ohmiechiebi",
  })
  .promise();

// API endpoint to fetch all therapists
app.get("/api/therapists", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM Therapist");
    res.json(rows);
  } catch (error) {
    console.error("Error fetching therapists:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// API endpoint to add a therapist
app.post("/api/therapists", async (req, res) => {
  const { title, name, email, location, years_of_practice, availability } =
    req.body;
  try {
    await pool.query(
      "INSERT INTO Therapist (title, name, email, location, years_of_practice, availability) VALUES (?, ?, ?, ?, ?, ?)",
      [title, name, email, location, years_of_practice, availability]
    );
    res.status(201).json({ message: "Therapist added successfully" });
  } catch (error) {
    console.error("Error adding therapist:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// API endpoint to update a therapist
app.put("/api/therapists/:id", async (req, res) => {
  const { id } = req.params;
  const { title, name, email, location, years_of_practice, availability } =
    req.body;
  try {
    await pool.query(
      "UPDATE Therapist SET title = ?, name = ?, email = ?, location = ?, years_of_practice = ?, availability = ? WHERE therapist_id = ?",
      [title, name, email, location, years_of_practice, availability, id]
    );
    res.status(200).json({ message: "Therapist updated successfully" });
  } catch (error) {
    console.error("Error updating therapist:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// API endpoint to delete a therapist
app.delete("/api/therapists/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM Therapist WHERE therapist_id = ?", [id]);
    res.status(200).json({ message: "Therapist deleted successfully" });
  } catch (error) {
    console.error("Error deleting therapist:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// API endpoint to fetch all clients
app.get("/api/clients", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM Client");
    res.json(rows);
  } catch (error) {
    console.error("Error fetching clients:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// API endpoint to add a client
app.post("/api/clients", async (req, res) => {
  const { name, email, phone_number, regularity } = req.body;
  try {
    await pool.query(
      "INSERT INTO Client (name, email, phone_number, regularity) VALUES (?, ?, ?, ?)",
      [name, email, phone_number, regularity]
    );
    res.status(201).json({ message: "Client added successfully" });
  } catch (error) {
    console.error("Error adding client:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// API endpoint to update a client
app.put("/api/clients/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email, phone_number, regularity } = req.body;
  try {
    await pool.query(
      "UPDATE Client SET name = ?, email = ?, phone_number = ?, regularity = ? WHERE client_id = ?",
      [name, email, phone_number, regularity, id]
    );
    res.status(200).json({ message: "Client updated successfully" });
  } catch (error) {
    console.error("Error updating client:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// API endpoint to delete a client
app.delete("/api/clients/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM Client WHERE client_id = ?", [id]);
    res.status(200).json({ message: "Client deleted successfully" });
  } catch (error) {
    console.error("Error deleting client:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// API endpoint to fetch all sessions
app.get("/api/sessions", async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        Session.session_id,
        Therapist.name AS therapist_name,
        Client.name AS client_name,
        Session.notes,
        Session.session_date,
        Session.session_length
      FROM 
        Session
      JOIN 
        Therapist ON Session.therapist_id = Therapist.therapist_id
      JOIN 
        Client ON Session.client_id = Client.client_id
    `);
    res.json(rows);
  } catch (error) {
    console.error("Error fetching sessions:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// API endpoint to add a session
app.post("/api/sessions", async (req, res) => {
  const { therapist_id, client_id, notes, session_date, session_length } =
    req.body;
  try {
    await pool.query(
      "INSERT INTO Session (therapist_id, client_id, notes, session_date, session_length) VALUES (?, ?, ?, ?, ?)",
      [therapist_id, client_id, notes, session_date, session_length]
    );
    res.status(201).json({ message: "Session added successfully" });
  } catch (error) {
    console.error("Error adding session:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// API endpoint to update a session
app.put("/api/sessions/:id", async (req, res) => {
  const { id } = req.params;
  const { therapist_id, client_id, notes, session_date, session_length } =
    req.body;
  try {
    await pool.query(
      "UPDATE Session SET therapist_id = ?, client_id = ?, notes = ?, session_date = ?, session_length = ? WHERE session_id = ?",
      [therapist_id, client_id, notes, session_date, session_length, id]
    );
    res.status(200).json({ message: "Session updated successfully" });
  } catch (error) {
    console.error("Error updating session:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// API endpoint to delete a session
app.delete("/api/sessions/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM Session WHERE session_id = ?", [id]);
    res.status(200).json({ message: "Session deleted successfully" });
  } catch (error) {
    console.error("Error deleting session:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Backend server running at http://localhost:${port}`);
});
