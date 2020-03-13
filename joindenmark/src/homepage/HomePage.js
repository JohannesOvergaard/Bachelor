import React, { useState, useEffect } from "react";
import { Tile } from "../components/tile/Tile";
import "./HomePage.css";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { convertToPath, trim } from "../Util/Helpers";
import { JoinDkTile } from "../components/joindktile/JoinDkTile";
import { getContentSnapShot } from "../services/ContentService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faSearch } from "@fortawesome/free-solid-svg-icons";

export function HomePage() {
  const [dataFromDB, setDataFromDb] = useState({});
  const [tiles, setTiles] = useState({});
  const joinDkTitle = "Join Denmark";

  useEffect(() => {
    getContentSnapShot("tile").then(setTiles);
  }, []);

  function generateTiles() {
    return (
      tiles.docs &&
      tiles.docs.length > 0 &&
      tiles.docs.map(tile => {
        const data = tile.data();
        return (
          <Link
            key={tile.id}
            to={{
              pathname: convertToPath(data.title),
              state: { title: data.title, picture: data.picture }
            }}
          >
            <Tile state={{ title: data.title, picture: data.picture }} />
          </Link>
        );
      })
    );
  }

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
      <div className="search">
        <FontAwesomeIcon icon={faSearch} />
      </div>
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
      {generateTiles()}
    </div>
  );
}
