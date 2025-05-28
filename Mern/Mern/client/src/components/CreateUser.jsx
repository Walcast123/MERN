import React, { useEffect, useState } from "react";
import axios from "axios";

function CreateUser() {
  const [username, setUsername] = useState("");
  const [users, setUsers] = useState([]);

  // Carga usuarios al montar componente
  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/v1/users/");
      setUsers(res.data);
    } catch (error) {
      alert("Error loading users");
      console.error(error);
    }
  };

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim()) {
      alert("Username cannot be empty");
      return;
    }
    try {
      console.log("Enviando usuario:", username);
      await axios.post("http://localhost:4000/api/v1/users/", { username });
      setUsername("");
      getUsers();
    }  catch (err) {
  console.error(err.response?.data || err.message);
  alert("Error creating user");
    }
  };

  const deleteUser = async (userId) => {
    const confirmed = window.confirm("Are you sure you want to delete this user?");
    if (!confirmed) return;
    try {
      await axios.delete("http://localhost:4000/api/v1/users/" + userId);
      getUsers();
    } catch (error) {
      alert("Error deleting user");
      console.error(error);
    }
  };

  return (
    <div className="row">
      <div className="col-md-4">
        <div className="card card-body">
          <h3>Create New User</h3>
          <form onSubmit={onSubmit}>
            <div className="form-group mb-3">
              <input
                className="form-control"
                type="text"
                placeholder="Username"
                value={username}
                onChange={onChangeUsername}
                required
                autoFocus
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </form>
        </div>
      </div>

      <div className="col-md-8">
        <ul className="list-group">
          {users.map((user) => (
            <li
              key={user._id}
              className="list-group-item list-group-item-action"
              onDoubleClick={() => deleteUser(user._id)}
              style={{ cursor: "pointer" }}
              title="Double click to delete"
            >
              {user.username}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CreateUser;
