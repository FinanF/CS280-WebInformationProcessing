# Assignment 3: Full-Stack Music Application 

This project is a full-stack application that connects to a school SQL server using a backend server built with Node.js and Express, and a frontend application built with React.

## Project Structure

```
school-sql-project
├── backend
│   ├── src
│   │   ├── server.js        # Entry point for the backend server
│   └── package.json         # Backend dependencies and scripts
├── frontend
│   ├── src
│   │   ├── App.js           # Main component of the React application
│   │   ├── index.js         # Entry point for the React application
│   └── package.json         # Frontend dependencies and scripts
├── README.md                # Project documentation
└── .gitignore               # Files and directories to ignore by Git
```

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- MySQL server

### Backend Setup

1. Navigate to the `backend` directory:
   ```
   cd backend
   ```

2. Install the backend dependencies:
   ```
   npm install
   ```

3. Configure the database connection in `src/server.js` with your MySQL credentials.

4. Start the backend server:
   ```
   npm start
   ```

### Frontend Setup

1. Navigate to the `frontend` directory:
   ```
   cd frontend
   ```

2. Install the frontend dependencies:
   ```
   npm install
   ```

3. Start the React application:
   ```
   npm start
   ```

### API Endpoints

- The backend server exposes an API endpoint at `/api/data` to fetch data from the MySQL database.

## License

This project is licensed under the MIT License.
