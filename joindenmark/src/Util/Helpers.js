import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { Tile } from "../components/tile/Tile";

export function convertToPath(title, prefix) {
  return prefix ? trim(prefix) + "/" + trim(title) : "/" + trim(title);
}

export function trim(title) {
  return title.replace(/ /g, "").toLowerCase();
}

export function generateTiles(tiles, pathPrefix) {
  return (
    tiles.docs &&
    tiles.docs.length > 0 &&
    tiles.docs.map(tile => {
      const data = tile.data();
      return (
        <Link
          key={tile.id}
          to={{
            pathname: convertToPath(data.title, pathPrefix),
            state: { title: data.title, picture: data.picture }
          }}
        >
          <Tile state={{ title: data.title, picture: data.picture }} />
        </Link>
      );
    })
  );
}
