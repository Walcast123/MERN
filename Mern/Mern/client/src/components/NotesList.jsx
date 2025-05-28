import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export function NotesList() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const getNotes = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/v1/notes/");
        setNotes(res.data);
      } catch (error) {
        console.error("Error loading notes:", error);
        alert("Failed to load notes");
      }
    };
    getNotes();
  }, []);

  const deleteNote = async (noteId) => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;
    try {
      const res = await axios.delete("http://localhost:4000/api/v1/notes/" + noteId);
      if (res.status === 204) {
        setNotes(notes.filter((note) => note._id !== noteId));
      }
    } catch (error) {
      console.error("Error deleting note:", error);
      alert("Failed to delete note");
    }
  };

  return (
    <div className="row">
      {notes.map((note) => (
        <div className="col-md-4 p-2" key={note._id}>
          <div className="card rounded-0">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5>{note.title}</h5>
              <Link to={"/edit/" + note._id} className="btn btn-sm">
                <i className="material-icons">border_color</i>
              </Link>
            </div>
            <div className="card-body">
              <p>{note.content}</p>
              <p>
                <strong>Author:</strong> {note.author}
              </p>
              {/* Puedes habilitar esta línea si importas y usas 'format' para fechas */}
              {/* <p>{format(note.createdAt)}</p> */}
            </div>
            <div className="card-footer">
              <button
                className="btn btn-danger"
                onClick={() => deleteNote(note._id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
