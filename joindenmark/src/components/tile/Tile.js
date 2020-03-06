import React from "react";
import "./Tile.css";

export function Tile(props) {
  return (
    <div className="tileBoarder">
      <img className="tilePicture" src={props.state.picture} />
      <h2>{props.state.title}</h2>
    </div>
  );
}
