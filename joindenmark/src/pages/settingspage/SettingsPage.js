import React, { useState, useEffect } from "react";
import "./SettingsPage.css";
import { NavBar } from "../../components/navbar/NavBar";
import { HomeButton } from "../../components/homebutton/HomeButton";
import { Setting } from "../../components/setting/Setting";
import { getContent } from "../../services/ContentService";
import allActions from "../../actions";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { firebaseLogout } from "../../services/firebase";

export function SettingsPage() {
  const [settings, setSettings] = useState({});
  const loggedIn = useSelector((state) => state.userState.loggedIn);
  const userSettings = useSelector((state) => state.userState.settings);
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
    dispatch(allActions.userActions.logOut());
  }

  function generateSettings() {
    return (
      settings.docs &&
      settings.docs.length > 0 &&
      settings.docs.map((setting) => {
        return (
          <Setting
            key={setting.id}
            state={{
              checked: !userSettings.includes(setting.id),
              settingId: setting.id,
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
      <p className="informaionText">
        On this page you can customize what categories are shown on the
        homepage, you can disable the subjects you are not interested in.
      </p>
      <p className="informaionText">
        For example: if you no longer wish to see the Join Denmark Step by step
        guide you simply disable Joindk and it will not longer show on the
        homepage.
      </p>
      {generateSettings()}
      {loggedIn ? (
        <div>
          <button className="logoutButton" onClick={() => logout()}>
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
