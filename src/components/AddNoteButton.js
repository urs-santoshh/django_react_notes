import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as AddButton } from "../assets/add.svg";

const AddNoteButton = () => {
  return (
    <div className="floating-button">
      <Link to="/notes/new">
        <AddButton />
      </Link>
    </div>
  );
};

export default AddNoteButton
