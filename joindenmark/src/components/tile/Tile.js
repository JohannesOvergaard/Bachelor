import React, { useState, useEffect } from "react";
import "./Tile.css";

export function Tile(props) {
  return (
    <div className="tile">
      <div className="innertile">
        <h2>{props.state.title}</h2>
      </div>
    </div>
  );
}
