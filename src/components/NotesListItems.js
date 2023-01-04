import React from "react";
import { Link } from "react-router-dom";

const NotesListItems = ({ note }) => {
  return (
    <Link to={`/notes/${note.id}`}>
      <div className="notes-list-item">
        <p>
          {note.notes}
        </p>
      </div>
    </Link>
  );
};

export default NotesListItems;
