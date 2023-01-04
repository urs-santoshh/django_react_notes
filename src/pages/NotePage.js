import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import fetchApi from "../api/fetchApi";
import { ReactComponent as ArrowLeft } from "../assets/arrow-left.svg";
import AlertContext from "../context/AlertContext";
import UserContext from "../context/UserContext";

const NotePage = () => {
  const navigate = useNavigate();
  const { showAlert } = useContext(AlertContext);
  const { user, authToken } = useContext(UserContext);
  const { noteId } = useParams();
  const [note, setNote] = useState({
    notes: "",
  });

  useEffect(() => {
    getNote();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let handleChange = (value) => {
    setNote((note) => ({ ...note, notes: value }));
  };

  const getNote = async () => {
    const url = `http://127.0.0.1:8000/api/notes/${noteId}/`;
    if (noteId === "new") {
      return;
    }
    const response = await fetchApi({
      url: url,
      reqMethod: "GET",
      userData: null,
      access: authToken.access,
    });
    const data = await response.json();
    setNote(data);
  };

  const createNote = async () => {
    const url = "http://127.0.0.1:8000/api/notes/create/";
    const response = await fetchApi({
      url: url,
      reqMethod: "POST",
      userData: note,
      access: authToken.access,
    });
    if (response.status === 200) {
      showAlert("Note Created", "success");
    } else {
      showAlert("Something went wrong", "warning");
    }
    navigate("/");
  };

  const updateNote = async () => {
    const url = `http://127.0.0.1:8000/api/notes/${noteId}/update/`;
    const response = await fetchApi({
      url: url,
      reqMethod: "PUT",
      userData: note,
      access: null,
    });
    if (response.status === 200) {
      showAlert("Note Updated", "success");
    } else {
      showAlert("Something went wrong", "warning");
    }
    navigate("/");
  };

  const deleteNote = async () => {
    const url = `http://127.0.0.1:8000/api/notes/${noteId}/delete/`;
    const response = await fetchApi({
      url: url,
      reqMethod: "DELETE",
      userData: null,
      access: null,
    });
    if (response.status === 200) {
      showAlert("Note Deleted", "success");
    } else {
      showAlert("Something went wrong", "warning");
    }
    navigate("/");
  };

  const handleSubmit = () => {
    if (noteId !== "new" && note.notes === "") {
      deleteNote();
    } else if (noteId !== "new") {
      updateNote();
    } else if (noteId === "new" && note.notes !== "") {
      createNote();
    }
    navigate("/");
  };

  return (
    <div className="container mt-2">
      <div className="note">
        <div className="note-header">
          <h3>
            <ArrowLeft onClick={handleSubmit} />
          </h3>
          {noteId !== "new" ? (
            <button onClick={deleteNote}> Delete </button>
          ) : (
            <button onClick={handleSubmit}> Done </button>
          )}
        </div>
        <textarea
          onChange={(e) => handleChange(e.target.value)}
          value={note?.notes}
        ></textarea>
      </div>
    </div>
  );
};

export default NotePage;
