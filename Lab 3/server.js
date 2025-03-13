const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const port = 5000; // or whichever port your backend should run on

// Enable CORS for frontend-backend communication
app.use(cors());

// Serve static files from React's build folder
app.use(express.static(path.join(__dirname, 'frontend')));

// API route to test backend communication
app.get('/api/message', (req, res) => {
    res.json({ message: "hello from the backend!" });
});

// Serve the React app (after building) if you want Express to serve the frontend too
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'index.js'));
});

// Start the server
app.listen(port, () => {
    console.log(`Backend is running on http://localhost:${port}`);
});