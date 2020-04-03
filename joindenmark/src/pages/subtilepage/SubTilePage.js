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
  const settings = useSelector(state => {
    return state.userState.settings;
  });
  const processTiles = async () => {
    const tiles = await getContentFilterBySettings(
      title.toLowerCase(),
      settings
    );
    setTileTitles(tiles);
  };

  useEffect(() => {
    processTiles();
  }, []);

  return (
    <div>
      <NavBar state={{ title: title }}></NavBar>
      <HomeButton />
      <TilesContainer tiles={tileTitles} pathPrefix={title} />
    </div>
  );
}
