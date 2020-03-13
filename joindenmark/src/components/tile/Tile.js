import React from "react";
import "./Tile.css";

export function Tile(props) {
  return (
    <div className="tileBoarder">
      <div className="tilePictureBackground">
        <img className="tilePicture" src={props.state.picture} alt="" />
        <p className="tileText">{props.state.title}</p>
      </div>
    </div>
  );
}
