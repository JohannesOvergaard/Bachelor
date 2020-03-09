import React, { useState, useEffect } from "react";
import { NavBar } from "../components/navbar/NavBar";
import { HomeButton } from "../components/homebutton/HomeButton";
import { DropTile } from "../components/droptile/DropTile";
import { getContent } from "../services/ContentService";

export function JoinDenmarkPage(props) {
  const [title, setTitle] = useState(props.location.state.title);

  return (
    <div>
      <NavBar state={{ title: title }}></NavBar>
      <HomeButton />
    </div>
  );
}
