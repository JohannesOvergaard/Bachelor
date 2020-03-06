import React, { useState, useEffect } from "react";
import "./Page.css";
import { db } from "../firebase";
import { NavBar } from "../components/navbar/NavBar";
import { HomeButton } from "../components/homebutton/HomeButton";

export function Page(props) {
  const [title, setTitle] = useState(props.location.state.title);
  const [headlines, setHeadlines] = useState([]);
  const [articles, setArticles] = useState(new Map());
  const dataFromDB = db.collection(title.toLowerCase()).get();

  function getContentFromDB() {
    const head = [];
    dataFromDB.then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        let data = doc.data();
        head.push(<h1 key={data.headline}>{data.headline}</h1>);
        articles.set(data.headline, {
          subheading: data.subheading,
          body: data.body,
          author: data.author
        });
      });
      setHeadlines(head);
    });
  }

  useEffect(() => {
    getContentFromDB();
  }, []);

  return (
    <div>
      <NavBar state={{ title: title }}></NavBar>
      <img className="pagePicture" src={props.location.state.picture} />
      {headlines}
      <HomeButton />
    </div>
  );
}
