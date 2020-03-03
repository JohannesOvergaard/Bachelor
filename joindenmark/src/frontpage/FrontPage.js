import React, { useState } from "react";
import { Tile } from "../components/tile/Tile";
import { BrowserRouter as Router, Link } from "react-router-dom";
import {db} from "../firebase"

const dataFromDB = db.collection("tile").get();

function makeTiles(){
  dataFromDB.then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
      //console.log(doc.id, " => ", doc.data());
      return(
      <Link
        to={{
          pathname: "/publicsector",
          state: { title: "doc.data.title()", picture: "/images/publicSector.jpg" }
        }}
      >
        <Tile
          state={{
            title: "Public Sector",
            picture: "/images/publicSector.jpg"
          }}
        />
      </Link>
      );
    }).catch(function(error) {
      console.log("Error getting document:", error);
    });
    })
  }


export function FrontPage() {
  return (
    <div>
      <h1>Join Denmark - step by step</h1>
      
    
      {/* <Link
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
      </Link> */}
    </div>
  );
}
