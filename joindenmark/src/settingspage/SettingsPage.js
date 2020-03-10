import React, { useState, useEffect } from "react";
import "./SettingsPage.css";
import { NavBar } from "../components/navbar/NavBar";
import { db } from "../firebase";
import { HomeButton } from "../components/homebutton/HomeButton";
import Switch from "react-switch";

export function SettingsPage(props) {
  const [title, setTitle] = useState(props.location.state.title);
  const [checked, setChecked] = useState(true);

  function writeSettingToDb(settingId, enabled) {
    db.collection("settings")
      .doc(settingId)
      .set({
        enabled: enabled
      })
      .then(function() {
        console.log("Document successfully written!");
      })
      .catch(function(error) {
        console.error("Error writing document: ", error);
      });
  }

  function changeSetting(settingName) {
    writeSettingToDb(settingName, !checked);
    setChecked(!checked);
  }

  return (
    <div>
      <NavBar state={{ title: title }}></NavBar>
      <HomeButton />
      <div>
        <span className="settingSpan">Student</span>
        <Switch
          className="settingSwitch"
          onChange={() => changeSetting("student")}
          checked={checked}
          onColor="#5864BA"
          offColor="#E87888"
        />
        <hr />
      </div>
    </div>
  );
}
