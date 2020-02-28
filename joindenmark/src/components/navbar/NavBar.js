import React, { useState, useEffect } from "react";
import "./NavBar.css";

export function NavBar(props) {
  return (
    <div className="navbar">
      <p className="settings">Settings</p>
      <h7 className="title">{props.state.title}</h7>
      <p className="search">Search</p>
    </div>
  );
}
