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
  const [isDocumentsClicked, setIsDocumentsClicked] = useState(false);
  const loggedIn = useSelector((state) => state.userState.loggedIn);

  let documents;
  const headline = props.state.headline;

  function generateList(documents) {
    const arr = documents.split(",");
    return arr.map((doc) => {
      return <li key={doc}> {doc} </li>;
    });
  }
  if (!isDocumentsClicked) {
    documents = (
      <div className="inlinediv">
        <span
          onClick={
            (() => setShowFullArticle(!showFullArticle),
            () => setIsDocumentsClicked(!isDocumentsClicked))
          }
        >
          <p className="documents">Click here to see documents needed ></p>
        </span>
        {showFullArticle && <div>{props.state.body}</div>}
      </div>
    );
  } else {
    documents = (
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
    if (isDocumentsClicked === true) {
      setIsDocumentsClicked(!isDocumentsClicked);
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
          {documents}
        </div>
      )}
    </div>
  );
}
