import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { Tile } from "../tile/Tile";
import { trim, convertToPath } from "../../Util/Helpers";

export const TilesContainer = ({ tiles, disabled, pathPrefix }) => {
  if (tiles.length > 0) {
    return tiles.map(tile => {
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
    });
  }
  return <></>;
};
