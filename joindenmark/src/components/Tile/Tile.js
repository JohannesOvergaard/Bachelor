import React, { useState, useEffect } from "react";
import "./Tile.css";

export function Tile(props) {
  const [title, setTitle] = useState(props.state.title);

  return (
    <div className="tile">
      <div className="innertile">
        <h2>{title}</h2>
      </div>
    </div>
  );
}
