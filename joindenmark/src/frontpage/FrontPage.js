import React, { useState } from "react";
import { Tile } from "../components/tile/Tile";
import { BrowserRouter as Router, Link } from "react-router-dom";
import {db} from "../firebase"

export function FrontPage() {
  const [dataFromDB, setDataFromDB] = useState("test");
  
  const docRef = db.collection("tile").doc("tile1");

  docRef.get().then(function(doc) {
    if (doc.exists) {
        setDataFromDB(doc.data().title);
        console.log("Document data:", doc.data());
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
  }).catch(function(error) {
    console.log("Error getting document:", error);
  });

  return (
    <div>
      <h1>Join Denmark - step by step</h1>
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
      <h1>{dataFromDB}</h1>
    </div>
  );
}
