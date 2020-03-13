import React, { useState, useEffect } from "react";
import { Tile } from "../components/tile/Tile";
import "./HomePage.css";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { convertToPath, trim } from "../Util/Helpers";
import { db } from "../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faSearch } from "@fortawesome/free-solid-svg-icons";
import { JoinDkTile } from "../components/joindktile/JoinDkTile";
import { Search} from "../components/search/Search";

export function HomePage() {
  const dataFromDB = db.collection("tile").get();
  const [tiles, setTiles] = useState([]);
  const joinDkTitle = "Join Denmark";
  const [showSearch, setShowSearch] = useState(false);

  function makeTiles() {
    const arr = [];
    dataFromDB.then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        arr.push(
          <Link
            key={doc.id}
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

  function generateNavbar(){
    if(!showSearch){
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
          <Search setShowSearch={setShowSearch}/>
        </div>
      );
    }
  }

  useEffect(() => {
    makeTiles();
  }, []);

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
      {tiles}
    </div>
  );
}
