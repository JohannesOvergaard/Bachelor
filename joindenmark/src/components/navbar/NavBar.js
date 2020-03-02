import React, { useState, useEffect } from "react";
import "./NavBar.css";

export function NavBar(props) {
  return (
    <div className="navbar">
      <p className="back">Go Back</p>
      <p className="title">{props.state.title}</p>
      <p className="search">Search</p>
    </div>
  );
}
