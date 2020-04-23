import React, { useState } from "react";
import "./NavBar.css";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faSearch } from "@fortawesome/free-solid-svg-icons";
import { Search } from "../search/Search";

export function NavBar(props) {
  let history = useHistory();
  const [showSearch, setShowSearch] = useState(false);

  return (
    <div>
      {!showSearch ? (
        <div className="navbar">
          <div className="back">
            <FontAwesomeIcon
              icon={faChevronLeft}
              onClick={() => history.goBack()}
            />
          </div>
          <p className="title">{props.state.title}</p>
          <div className="find" onClick={() => setShowSearch(!showSearch)}>
            <FontAwesomeIcon icon={faSearch} />
          </div>
        </div>
      ) : (
        <div>
          <Search setShowSearch={setShowSearch} />
        </div>
      )}
    </div>
  );
}
