import React, { useState } from "react";
import "./DropTile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

export function DropTile(props) {
  const [showSubHeading, setSubHeading] = useState(false);
  const [isReadMoreClicked, setIsReadMoreClicked] = useState(false);
  let readMore;
  const headline = props.state.headline;

  if (!isReadMoreClicked) {
    readMore = (
      <div className="inlinediv">
        <span onClick={() => setIsReadMoreClicked(!isReadMoreClicked)}>
          <span className="readMore">read more</span>
        </span>
      </div>
    );
  } else {
    readMore = <div>{formatText(props.state.body)}</div>;
  }

  function formatText(documents) {
    const arr = documents.split("#");
    return arr.map((doc) => {
      return <p key={doc}>{doc}</p>;
    });
  }

  function onTileClick() {
    if (isReadMoreClicked === true) {
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
          <h4 key={headline}>
            <i>by {props.state.author}</i>
          </h4>
          {props.state.subheading} {readMore}
        </div>
      )}
    </div>
  );
}
