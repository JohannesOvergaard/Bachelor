import React, { useState, useEffect } from "react";
import "./SettingsPage.css";
import { NavBar } from "../components/navbar/NavBar";
import { HomeButton } from "../components/homebutton/HomeButton";
import { Setting } from "../components/setting/Setting";
import { getContent } from "../services/ContentService";
import allActions from '../actions';
import { useSelector, useDispatch} from 'react-redux';
import { Redirect, Route } from "react-router-dom";

export function SettingsPage(props) {
  const [title] = useState(props.location.state.title);
  const [settings, setSettings] = useState({});
  const currentUser = useSelector(state => state.currentUser);
  const dispatch = useDispatch()

  useEffect(() => {
    getContent(title).then(setSettings);
  }, []);

  function generateSettings() {
    return (
      settings.docs &&
      settings.docs.length > 0 &&
      settings.docs.map(setting => {
        const data = setting.data();
        return (
          <Setting
            key={setting.id}
            state={{
              checked: data.enabled,
              settingId: setting.id
            }}
          />
        );
      })
    );
  }

  return (
    <div>
      <NavBar state={{ title: title }}></NavBar>
      <HomeButton />
      {generateSettings()}
      {
        currentUser.loggedIn ? 
        <>
          <p>ID: {currentUser.user.name}</p>
          <button onClick={() => dispatch(allActions.userActions.logOut())}>Logout</button>
        </> 
        : 
        <>
        <Route>
          <Redirect to="/"/>
        </Route>
        </>
        }
    </div>
  );
}
