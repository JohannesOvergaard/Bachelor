import React, { useState, useEffect } from "react";
import { NavBar } from "../../components/navbar/NavBar";
import { HomeButton } from "../../components/homebutton/HomeButton";
import { Setting } from "../../components/setting/Setting";
import { getContent } from "../../services/ContentService";
import allActions from "../../actions";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { firebaseLogout } from "../../firebase";

export function SettingsPage() {
  const [settings, setSettings] = useState({});
  const currentUser = useSelector(state => state.userState.user);
  const loggedIn = useSelector(state => state.userState.loggedIn);
  const userSettings = useSelector(state => {
    return state.userState.settings;
  });
  const dispatch = useDispatch();

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    const data = await getContent("settings");
    setSettings(data);
  };

  function logout() {
    firebaseLogout();
    dispatch(allActions.userActions.logOut())
  }

  function generateSettings() {
    return (
      settings.docs &&
      settings.docs.length > 0 &&
      settings.docs.map(setting => {
        return (
          <Setting
            key={setting.id}
            state={{
              checked: !userSettings.includes(setting.id),
              settingId: setting.id
            }}
          />
        );
      })
    );
  }

  return (
    <div>
      <NavBar state={{ title: "Settings" }}></NavBar>
      <HomeButton />
      {generateSettings()}
      {loggedIn ? (
        <div>
          <p>ID: {currentUser.name}</p>
          <button onClick={() => logout()}>
            Logout
          </button>
        </div>
      ) : (
        <Route>
          <Redirect to="/" />
        </Route>
      )}
    </div>
  );
}
