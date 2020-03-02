import React from "react";
import "./Page.css";
import { NavBar } from "../components/navbar/NavBar";
import { HomeButton } from "../components/homebutton/HomeButton";

export function Page(props) {
  // const [title, setTitle] = props.location.title;
  //
  return (
    <div>
      <NavBar state={{ title: props.location.state.title }}></NavBar>
      <h1>Text</h1>
      <HomeButton/>
    </div>
  );
}
