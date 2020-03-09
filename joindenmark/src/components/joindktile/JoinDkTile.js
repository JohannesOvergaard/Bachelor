import React from "react";
import "./JoinDkTile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

export function JoinDkTile(props) {
  return (
    <div className="joinDkTileBoarder">
      <div className="joinDkTile">
        <p className="joinDkTileTitle">{props.state.title}</p>
        <p className="joinDkTileText">Step by step</p>
        <div className="joinDkTileIcon">
          <FontAwesomeIcon icon={faChevronRight} />
        </div>
      </div>
    </div>
  );
}
