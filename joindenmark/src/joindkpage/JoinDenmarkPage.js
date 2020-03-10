import React, { useState, useEffect } from "react";
import "./JoinDenmarkPage.css";
import { NavBar } from "../components/navbar/NavBar";
import { HomeButton } from "../components/homebutton/HomeButton";
import { DropTile } from "../components/droptile/DropTile";
import { getContent } from "../services/ContentService";

export function JoinDenmarkPage(props) {
  const [title, setTitle] = useState(props.location.state.title);
  const [articles, setArticles] = useState({});

  useEffect(() => {
    getContent(title.toLowerCase()).then(setArticles);
  }, []);

  function formatHeadline(step, headline) {
    console.log(step);
    switch (step) {
      case "step1":
        return "Step 1 - " + headline;
        break;
      case "step2":
        return "Step 2 - " + headline;
        break;
      default:
        return "Step x - " + headline;
    }
  }
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
              headline: formatHeadline(article.id, data.headline),
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
      <div className=".stepTiles">{generateDropTiles()}</div>
    </div>
  );
}
