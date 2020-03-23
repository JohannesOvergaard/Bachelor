import React, { useState, useEffect } from "react";
import "./HomePage.css";
import { getContentFilterBySettings } from "../services/ContentService";
import { TilesContainer } from "../components/tilesContainer/TilesContainer";
import { NavbarContainer } from "../components/navbarcontainer/NavBarContainer";
import { login } from "../firebase";

export function HomePage() {
  const [tiles, setTiles] = useState({});

  useEffect(() => {
    getContentFilterBySettings("tile").then(setTiles);
  }, []);
  

  return (
    <div>
      <NavbarContainer />
      <br />
      <TilesContainer tiles={tiles} pathPrefix=""></TilesContainer>
      <button onClick={() => login()}>Hallo</button>
    </div>
  );
}
