import React, { useState } from "react";
import "./StepTile.css";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { CheckBox } from "./CheckBox";

export function StepTile(props) {
  const [stepId] = useState(props.state.id);
  const [showSteps, setShowSteps] = useState(false);
  const [showFullArticle, setShowFullArticle] = useState(false);
  const [isReadMoreClicked, setIsReadMoreClicked] = useState(false);
  const loggedIn = useSelector((state) => state.userState.loggedIn);

  let readMore;
  const headline = props.state.headline;

  function generateList(documents) {
    const arr = documents.split(",");
    return arr.map((doc) => {
      return <li key={doc}> {doc} </li>;
    });
  }
  if (!isReadMoreClicked) {
    readMore = (
      <div className="inlinediv">
        <span
          onClick={
            (() => setShowFullArticle(!showFullArticle),
            () => setIsReadMoreClicked(!isReadMoreClicked))
          }
        >
          List of documents needed:
        </span>
        {showFullArticle && <div>{props.state.body}</div>}
      </div>
    );
  } else {
    readMore = (
      <div>
        {props.state.body} <ul>{generateList(props.state.documents)}</ul>
      </div>
    );
  }

  function formatStepWithLink(str) {
    const matches = str.match(/\bhttps?:\/\/\S+/gi);
    if (matches != null) {
      const text = str.replace(/(?:https?|ftp):\/\/[\n\S]+/g, "");
      return (
        <li key={str}>
          {text}{" "}
          <a href={matches[0]} target="_blank">
            {matches[0]}
          </a>
        </li>
      );
    } else {
      return <li key={str}> {str} </li>;
    }
  }
  function generateSteps() {
    const arr = props.state.steps.split(",");
    return arr.map((doc) => {
      return formatStepWithLink(doc);
    });
  }

  function onTileClick() {
    if (isReadMoreClicked === true) {
      setIsReadMoreClicked(!isReadMoreClicked);
    }
    setShowSteps(!showSteps);
  }

  return (
    <div className="stepTile">
        {loggedIn && (
          <div>
            <CheckBox state={{ id: stepId }} />
          </div>
        )}

        <h3 className="stepTileHeadline" onClick={() => onTileClick()}>
          {headline}
        </h3>
        <div className="stepTileIcon" onClick={() => onTileClick()}>
          {showSteps ? (
            <FontAwesomeIcon icon={faChevronUp} />
          ) : (
            <FontAwesomeIcon icon={faChevronDown} />
          )}
        </div>
        {showSteps && (
          <div className="stepTileBody">
            <h4 key={headline}></h4>
            <ol>{generateSteps()}</ol>
            {readMore}
          </div>
        )}
    </div>
  );
}