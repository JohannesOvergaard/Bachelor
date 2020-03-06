import React, { useState, useEffect } from "react";
import "./Page.css";
import { db } from "../firebase";
import { NavBar } from "../components/navbar/NavBar";
import { HomeButton } from "../components/homebutton/HomeButton";

export function Page(props) {
  const [title, setTitle] = useState(props.location.state.title);
  const [headline, setHeadline] = useState('');
  const dataFromDB = db.collection(title.toLowerCase()).get();

  function getContentFromDB() {
    dataFromDB.then(function(querySnapshot) {
      querySnapshot.forEach(function(doc){
        setHeadline(doc.data().headline)
      });
    });
  }

  useEffect(() => {
    getContentFromDB();
  }, []);

  return (
    <div>
      <NavBar state={{ title: title }}></NavBar>
      <img className="pagePicture" src={props.location.state.picture}/>
      <p>{headline}</p>
      <HomeButton/>
    </div>
  );
}
