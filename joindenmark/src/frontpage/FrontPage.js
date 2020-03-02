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
        to={{ pathname: "/publicsector", state: { title: "Public Sector" } }}
      >
        <Tile state={{ title: "Public Sector" }} />
      </Link>
      <Link
        to={{ pathname: "/accommodation", state: { title: "Accommodation" } }}
      >
        <Tile state={{ title: "Accommodation" }} />
      </Link>
      <Link to={{ pathname: "/jobmarket", state: { title: "Job Market" } }}>
        <Tile state={{ title: "Job Market" }} />
      </Link>
      <Link to={{ pathname: "/culture", state: { title: "Culture" } }}>
        <Tile state={{ title: "Culture" }} />
      </Link>
    </div>
  );
}
