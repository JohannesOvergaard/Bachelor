import React from "react";
import { Tile } from "../components/tile/Tile";
import { BrowserRouter as Router, Link } from "react-router-dom";
import {db} from "../firebase"

export function FrontPage() {
  var citiesRef = db.collection("cities");

  const docRef = db.collection("title").doc("xgaIk6n7lse4fDSTOlB9")

  docRef.get().then(function(doc) {
    if (doc.exists) {
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
    </div>
  );
}
