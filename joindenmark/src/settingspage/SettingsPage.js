import React, { useState, useEffect } from "react";
import "./SettingsPage.css";
import { NavBar } from "../components/navbar/NavBar";
import { HomeButton } from "../components/homebutton/HomeButton";
import Switch from "react-switch";

export function SettingsPage(props) {
  const [title, setTitle] = useState(props.location.state.title);
  const [checked, setChecked] = useState(true);

  return (
    <div>
      <NavBar state={{ title: title }}></NavBar>
      <HomeButton />
      <div>
          <span className="settingSpan">Student</span>
          <Switch 
            className="settingSwitch"
            onChange={() => setChecked(!checked)} 
            checked={checked} 
            onColor="#5864BA"
            offColor="#E87888"
          />
          <hr/>
      </div>
    </div>
  );
}
