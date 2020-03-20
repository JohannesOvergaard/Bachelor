import React, { useState, useEffect } from "react";
import "./HomePage.css";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { convertToPath, trim } from "../Util/Helpers";
import { JoinDkTile } from "../components/joindktile/JoinDkTile";
import { getContentSnapShotFilterBySettings } from "../services/ContentService";
import { TilesContainer } from "../components/tilesContainer/TilesContainer";
import { NavbarContainer } from "../components/navbarcontainer/NavBarContainer";

export function HomePage() {
  const [tiles, setTiles] = useState({});

  useEffect(() => {
    getContentSnapShotFilterBySettings("tile").then(setTiles);
  }, []);

  return (
    <div>
      <NavbarContainer />
      <br />

      <TilesContainer
        tiles={tiles}
        disabled={[]}
        pathPrefix=""
      ></TilesContainer>
    </div>
  );
}
