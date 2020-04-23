import React from "react";
import { Link } from "react-router-dom";
import { Tile } from "../tile/Tile";
import { trim, convertToPath } from "../../Util/Helpers";
import { JoinDkTile } from "../joindktile/JoinDkTile";

export const TilesContainer = ({ tiles, pathPrefix }) => {
  var retTiles = [];
  if (tiles.length > 0) {
    tiles.map((tile) => {
      const data = tile.data();
      if (data.title === "Join Denmark") {
        const tempRetTiles = retTiles;
        retTiles = [
          <Link
            key={trim(data.title)}
            to={{
              pathname: convertToPath(data.title),
              state: { title: data.title },
            }}
          >
            <JoinDkTile state={{ title: data.title }} />
          </Link>,
        ];
        retTiles.push([tempRetTiles]);
      } else {
        retTiles.push(
          <Link
            key={tile.id}
            to={{
              pathname: convertToPath(data.title, pathPrefix),
              state: { title: data.title, picture: data.picture },
            }}
          >
            <Tile state={{ title: data.title, picture: data.picture }} />
          </Link>
        );
      }
    });
  }
  return retTiles;
};
