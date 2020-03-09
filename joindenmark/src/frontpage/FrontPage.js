import React, { useState, useEffect } from "react";
import { Tile } from "../components/tile/Tile";
import "./FrontPage.css";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { convertToPath} from "../Util/Helpers";
import { db } from "../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faSearch } from "@fortawesome/free-solid-svg-icons";

export function FrontPage() {
  const dataFromDB = db.collection("tile").get();
  const [tiles, setTiles] = useState([]);

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
      <div className="settings" >
        <FontAwesomeIcon icon={faCog} />
      </div>
      <div className="search">
        <FontAwesomeIcon icon={faSearch} />
      </div>
      <br/>
      <h1>Join Denmark - step by step</h1>
      {tiles}
    </div>
  );
}
