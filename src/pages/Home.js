import React, { useState, useEffect } from "react";
import getRequest from "../api/getRequest";
import AddNoteButton from "../components/AddNoteButton"
import NotesListItems from "../components/NotesListItems";

const Home = () => {
  let [notes, setNotes] = useState([]);

  useEffect(() => {
    getNotes();
  }, []);

  let getNotes = async () => {
    const url = "http://127.0.0.1:8000/api/notes/";
    const response = await getRequest(url);
    const data = await response.json();
    setNotes(data);
  };

  return (
    <div className="container mt-2">
      <h2 className="text-center">Home</h2>
      <div className="notes">
        <div className="notes-header">
          <h2 className="notes-title">&#9782; Notes</h2>
          <p className="notes-count">{notes.length}</p>
        </div>

        <div className="notes-list">
          {notes.map((note, index) => (
            <NotesListItems key={index} note={note} />
          ))}
        </div>
        <AddNoteButton />
      </div>
    </div>
  );
};

export default Home;
