import React, { useState } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { Tile } from "../components/tile/Tile";
import { getContent } from "../services/ContentService";

export function convertToPath(title, prefix) {
  return prefix ? trim(prefix) + "/" + trim(title) : "/" + trim(title);
}

export function trim(title) {
  return title.replace(/ /g, "").toLowerCase();
}

export function generateTiles(tiles, pathPrefix) {
  const disabled = mapSettings();
  //console.log(typeof disabled[0]);
  console.log("disabled was set to:", disabled);
  return (
    tiles.docs &&
    tiles.docs.length > 0 &&
    tiles.docs.map(tile => {
      const data = tile.data();
      if (!disabled.includes(trim(data.title))) {
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
    })
  );
}

function mapSettings() {
  const arr = [];
  getContent("settings").then(function(query) {
    query.forEach(function(doc) {
      const data = doc.data();
      console.log("data.related is: ", data.related);
      if (!data.enabled) {
        // const rel = data.related.split(",");
        // rel.forEach(str => {
        //   console.log("what type is str: ", str, typeof str);
        arr.push(trim(data.related));
        console.log(data.related);
        // });
      }
    });
  });
  console.log("arr is: ", arr);
  return arr;
}
