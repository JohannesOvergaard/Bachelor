import React, { useState } from "react";
import "./DropTile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

export function DropTile(props) {
  const [showSubHeading, setSubHeading] = useState(false);
  const [isReadMoreClicked, setIsReadMoreClicked] = useState(false);
  const headline = props.state.headline;

  function formatText(documents) {
    const arr = documents.split("#");
    return arr.map((doc) => {
      return <p key={doc}>{doc}</p>;
    });
  }

  function onTileClick() {
    if (isReadMoreClicked) {
      setIsReadMoreClicked(!isReadMoreClicked);
    }
    setSubHeading(!showSubHeading);
  }

  return (
    <div className="dropTile">
      <h3 className="dropTileHeadline" onClick={() => onTileClick()}>
        {headline}
      </h3>
      <div className="dropTileIcon" onClick={() => onTileClick()}>
        {showSubHeading ? (
          <FontAwesomeIcon icon={faChevronUp} />
        ) : (
          <FontAwesomeIcon icon={faChevronDown} />
        )}
      </div>
      {showSubHeading && (
        <div className="dropTileBody">
          <h4>
            <i>by {props.state.author}</i>
          </h4>
          {props.state.subheading}
          {!isReadMoreClicked ? (
            <div className="inlinediv">
              <span onClick={() => setIsReadMoreClicked(!isReadMoreClicked)}>
                <span className="readMore">read more</span>
              </span>
            </div>
          ) : (
            <div>{formatText(props.state.body)}</div>
          )}
        </div>
      )}
    </div>
  );
}
