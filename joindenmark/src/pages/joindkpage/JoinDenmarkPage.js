import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import "./JoinDenmarkPage.css";
import { NavBar } from "../../components/navbar/NavBar";
import { HomeButton } from "../../components/homebutton/HomeButton";
import { StepTile } from "../../components/steptile/StepTile";
import { getContent } from "../../services/ContentService";
import { useSelector } from "react-redux";

export function JoinDenmarkPage(props) {
  const [title] = useState(props.location.state.title);
  const [articles, setArticles] = useState({});
  const loggedIn = useSelector((state) => state.userState.loggedIn);

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
          <div key={article.id}>
            <StepTile
              state={{
                headline: formatHeadline(article.id, data.headline),
                subheading: data.subheading,
                documents: data.documents,
                steps: data.steps,
                id: article.id,
              }}
            />
            <hr />
          </div>
        );
      })
    );
  }

  return (
    <div className="joinDenmarkContainer">
      <NavBar state={{ title: title }}></NavBar>
      <HomeButton />
      <p className="information">
        This is a guide through some of the pracitcal aspects you need to solve
        when coming to Denmark.
      </p>
      {!loggedIn ? (
        <div className="information">
          {" "}
          If you log in you can track your progress by ticking off the steps you
          have completed.
          <Link
            to={{
              pathname: "/login",
            }}
          >
            <button className="redirectButton">Go to login</button>
          </Link>
        </div>
      ) : (
        <div className="information">
          You can tick off the steps as you have completed them. Your progress
          will be saved.
        </div>
      )}

      <div className=".stepTiles">{generateStepTiles()}</div>
    </div>
  );
}
