import React, { useState } from "react";
import "./DropTile.css";

export function DropTile(props) {
  const [showText, setShowText] = useState(false);
  const [showFullArticle, setShowFullArticle] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  let readMore;
  const headline = props.state.headline;

  if (!isClicked) {
    readMore = (
      <div className="inlinediv">
        <span
          onClick={
            (() => setShowFullArticle(!showFullArticle),
            () => setIsClicked(!isClicked))
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

  return (
    <div>
      <h1 onClick={() => setShowText(!showText)}>{headline}</h1>
      {showText && (
        <div>
          <h4 key={headline}>
            <i>by {props.state.author}</i>
          </h4>
          {props.state.subheading} {readMore}
        </div>
      )}
    </div>
  );
}
