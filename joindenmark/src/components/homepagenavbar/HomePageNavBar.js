import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Search } from "../search/Search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faSearch, faUser } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import "./HomePageNavBar.css";

export function HomePageNavbar() {
  const [showSearch, setShowSearch] = useState();
  const [isLoggedIn] = useState(
    useSelector((state) => state.userState.loggedIn)
  );

  return (
    <div>
      {!showSearch ? (
        <div>
          <div className="settings">
            {isLoggedIn ? (
              <Link to="/settings">
                <FontAwesomeIcon icon={faCog} />
              </Link>
            ) : (
              <Link to="/login">
                <FontAwesomeIcon icon={faUser} />
              </Link>
            )}
          </div>
          <div className="search" onClick={() => setShowSearch(!showSearch)}>
            {!showSearch && <FontAwesomeIcon icon={faSearch} />}
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
