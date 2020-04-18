import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Link, Redirect } from "react-router-dom";
import { Search } from "../search/Search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faSearch, faUser } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";

export function NavbarContainer() {
  const [showSearch, setShowSearch] = useState();
  const [isLoggedIn] = useState(
    useSelector((state) => state.userState.loggedIn)
  );

  return (
    <div>
      {!showSearch && (
        <div>
          <div className="settings">
            {isLoggedIn && (
              <Link to="/settings">
                <FontAwesomeIcon icon={faCog} />
              </Link>
            )}
            {!isLoggedIn && (
              <Link to="/login">
                <FontAwesomeIcon icon={faUser} />
              </Link>
            )}
          </div>
          <div className="search" onClick={() => setShowSearch(!showSearch)}>
            {!showSearch && <FontAwesomeIcon icon={faSearch} />}
          </div>
        </div>
      )}
      {showSearch && (
        <div>
          <Search setShowSearch={setShowSearch} />
        </div>
      )}
    </div>
  );
}