import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { Tile } from "../tile/Tile";
import { trim, convertToPath } from "../../Util/Helpers";
import { JoinDkTile } from "../joindktile/JoinDkTile";

export const TilesContainer = ({ tiles, pathPrefix }) => {
  if (tiles.length > 0) {
    return tiles.map(tile => {
      const data = tile.data();
      if (data.title === "Join Denmark") {
        return (
          <Link
            key={trim(data.title)}
            to={{
              pathname: convertToPath(data.title),
              state: { title: data.title }
            }}
          >
            <JoinDkTile state={{ title: data.title }} />
          </Link>
        );
      } else {
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
      }
    });
  }
  return <></>;
};
