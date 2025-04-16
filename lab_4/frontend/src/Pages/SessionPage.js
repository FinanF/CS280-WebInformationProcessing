import React, { useState, useEffect } from "react";
import axios from "axios";

function SessionPage() {
  const [sessions, setSessions] = useState([]);
  const [therapists, setTherapists] = useState([]);
  const [clients, setClients] = useState([]);
  const [newSession, setNewSession] = useState({
    therapist_id: "",
    client_id: "",
    notes: "",
    session_date: "",
    session_length: "",
  });
  const [editingSession, setEditingSession] = useState(null); // Track the session being edited

  useEffect(() => {
    fetchSessions();
    fetchTherapists();
    fetchClients();
  }, []);

  const fetchSessions = () => {
    axios
      .get("http://localhost:5001/api/sessions")
      .then((response) => setSessions(response.data))
      .catch((error) => console.error("Error fetching sessions:", error));
  };

  const fetchTherapists = () => {
    axios
      .get("http://localhost:5001/api/therapists")
      .then((response) => setTherapists(response.data))
      .catch((error) => console.error("Error fetching therapists:", error));
  };

  const fetchClients = () => {
    axios
      .get("http://localhost:5001/api/clients")
      .then((response) => setClients(response.data))
      .catch((error) => console.error("Error fetching clients:", error));
  };

  const addSession = () => {
    if (!newSession.therapist_id || !newSession.client_id) {
      alert("Please select a therapist and a client.");
      return;
    }
    axios
      .post("http://localhost:5001/api/sessions", newSession)
      .then(() => {
        fetchSessions();
        setNewSession({
          therapist_id: "",
          client_id: "",
          notes: "",
          session_date: "",
          session_length: "",
        });
      })
      .catch((error) => console.error("Error adding session:", error));
  };

  const deleteSession = (id) => {
    axios
      .delete(`http://localhost:5001/api/sessions/${id}`)
      .then(() => fetchSessions())
      .catch((error) => console.error("Error deleting session:", error));
  };

  const startEditing = (session) => {
    setEditingSession(session);
  };

  const updateSession = () => {
    if (!editingSession.therapist_id || !editingSession.client_id) {
      alert("Please select a therapist and a client.");
      return;
    }
    axios
      .put(
        `http://localhost:5001/api/sessions/${editingSession.session_id}`,
        editingSession
      )
      .then(() => {
        fetchSessions();
        setEditingSession(null); // Clear the editing state
      })
      .catch((error) => console.error("Error updating session:", error));
  };

  return (
    <div>
      <h1>Sessions</h1>
      <table>
        <thead>
          <tr>
            <th>Therapist</th>
            <th>Client</th>
            <th>Notes</th>
            <th>Date</th>
            <th>Length</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sessions.map((session) => (
            <tr key={session.session_id}>
              <td>{session.therapist_name || "Unknown Therapist"}</td>
              <td>{session.client_name || "Unknown Client"}</td>
              <td>{session.notes}</td>
              <td>{session.session_date}</td>
              <td>{session.session_length} minutes</td>
              <td>
                <button onClick={() => deleteSession(session.session_id)}>
                  Delete
                </button>
                <button onClick={() => startEditing(session)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>{editingSession ? "Edit Session" : "Add Session"}</h2>
      <select
        value={
          editingSession ? editingSession.therapist_id : newSession.therapist_id
        }
        onChange={(e) =>
          editingSession
            ? setEditingSession({
                ...editingSession,
                therapist_id: e.target.value,
              })
            : setNewSession({ ...newSession, therapist_id: e.target.value })
        }
      >
        <option value="">Select Therapist</option>
        {therapists.map((therapist) => (
          <option key={therapist.therapist_id} value={therapist.therapist_id}>
            {therapist.name}
          </option>
        ))}
      </select>
      <select
        value={editingSession ? editingSession.client_id : newSession.client_id}
        onChange={(e) =>
          editingSession
            ? setEditingSession({
                ...editingSession,
                client_id: e.target.value,
              })
            : setNewSession({ ...newSession, client_id: e.target.value })
        }
      >
        <option value="">Select Client</option>
        {clients.map((client) => (
          <option key={client.client_id} value={client.client_id}>
            {client.name}
          </option>
        ))}
      </select>
      <textarea
        placeholder="Notes"
        value={editingSession ? editingSession.notes : newSession.notes}
        onChange={(e) =>
          editingSession
            ? setEditingSession({ ...editingSession, notes: e.target.value })
            : setNewSession({ ...newSession, notes: e.target.value })
        }
      />
      <input
        type="date"
        value={
          editingSession ? editingSession.session_date : newSession.session_date
        }
        onChange={(e) =>
          editingSession
            ? setEditingSession({
                ...editingSession,
                session_date: e.target.value,
              })
            : setNewSession({ ...newSession, session_date: e.target.value })
        }
      />
      <input
        type="number"
        placeholder="Length (minutes)"
        value={
          editingSession
            ? editingSession.session_length
            : newSession.session_length
        }
        onChange={(e) =>
          editingSession
            ? setEditingSession({
                ...editingSession,
                session_length: e.target.value,
              })
            : setNewSession({ ...newSession, session_length: e.target.value })
        }
      />
      {editingSession ? (
        <button onClick={updateSession}>Update Session</button>
      ) : (
        <button onClick={addSession}>Add Session</button>
      )}
    </div>
  );
}

export default SessionPage;
