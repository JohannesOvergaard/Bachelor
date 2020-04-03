import React, { useState, useEffect } from "react";
import "./JoinDenmarkPage.css";
import { NavBar } from "../../components/navbar/NavBar";
import { HomeButton } from "../../components/homebutton/HomeButton";
import { StepTile } from "../../components/steptile/StepTile";
import { getContent } from "../../services/ContentService";

export function JoinDenmarkPage(props) {
  const [title] = useState(props.location.state.title);
  const [articles, setArticles] = useState({});

  useEffect(() => {
    getContent(title.toLowerCase()).then(setArticles);
  }, []);

  function formatHeadline(step, headline) {
    return `Step  ${step.replace(/\D/g, "")} - ${headline}`;
  }
  function generateDropTiles() {
    return (
      articles.docs &&
      articles.docs.length > 0 &&
      articles.docs.map(article => {
        const data = article.data();
        return (
          <StepTile
            key={article.id}
            state={{
              headline: formatHeadline(article.id, data.headline),
              subheading: data.subheading,
              documents: data.documents,
              steps: data.steps
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
