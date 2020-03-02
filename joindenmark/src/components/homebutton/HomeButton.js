import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import "./HomeButton.css"

export function HomeButton(){
    return (
        <Link to="/">
            <button className="homebutton">Home</button>
        </Link>
    );
}