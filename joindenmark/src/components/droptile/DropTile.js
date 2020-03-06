import React, { useState } from "react";

export function DropTile(props) {
  const [showText, setShowText] = useState(false);
  return (
    <div>
      <h1 onClick={() => setShowText(!showText)}>{props.state.headline}</h1>
      {showText && <div>{props.state.subheading}</div>}
    </div>
  );
}
