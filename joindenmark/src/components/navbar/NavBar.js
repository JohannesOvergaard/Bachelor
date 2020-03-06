import React, { useState, useEffect } from "react";
import "./NavBar.css";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft} from "@fortawesome/free-solid-svg-icons";

export function NavBar(props) {
  let history = useHistory();

  return (
    <div className="navbar">
      <FontAwesomeIcon icon={faChevronLeft} onClick={() => history.goBack()} className="back"/>
      <p className="title">{props.state.title}</p>
      <p className="search">Search</p>
    </div>
  );
}
