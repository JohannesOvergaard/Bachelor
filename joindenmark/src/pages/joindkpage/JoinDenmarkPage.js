import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./JoinDenmarkPage.css";
import { NavBar } from "../../components/navbar/NavBar";
import { HomeButton } from "../../components/homebutton/HomeButton";
import { StepTile } from "../../components/steptile/StepTile";
import { getContent, updateJoinDkChecks } from "../../services/ContentService";

export function JoinDenmarkPage(props) {
  const [title] = useState(props.location.state.title);
  const [articles, setArticles] = useState({});
  const currentUser = useSelector((state) => state.userState.user);

  useEffect(() => {
    getContent(title.toLowerCase()).then(setArticles);
  }, []);

  function formatHeadline(step, headline) {
    return `Step  ${step.replace(/\D/g, "")} - ${headline}`;
  }
  function generateStepTiles() {
    return (
      articles.docs &&
      articles.docs.length > 0 &&
      articles.docs.map((article) => {
        const data = article.data();
        return (
          <StepTile
            key={article.id}
            state={{
              headline: formatHeadline(article.id, data.headline),
              subheading: data.subheading,
              documents: data.documents,
              steps: data.steps,
              id: article.id,
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
      <div className=".stepTiles">{generateStepTiles()}</div>
      <button
        onClick={() => updateJoinDkChecks("users", currentUser.name, ["step1"])}
      >
        Click here to add something
      </button>
    </div>
  );
}
