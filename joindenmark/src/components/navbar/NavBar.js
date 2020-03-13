import React, {useState} from "react";
import "./NavBar.css";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faSearch} from "@fortawesome/free-solid-svg-icons";
import { Search } from "../search/Search"

export function NavBar(props) {
  let history = useHistory();
  const [showSearch, setShowSearch] = useState(false);

  function generateNavbar(){
    if(!showSearch){
      return (
        <div className="navbar">
      <div className="back">
        <FontAwesomeIcon icon={faChevronLeft} onClick={() => history.goBack()}/>
      </div>
      <p className="title">{props.state.title}</p>
      <div className="find" onClick={() => setShowSearch(!showSearch)}>
        <FontAwesomeIcon icon={faSearch} />
      </div>
    </div>
      ); 
    } else {
      return (
        <div>
          <Search setShowSearch={setShowSearch}/>
        </div>
      );
    }
  }

  return (
    <div>
      {generateNavbar()}
    </div>
  );
}
