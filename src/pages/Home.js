import React, { useState, useEffect, useContext } from "react";
import fetchApi from "../api/fetchApi";
import AddNoteButton from "../components/AddNoteButton";
import NotesListItems from "../components/NotesListItems";
import UserContext from "../context/UserContext";

const Home = () => {
  const [notes, setNotes] = useState([]);
  const { authToken } = useContext(UserContext);

  useEffect(() => {
    getNotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let getNotes = async () => {
    try {
      const url = "http://127.0.0.1:8000/api/notes/";
      const response = await fetchApi({
        url: url,
        reqMethod: "GET",
        userData: null,
        access: authToken.access,
      });
      const data = await response.json();
      setNotes(data);
    } catch {
      setNotes([]);
    }
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
