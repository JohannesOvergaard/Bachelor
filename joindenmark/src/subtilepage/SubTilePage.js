import React, { useState, useEffect } from "react";
import "./SubTilePage.css";
import { NavBar } from "../components/navbar/NavBar";
import { HomeButton } from "../components/homebutton/HomeButton";
import { Tile } from "../components/tile/Tile";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { convertToPath } from "../Util/Helpers";
import { getContentSnapShot } from "../services/ContentService";
import { generateTiles } from "../Util/Helpers";

export function SubTilePage(props) {
  const [title] = useState(props.location.state.title);
  const [tileTitles, setTileTitles] = useState({});

  useEffect(() => {
    getContentSnapShot(title.toLowerCase()).then(setTileTitles);
  }, []);

  return (
    <div>
      <NavBar state={{ title: title }}></NavBar>
      <HomeButton />
      <div>{generateTiles(tileTitles, title)}</div>
    </div>
  );
}
