import React from "react";
import "./Page.css";

export function Page(props) {
  // const [title, setTitle] = props.location.title;
  //
  return (
    <div>
      <h1>{props.location.state.title}</h1>
    </div>
  );
}
