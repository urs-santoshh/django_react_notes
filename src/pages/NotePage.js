import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import getRequest from "../api/getRequest";
import { ReactComponent as ArrowLeft } from "../assets/arrow-left.svg";

const NotePage = () => {
  const navigate = useNavigate();
  const { noteId } = useParams();
  const url = `http://127.0.0.1:8000/api/notes/${noteId}/`;
  const [note, setNote] = useState(null);

  useEffect(() => {
    getNote();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getNote = async () => {
    if (noteId === "new") {
      return;
    }
    let response = await getRequest(url);
    let data = await response.json();
    setNote(data);
  };

  const handleSubmit = () => {
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
            <button> Delete </button>
          ) : (
            <button> Done </button>
          )}
        </div>
        <textarea
          // onChange={(e) => handleChange(e.target.value)}
          value={note?.notes}
        ></textarea>
      </div>
    </div>
  );
};

export default NotePage;
