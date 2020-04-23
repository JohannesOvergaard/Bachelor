import React, { useState, useEffect } from "react";
import "./SubTilePage.css";
import { NavBar } from "../../components/navbar/NavBar";
import { HomeButton } from "../../components/homebutton/HomeButton";
import { getContentFilterBySettings } from "../../services/ContentService";
import { TilesContainer } from "../../components/tilesContainer/TilesContainer";
import { useSelector } from "react-redux";

export function SubTilePage(props) {
  const [title] = useState(props.location.state.title);
  const [tileTitles, setTileTitles] = useState({});
  const settings = useSelector((state) => state.userState.settings);

  useEffect(() => {
    processTiles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const processTiles = async () => {
    const tiles = await getContentFilterBySettings(
      title.toLowerCase(),
      settings
    );
    setTileTitles(tiles);
  };

  return (
    <div>
      <HomeButton />
      <NavBar state={{ title: title }}></NavBar>
      <TilesContainer state={{ tiles: tileTitles, pathPrefix: title }} />
    </div>
  );
}
