import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function CreateNote() {
  const [content, setContent] = useState({
    title: "",
    content: "",
    date: new Date(),
    userSelected: "",
    users: [],
    _id: "",
  });

  const [editing, setEditing] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Cargar usuarios
        const usersRes = await axios.get("http://localhost:4000/api/v1/users/");
        const users = usersRes.data.map((user) => user.username);

        if (users.length > 0) {
          setContent((prev) => ({
            ...prev,
            users: users,
            userSelected: users[0],
          }));
        }

        // Si viene id, cargar nota para editar
        if (params.id) {
          const noteRes = await axios.get(
            "http://localhost:4000/api/v1/notes/" + params.id
          );
          const note = noteRes.data;
          setContent({
            title: note.title,
            content: note.content,
            date: new Date(note.date),
            userSelected: note.author,
            users: users,
            _id: note._id,
          });
          setEditing(true);
        }
      } catch (error) {
        alert("Error loading data");
        console.error(error);
      }
    };
    fetchData();
  }, [params.id]);

  const onInputChange = ({ target: { name, value } }) => {
    setContent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onChangeDate = (date) => {
    setContent((prev) => ({
      ...prev,
      date: date,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await axios.put("http://localhost:4000/api/v1/notes/" + content._id, {
          title: content.title,
          content: content.content,
          author: content.userSelected,
          date: content.date,
        });
      } else {
        await axios.post("http://localhost:4000/api/v1/notes/", {
          title: content.title,
          content: content.content,
          author: content.userSelected,
          date: content.date,
        });
      }
      navigate("/");
    } catch (error) {
      alert("Error saving note");
      console.error(error);
    }
  };

  return (
    <div className="col-md-6 offset-md-3">
      <div className="card card-body">
        <h4>{editing ? "Edit Note" : "Create a Note"}</h4>
        <form onSubmit={onSubmit}>
          <div className="form-group mb-3">
            <select
              className="form-control"
              name="userSelected"
              value={content.userSelected}
              onChange={onInputChange}
              required
            >
              {content.users.map((user) => (
                <option key={user} value={user}>
                  {user}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Title"
              name="title"
              value={content.title}
              onChange={onInputChange}
              required
              autoFocus
            />
          </div>
          <div className="mb-3">
            <textarea
              className="form-control"
              placeholder="Content"
              name="content"
              value={content.content}
              onChange={onInputChange}
              required
              rows={5}
            ></textarea>
          </div>
          <div className="form-group mb-3">
            <DatePicker
              className="form-control"
              selected={content.date}
              onChange={onChangeDate}
            />
          </div>
          <button className="btn btn-primary">
            Save <i className="material-icons">assignment</i>
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateNote;
