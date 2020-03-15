import React from "react";
import "./Search.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle} from "@fortawesome/free-solid-svg-icons";

export function Search({setShowSearch}){

    return (
        <div>
            <input className="searchInput" type="text" />
            <div className="searchCloseIcon" onClick={() => setShowSearch(false)}>
                <FontAwesomeIcon icon={faTimesCircle}/>
            </div>
        </div>
    );
}