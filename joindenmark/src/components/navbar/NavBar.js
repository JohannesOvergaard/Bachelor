import React from "react";
import "./NavBar.css";
import { useHistory } from "react-router-dom";

export function NavBar(props) {
  let history = useHistory();

  return (
    <div className="navbar">
      <p onClick={() => history.goBack()} className="back">
        Go Back
      </p>
      <p className="title">{props.state.title}</p>
      <p className="search">Search</p>
    </div>
  );
}
