import React, { useState } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { Search } from "../search/Search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faSearch, faUser } from "@fortawesome/free-solid-svg-icons";
import { login } from "../../firebase";

export function NavbarContainer() {
  const [showSearch, setShowSearch] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function onLogin(){
    login().then(setIsLoggedIn(!isLoggedIn));
  }

  return (
    <div>
      {!showSearch && <div>
        <div className="settings">
              {isLoggedIn &&
              <Link
                to={{
                  pathname: "/settings",
                  state: { title: "Settings" }
                }}
              >
                <FontAwesomeIcon icon={faCog} />
              </Link>}
              {!isLoggedIn &&
              <div onClick={() => onLogin()}>
                <FontAwesomeIcon icon={faUser}/>
              </div>
              }
        </div>
        <div className="search" onClick={() => setShowSearch(!showSearch)}>
            {!showSearch && <FontAwesomeIcon icon={faSearch} />}
        </div>
      </div>}
      {showSearch && <div>
        <Search setShowSearch={setShowSearch} />
      </div>
      }
    </div>
  );
}
