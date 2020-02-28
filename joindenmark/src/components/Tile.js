import React, { useState, useEffect } from "react";

export function Tile(props) {
  const [title, setTitle] = useState(props.state.title);

  return (
    <div>
      <h2>{title}</h2>
    </div>
  );
}
