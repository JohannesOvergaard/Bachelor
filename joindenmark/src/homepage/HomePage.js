import React, { useState, useEffect } from "react";
import "./HomePage.css";
import { getContentFilterBySettings } from "../services/ContentService";
import { TilesContainer } from "../components/tilesContainer/TilesContainer";
import { NavbarContainer } from "../components/navbarcontainer/NavBarContainer";
import { useSelector } from "react-redux";

export function HomePage() {
  const [tiles, setTiles] = useState({});
  const currentUser = useSelector(state => state.user);

  useEffect(() => {
    getContentFilterBySettings("tile").then(
      setTiles,
      currentUser === undefined ? [] : currentUser.settings.settings
    );
  }, []);

  return (
    <div>
      <NavbarContainer />
      <br />
      <TilesContainer tiles={tiles} pathPrefix=""></TilesContainer>
    </div>
  );
}
