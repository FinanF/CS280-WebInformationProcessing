import React, { useState, useEffect } from "react";
import axios from "axios";

function ClientPage() {
  const [clients, setClients] = useState([]);
  const [newClient, setNewClient] = useState({
    name: "",
    email: "",
    phone_number: "",
    regularity: "WEEKLY",
  });
  const [editingClient, setEditingClient] = useState(null); // Track the client being edited

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = () => {
    axios
      .get("http://localhost:5001/api/clients")
      .then((response) => setClients(response.data))
      .catch((error) => console.error("Error fetching clients:", error));
  };

  const addClient = () => {
    axios
      .post("http://localhost:5001/api/clients", newClient)
      .then(() => {
        fetchClients();
        setNewClient({
          name: "",
          email: "",
          phone_number: "",
          regularity: "WEEKLY",
        });
      })
      .catch((error) => console.error("Error adding client:", error));
  };

  const deleteClient = (id) => {
    axios
      .delete(`http://localhost:5001/api/clients/${id}`)
      .then(() => fetchClients())
      .catch((error) => console.error("Error deleting client:", error));
  };

  const startEditing = (client) => {
    setEditingClient(client);
  };

  const updateClient = () => {
    axios
      .put(
        `http://localhost:5001/api/clients/${editingClient.client_id}`,
        editingClient
      )
      .then(() => {
        fetchClients();
        setEditingClient(null); // Clear the editing state
      })
      .catch((error) => console.error("Error updating client:", error));
  };

  return (
    <div>
      <h1>Clients</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Regularity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.client_id}>
              <td>{client.name}</td>
              <td>{client.email}</td>
              <td>{client.phone_number}</td>
              <td>{client.regularity}</td>
              <td>
                <button onClick={() => deleteClient(client.client_id)}>
                  Delete
                </button>
                <button onClick={() => startEditing(client)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>{editingClient ? "Edit Client" : "Add Client"}</h2>
      <input
        type="text"
        placeholder="Name"
        value={editingClient ? editingClient.name : newClient.name}
        onChange={(e) =>
          editingClient
            ? setEditingClient({ ...editingClient, name: e.target.value })
            : setNewClient({ ...newClient, name: e.target.value })
        }
      />
      <input
        type="email"
        placeholder="Email"
        value={editingClient ? editingClient.email : newClient.email}
        onChange={(e) =>
          editingClient
            ? setEditingClient({ ...editingClient, email: e.target.value })
            : setNewClient({ ...newClient, email: e.target.value })
        }
      />
      <input
        type="text"
        placeholder="Phone Number"
        value={
          editingClient ? editingClient.phone_number : newClient.phone_number
        }
        onChange={(e) =>
          editingClient
            ? setEditingClient({
                ...editingClient,
                phone_number: e.target.value,
              })
            : setNewClient({ ...newClient, phone_number: e.target.value })
        }
      />
      <select
        value={editingClient ? editingClient.regularity : newClient.regularity}
        onChange={(e) =>
          editingClient
            ? setEditingClient({ ...editingClient, regularity: e.target.value })
            : setNewClient({ ...newClient, regularity: e.target.value })
        }
      >
        <option value="WEEKLY">Weekly</option>
        <option value="MONTHLY">Monthly</option>
      </select>
      {editingClient ? (
        <button onClick={updateClient}>Update Client</button>
      ) : (
        <button onClick={addClient}>Add Client</button>
      )}
    </div>
  );
}

export default ClientPage;
