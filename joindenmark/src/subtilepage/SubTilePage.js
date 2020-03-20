import React, { useState, useEffect } from "react";
import "./SubTilePage.css";
import { NavBar } from "../components/navbar/NavBar";
import { HomeButton } from "../components/homebutton/HomeButton";
import { getContentSnapShotFilterBySettings } from "../services/ContentService";
import { TilesContainer } from "../components/tilesContainer/TilesContainer";

export function SubTilePage(props) {
  const [title] = useState(props.location.state.title);
  const [tileTitles, setTileTitles] = useState({});

  useEffect(() => {
    getContentSnapShotFilterBySettings(title.toLowerCase()).then(setTileTitles);
  }, []);

  return (
    <div>
      <NavBar state={{ title: title }}></NavBar>
      <HomeButton />
      <TilesContainer tiles={tileTitles} disabled={[]} pathPrefix={title} />
    </div>
  );
}
