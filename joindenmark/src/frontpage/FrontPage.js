import React, { useState, useEffect } from "react";
import { Tile } from "../components/tile/Tile";
import { BrowserRouter as Router, Link } from "react-router-dom";

export function FrontPage() {
  return (
    <div>
      <h1>Welcome to Join Denmark</h1>
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
