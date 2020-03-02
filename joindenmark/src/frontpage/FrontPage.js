import React, { useState, useEffect } from "react";
import { Tile } from "../components/tile/Tile";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { NavBar } from "../components/navbar/NavBar";

export function FrontPage() {
  return (
    <div>
      <NavBar state={{ title: ""}}/>
      <h1>Join Denmark - step by step</h1>
      <Link
        to={{
          pathname: "/page",
          state: {
            title: "Public Sector"
          }
        }}
      >
        <Tile state={{ title: "Public Sector" }} />
      </Link>
      <Tile state={{ title: "Accommodation" }} />
      <Tile state={{ title: "Job Market" }} />
      <Tile state={{ title: "Culture" }} />
    </div>
  );
}
