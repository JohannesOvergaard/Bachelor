import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import allActions from "../../actions";
import { updateJoinDkChecks } from "../../services/ContentService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { updateArray } from "../../Util/Helpers";

export function StepTile(props) {
  const [stepId] = useState(props.state.id);
  const [showSteps, setShowSteps] = useState(false);
  const [showFullArticle, setShowFullArticle] = useState(false);
  const [isReadMoreClicked, setIsReadMoreClicked] = useState(false);
  const currentUser = useSelector((state) => state.userState.user);
  const loggedIn = useSelector((state) => state.userState.loggedIn);
  const checkMarks = useSelector((state) => state.userState.checkmarks);
  const [checked, setChecked] = useState(checkMarks.includes(stepId));
  const dispatch = useDispatch();

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
          Read more
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

  function onTileClick() {
    if (isReadMoreClicked === true) {
      setIsReadMoreClicked(!isReadMoreClicked);
    }
    setShowSteps(!showSteps);
  }

  function onCheckBoxChange(checked) {
    console.log(props.state.id);
    const checkmarksArr = updateArray(!checked, checkMarks, stepId);
    updateJoinDkChecks(currentUser.name, checkmarksArr);
    dispatch(allActions.userActions.setCheckmarks({ checkmarks: checkMarks }));
    setChecked(checked);
  }

  return (
    <div className="dropTile">
      {loggedIn && (
        <div>
          {" "}
          <input
            type="checkbox"
            onChange={() => onCheckBoxChange(!checked)}
            checked={checked}
            className="form-check-input"
          />
        </div>
      )}

      <h3 className="dropTileHeadline" onClick={() => onTileClick()}>
        {headline}
      </h3>
      <div className="dropTileIcon" onClick={() => onTileClick()}>
        {showSteps && <FontAwesomeIcon icon={faChevronUp} />}
        {!showSteps && <FontAwesomeIcon icon={faChevronDown} />}
      </div>
      {showSteps && (
        <div className="dropTileBody">
          <h4 key={headline}></h4>
          {props.state.steps} {readMore}
        </div>
      )}
      <hr />
    </div>
  );
}
