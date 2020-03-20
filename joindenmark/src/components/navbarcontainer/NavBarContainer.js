import React, { useState } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { Search } from "../search/Search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faSearch } from "@fortawesome/free-solid-svg-icons";

export function NavbarContainer() {
  const [showSearch, setShowSearch] = useState(false);

  if (!showSearch) {
    return (
      <div>
        <div className="settings">
          <Link
            to={{
              pathname: "/settings",
              state: { title: "Settings" }
            }}
          >
            <FontAwesomeIcon icon={faCog} />
          </Link>
        </div>
        <div className="search" onClick={() => setShowSearch(!showSearch)}>
          <FontAwesomeIcon icon={faSearch} />
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <Search setShowSearch={setShowSearch} />
      </div>
    );
  }
}
