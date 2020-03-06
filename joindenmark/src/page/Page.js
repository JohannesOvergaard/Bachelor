import React, { useState, useEffect } from "react";
import "./Page.css";
import { db } from "../firebase";
import { NavBar } from "../components/navbar/NavBar";
import { HomeButton } from "../components/homebutton/HomeButton";
import { DropTile } from "../components/droptile/DropTile";

export function Page(props) {
  const [title, setTitle] = useState(props.location.state.title);
  const [articles, setArticles] = useState([]);
  const dataFromDB = db.collection(title.toLowerCase()).get();

  function getContentFromDB() {
    const content = [];
    dataFromDB.then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        let data = doc.data();
        content.push(
          <DropTile
            key={data.headline}
            state={{
              headline: data.headline,
              author: data.author,
              subheading: data.subheading,
              body: data.body
            }}
          />
        );
      });
      setArticles(content);
    });
  }

  useEffect(() => {
    getContentFromDB();
  }, []);

  return (
    <div>
      <NavBar state={{ title: title }}></NavBar>
      <HomeButton/>
      <img className="pagePicture" src={props.location.state.picture} />
      {articles}
    </div>
  );
}
