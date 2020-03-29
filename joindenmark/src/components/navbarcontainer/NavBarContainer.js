import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Link, Redirect } from "react-router-dom";
import { Search } from "../search/Search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faSearch, faUser } from "@fortawesome/free-solid-svg-icons";
import { login } from "../../firebase";
import allActions from "../../actions";
import { useSelector, useDispatch } from "react-redux";
import { getQuery } from "../../services/ContentService";
import { isEmpty } from "lodash";

export function NavbarContainer() {
  const currentUser = useSelector(state => state.currentUser);
  const [showSearch, setShowSearch] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState();
  const [userSettings, setUserSettings] = useState();
  const dispatch = useDispatch();

  const onLogin = async () => {
    let id = null;
    if (!isEmpty(currentUser) && !isEmpty(currentUser.user)) {
      id = currentUser.user.name;
    } else {
      id = await login();
      dispatch(allActions.userActions.setUser({ name: id }));
      setIsLoggedIn(id);
      console.log(id);
    }
    const disabledUserSettings = await getQuery("users", id);
    const settings = disabledUserSettings.split(",");
    console.log(settings);
    dispatch(allActions.userActions.setSettings({ settings }));
  };
  useEffect(() => {
    console.log(currentUser.loggedIn);
    setIsLoggedIn(currentUser.loggedIn);
  }, []);

  return (
    <div>
      {!showSearch && (
        <div>
          <div className="settings">
            {isLoggedIn && (
              <Link
                to={{
                  pathname: "/settings",
                  state: { title: "Settings" }
                }}
              >
                <FontAwesomeIcon icon={faCog} />
              </Link>
            )}
            {!isLoggedIn && (
              <div onClick={() => onLogin()}>
                <FontAwesomeIcon icon={faUser} />
              </div>
            )}
          </div>
          <div className="search" onClick={() => setShowSearch(!showSearch)}>
            {!showSearch && <FontAwesomeIcon icon={faSearch} />}
          </div>
        </div>
      )}
      {showSearch && (
        <div>
          <Search setShowSearch={setShowSearch} />
        </div>
      )}
    </div>
  );
}
