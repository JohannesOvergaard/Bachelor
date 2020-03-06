import React from "react";
import "./Page.css";
import { NavBar } from "../components/navbar/NavBar";
import { HomeButton } from "../components/homebutton/HomeButton";

export function Page(props) {

  return (
    <div>
      <NavBar state={{ title: props.location.state.title }}></NavBar>
      <img className="pagePicture" src={props.location.state.picture}/>
      <HomeButton/>
    </div>
  );
}
