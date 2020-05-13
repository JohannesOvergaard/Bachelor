import React, { useState } from "react";
import "./StepTile.css";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { CheckBox } from "../checkbox/CheckBox";

export function StepTile(props) {
  const [stepId] = useState(props.state.id);
  const [docs] = useState(props.state.documents.split(","));
  const [showSteps, setShowSteps] = useState(false);
  const [isDocumentsClicked, setIsDocumentsClicked] = useState(false);
  const loggedIn = useSelector((state) => state.userState.loggedIn);

  function onTileClick() {
    if (isDocumentsClicked) {
      setIsDocumentsClicked(!isDocumentsClicked);
    }
    setShowSteps(!showSteps);
  }

  function generateSteps() {
    const arr = props.state.steps.split(",");
    return arr.map((doc) => {
      return formatStep(doc);
    });
  }

  function formatStep(str) {
    //Find https links in string using regex
    const matches = str.match(/\bhttps?:\/\/\S+/gi);
    if (matches != null) {
      //Filter link from text
      const text = str.replace(/(?:https?|ftp):\/\/[\n\S]+/g, "");
      return (
        <li key={str}>
          {text} <a href={matches[0]}>{matches[0]}</a>
        </li>
      );
    } else {
      //If there is no link return string as is
      return <li key={str}> {str} </li>;
    }
  }

  function generateListOfDocuments() {
    const arr = props.state.documents.split(",");
    return arr.map((doc) => {
      return <li key={doc}> {doc} </li>;
    });
  }

  return (
    <div className="stepTile">
      {loggedIn && (
        <div>
          <CheckBox state={{ id: stepId }} />
        </div>
      )}
      <h3 className="stepTileHeadline" onClick={() => onTileClick()}>
        {props.state.headline}
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
          <p>{props.state.body}</p>
          <ol>{generateSteps()}</ol>
          {!isDocumentsClicked && docs.length > 3 ? (
            <div className="inlinediv">
              <span onClick={() => setIsDocumentsClicked(!isDocumentsClicked)}>
                <p className="documents">
                  Click here to see documents needed >
                </p>
              </span>
            </div>
          ) : (
            <div>
              <p>Documents needed:</p>
              <ul>{generateListOfDocuments()}</ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
