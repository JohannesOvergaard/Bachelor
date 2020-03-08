import React, { useState, useEffect } from "react";
import "./Page.css";
import { NavBar } from "../components/navbar/NavBar";
import { HomeButton } from "../components/homebutton/HomeButton";
import { DropTile } from "../components/droptile/DropTile";
import { getContent } from "../services/ContentService";

export function Page(props) {
  const [title, setTitle] = useState(props.location.state.title);
  const [articles, setArticles] = useState({});

  useEffect(() => {
    getContent(title.toLowerCase()).then(setArticles);
  }, []);

  function generateTiles(articles) {
    return (
      articles.docs &&
      articles.docs.length > 0 &&
      articles.docs.map(article => {
        const data = article.data();
        return (
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
      })
    );
  }
  return (
    <div>
      <NavBar state={{ title: title }}></NavBar>
      <HomeButton />
      <img className="pagePicture" src={props.location.state.picture} />
      {generateTiles(articles)}
    </div>
  );
}
