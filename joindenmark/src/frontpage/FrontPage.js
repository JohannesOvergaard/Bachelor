import React from "react";
import { Tile } from "../components/tile/Tile";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { NavBar } from "../components/navbar/NavBar";

export function FrontPage() {
  return (
    <div>
      <NavBar state={{ title: "" }} />
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
