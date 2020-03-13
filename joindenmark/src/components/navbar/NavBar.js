import React from "react";
import "./NavBar.css";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faSearch} from "@fortawesome/free-solid-svg-icons";

export function NavBar(props) {
  let history = useHistory();

  return (
    <div className="navbar">
      <div className="back">
        <FontAwesomeIcon icon={faChevronLeft} onClick={() => history.goBack()}/>
      </div>
      <p className="title">{props.state.title}</p>
      <div className="find">
        <FontAwesomeIcon icon={faSearch} />
      </div>
    </div>
  );
}
