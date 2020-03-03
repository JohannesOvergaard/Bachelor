import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import "./HomeButton.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

export function HomeButton() {
  return (
    <Link to="/">
      <button className="homebutton">
        <FontAwesomeIcon icon={faHome} />
      </button>
    </Link>
  );
}
