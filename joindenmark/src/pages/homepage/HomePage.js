import React, { useState, useEffect } from "react";
import "./HomePage.css";
import { getContentFilterBySettings } from "../../services/ContentService";
import { TilesContainer } from "../../components/tilesContainer/TilesContainer";
import { NavbarContainer } from "../../components/navbarcontainer/NavBarContainer";
import { useSelector } from "react-redux";

export function HomePage() {
  const [tiles, setTiles] = useState({});
  const settings = useSelector(state => {
    return state.userState.settings;
  });

  const processTiles = async () => {
    const tiles = await getContentFilterBySettings("tile", settings);
    setTiles(tiles);
  };

  useEffect(() => {
    processTiles();
  }, [settings]);

  return (
    <div>
      <NavbarContainer />
      <br />
      <TilesContainer tiles={tiles} pathPrefix=""></TilesContainer>
    </div>
  );
}
