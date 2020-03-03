import React, { useState } from "react";
import { Tile } from "../components/tile/Tile";
import { BrowserRouter as Router, Link } from "react-router-dom";
import {db} from "../firebase"

const dataFromDB = db.collection("tile").get();
const tiles = [];

function makeTiles(){
  dataFromDB.then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
      console.log(doc.id, " => ", doc.data());
      tiles.push(
        <Link
          to={{
            pathname: "/jobmarket",
            state: { title: "Job Market", picture: "/images/jobMarket.jpg" }
          }}
        >
          <Tile
            state={{ title: "Job Market", picture: "/images/jobMarket.jpg" }}
          />
      </Link>
        );
    });
  });
  console.log(tiles);
  return tiles[0];
}

export function FrontPage() {
  return (    
    <div>
      <h1>Join Denmark - step by step</h1>
      {makeTiles()}
    
      <Link
        to={{
          pathname: "/publicsector",
          state: { title: "Public Sector", picture: "/images/publicSector.jpg" }
        }}
      >
        <Tile
          state={{
            title: "Public Sector",
            picture: "/images/publicSector.jpg"
          }}
        />
      </Link>
      <Link
        to={{
          pathname: "/accommodation",
          state: {
            title: "Accommodation",
            picture: "/images/accommodation.jpg"
          }
        }}
      >
        <Tile
          state={{
            title: "Accommodation",
            picture: "/images/accommodation.jpg"
          }}
        />
      </Link>
      <Link
        to={{
          pathname: "/jobmarket",
          state: { title: "Job Market", picture: "/images/jobMarket.jpg" }
        }}
      >
        <Tile
          state={{ title: "Job Market", picture: "/images/jobMarket.jpg" }}
        />
      </Link>
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
