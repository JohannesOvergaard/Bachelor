import React, { useState, useEffect } from "react";
import { Tile } from "../components/tile/Tile";
import "./FrontPage.css";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { convertToPath, trim } from "../Util/Helpers";
import { db } from "../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faSearch } from "@fortawesome/free-solid-svg-icons";
import { JoinDkTile } from "../components/joindktile/JoinDkTile";

export function FrontPage() {
  const dataFromDB = db.collection("tile").get();
  const [tiles, setTiles] = useState([]);
  const joinDkTitle = "Join Denmark";

  function makeTiles() {
    const arr = [];
    dataFromDB.then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        arr.push(
          <Link
            key={doc.data().title}
            to={{
              pathname: convertToPath(doc.data().title),
              state: { title: doc.data().title, picture: doc.data().picture }
            }}
          >
            <Tile
              state={{ title: doc.data().title, picture: doc.data().picture }}
            />
          </Link>
        );
      });
      setTiles(arr);
    });
  }

  useEffect(() => {
    makeTiles();
  }, []);

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
      {tiles}
    </div>
  );
}
