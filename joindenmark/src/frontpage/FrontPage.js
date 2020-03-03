import React, { useState } from "react";
import { Tile } from "../components/tile/Tile";
import { BrowserRouter as Router, Link } from "react-router-dom";
import {db} from "../firebase"

const dataFromDB = db.collection("tile").get();
const tiles = [];

function convertToPath(title){
  return "/" + title.replace(/ /g,'').toLowerCase()
}

function makeTiles(){
  dataFromDB.then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
      console.log(doc.id, " => ", doc.data());
      tiles.push(
        <Link
          to={{
            pathname: convertToPath(doc.data().title),
            state: { title: doc.data().title, picture: doc.data().picture }
          }}
        >
          <Tile
            state={{ title: doc.data().title, picture: doc.data().picture }}
          />
      </Link>
        );
    });
  });
  console.log(tiles);
  return tiles;
}

export function FrontPage() {
  return (    
    <div>
    
      {makeTiles()}
    
      <h1>Join Denmark - step by step</h1>
      
      <Link
        to={{
          pathname: "/culture",
          state: { title: "Culture", picture: "/images/culture.jpg" }
        }}
      >
        <Tile state={{ title: "Culture", picture: "/images/culture.jpg" }} />
      </Link>
    </div>
  );
}
