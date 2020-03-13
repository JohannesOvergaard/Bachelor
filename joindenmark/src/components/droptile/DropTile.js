import React, { useState } from "react";
import "./DropTile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp} from "@fortawesome/free-solid-svg-icons";

export function DropTile(props) {
  const [showSubHeading, setSubHeading] = useState(false);
  const [showFullArticle, setShowFullArticle] = useState(false);
  const [isReadMoreClicked, setIsReadMoreClicked] = useState(false);
  let readMore;
  const headline = props.state.headline;

  if (!isReadMoreClicked) {
    readMore = (
      <div className="inlinediv">
        <span
          onClick={
            (() => setShowFullArticle(!showFullArticle),
            () => setIsReadMoreClicked(!isReadMoreClicked))
          }
        >
          Read more
        </span>
        {showFullArticle && <div>{props.state.body}</div>}
      </div>
    );
  } else {
    readMore = <div>{props.state.body}</div>;
  }

  function onTileClick() {
    if (isReadMoreClicked === true) {
      setIsReadMoreClicked(!isReadMoreClicked);
    }
    setSubHeading(!showSubHeading);
  }

  return (
      <div className="dropTile">
        <h3 className="dropTileHeadline" onClick={() => onTileClick()}>{headline}</h3>
        <div className="dropTileIcon" onClick={() => onTileClick()}>
          {showSubHeading && <FontAwesomeIcon icon={faChevronUp}/>}
          {!showSubHeading && <FontAwesomeIcon icon={faChevronDown}/>}
        </div>
        {showSubHeading && (
          <div className="dropTileBody">
            <h4 key={headline}>
              <i>by {props.state.author}</i>
            </h4>
            {props.state.subheading} {readMore}
          </div>
        )}
      <hr/>
      </div>
  );
}
