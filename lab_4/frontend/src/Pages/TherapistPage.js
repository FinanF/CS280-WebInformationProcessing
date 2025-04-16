import React, { useState, useEffect } from "react";
import axios from "axios";

function TherapistPage() {
  const [therapists, setTherapists] = useState([]);
  const [newTherapist, setNewTherapist] = useState({
    title: "",
    name: "",
    email: "",
    location: "",
    years_of_practice: "",
    availability: "TAKING CLIENTS",
  });
  const [editingTherapist, setEditingTherapist] = useState(null); // Track the therapist being edited

  useEffect(() => {
    fetchTherapists();
  }, []);

  const fetchTherapists = () => {
    axios
      .get("http://localhost:5001/api/therapists")
      .then((response) => setTherapists(response.data))
      .catch((error) => console.error("Error fetching therapists:", error));
  };

  const addTherapist = () => {
    axios
      .post("http://localhost:5001/api/therapists", newTherapist)
      .then(() => {
        fetchTherapists();
        setNewTherapist({
          title: "",
          name: "",
          email: "",
          location: "",
          years_of_practice: "",
          availability: "TAKING CLIENTS",
        });
      })
      .catch((error) => console.error("Error adding therapist:", error));
  };

  const deleteTherapist = (id) => {
    axios
      .delete(`http://localhost:5001/api/therapists/${id}`)
      .then(() => fetchTherapists())
      .catch((error) => console.error("Error deleting therapist:", error));
  };

  const startEditing = (therapist) => {
    setEditingTherapist(therapist);
  };

  const updateTherapist = () => {
    axios
      .put(
        `http://localhost:5001/api/therapists/${editingTherapist.therapist_id}`,
        editingTherapist
      )
      .then(() => {
        fetchTherapists();
        setEditingTherapist(null); // Clear the editing state
      })
      .catch((error) => console.error("Error updating therapist:", error));
  };

  return (
    <div>
      <h1>Therapists</h1>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Name</th>
            <th>Email</th>
            <th>Location</th>
            <th>Years of Practice</th>
            <th>Availability</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {therapists.map((therapist) => (
            <tr key={therapist.therapist_id}>
              <td>{therapist.title}</td>
              <td>{therapist.name}</td>
              <td>{therapist.email}</td>
              <td>{therapist.location}</td>
              <td>{therapist.years_of_practice}</td>
              <td>{therapist.availability}</td>
              <td>
                <button onClick={() => deleteTherapist(therapist.therapist_id)}>
                  Delete
                </button>
                <button onClick={() => startEditing(therapist)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>{editingTherapist ? "Edit Therapist" : "Add Therapist"}</h2>
      <input
        type="text"
        placeholder="Title"
        value={editingTherapist ? editingTherapist.title : newTherapist.title}
        onChange={(e) =>
          editingTherapist
            ? setEditingTherapist({
                ...editingTherapist,
                title: e.target.value,
              })
            : setNewTherapist({ ...newTherapist, title: e.target.value })
        }
      />
      <input
        type="text"
        placeholder="Name"
        value={editingTherapist ? editingTherapist.name : newTherapist.name}
        onChange={(e) =>
          editingTherapist
            ? setEditingTherapist({ ...editingTherapist, name: e.target.value })
            : setNewTherapist({ ...newTherapist, name: e.target.value })
        }
      />
      <input
        type="email"
        placeholder="Email"
        value={editingTherapist ? editingTherapist.email : newTherapist.email}
        onChange={(e) =>
          editingTherapist
            ? setEditingTherapist({
                ...editingTherapist,
                email: e.target.value,
              })
            : setNewTherapist({ ...newTherapist, email: e.target.value })
        }
      />
      <input
        type="text"
        placeholder="Location"
        value={
          editingTherapist ? editingTherapist.location : newTherapist.location
        }
        onChange={(e) =>
          editingTherapist
            ? setEditingTherapist({
                ...editingTherapist,
                location: e.target.value,
              })
            : setNewTherapist({ ...newTherapist, location: e.target.value })
        }
      />
      <input
        type="number"
        placeholder="Years of Practice"
        value={
          editingTherapist
            ? editingTherapist.years_of_practice
            : newTherapist.years_of_practice
        }
        onChange={(e) =>
          editingTherapist
            ? setEditingTherapist({
                ...editingTherapist,
                years_of_practice: e.target.value,
              })
            : setNewTherapist({
                ...newTherapist,
                years_of_practice: e.target.value,
              })
        }
      />
      <select
        value={
          editingTherapist
            ? editingTherapist.availability
            : newTherapist.availability
        }
        onChange={(e) =>
          editingTherapist
            ? setEditingTherapist({
                ...editingTherapist,
                availability: e.target.value,
              })
            : setNewTherapist({ ...newTherapist, availability: e.target.value })
        }
      >
        <option value="TAKING CLIENTS">Taking Clients</option>
        <option value="NOT TAKING CLIENTS">Not Taking Clients</option>
      </select>
      {editingTherapist ? (
        <button onClick={updateTherapist}>Update Therapist</button>
      ) : (
        <button onClick={addTherapist}>Add Therapist</button>
      )}
    </div>
  );
}

export default TherapistPage;
