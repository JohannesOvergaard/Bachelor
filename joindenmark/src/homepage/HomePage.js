import React, { useState, useEffect } from "react";
import "./HomePage.css";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { convertToPath, trim } from "../Util/Helpers";
import { JoinDkTile } from "../components/joindktile/JoinDkTile";
import { getContentSnapShot, getContent } from "../services/ContentService";
import { Search } from "../components/search/Search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faSearch } from "@fortawesome/free-solid-svg-icons";
import { generateTiles } from "../Util/Helpers";

export function HomePage() {
  const [tiles, setTiles] = useState({});
  const joinDkTitle = "Join Denmark";
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    getContentSnapShot("tile").then(setTiles);
  }, []);

  function generateNavbar() {
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

  return (
    <div>
      {generateNavbar()}
      <br />
      <Link
        key={trim(joinDkTitle)}
        to={{
          pathname: convertToPath(joinDkTitle),
          state: { title: joinDkTitle }
        }}
      >
        <JoinDkTile state={{ title: joinDkTitle }} />
      </Link>
      {generateTiles(tiles, "")}
    </div>
  );
}
