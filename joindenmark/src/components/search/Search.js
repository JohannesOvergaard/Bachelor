import React from "react";
import "./Search.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle} from "@fortawesome/free-solid-svg-icons";

export function Search({setShowSearch}){

    return (
        <div>
            <input type="text" className="searchInput"/>
            <div onClick={() => setShowSearch(false)}>
                <FontAwesomeIcon icon={faTimesCircle}/>
            </div>
        </div>
    );
}