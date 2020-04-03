import React, { useState, useEffect } from "react";
import "./CategoryPage.css";
import { NavBar } from "../../components/navbar/NavBar";
import { HomeButton } from "../../components/homebutton/HomeButton";
import { DropTile } from "../../components/droptile/DropTile";
import { getContentSnapShot } from "../../services/ContentService";

export function CategoryPage(props) {
  const [title] = useState(props.location.state.title);
  const [articles, setArticles] = useState({});

  useEffect(() => {
    getContentSnapShot(title.toLowerCase()).then(setArticles);
  }, []);

  function generateDropTiles() {
    return (
      articles.docs &&
      articles.docs.length > 0 &&
      articles.docs.map(article => {
        const data = article.data();
        return (
          <DropTile
            key={article.id}
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
      <img className="pagePicture" src={props.location.state.picture} alt="" />
      {generateDropTiles()}
    </div>
  );
}
