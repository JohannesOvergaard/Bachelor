import React, { useState } from "react";
import "./Setting.css";
import Switch from "react-switch";
import { useSelector, useDispatch } from "react-redux";
import allActions from "../../actions";
import { updateUserSettings } from "../../services/ContentService";
import { updateArray } from "../../Util/Helpers";

export function Setting(props) {
  const [checked, setChecked] = useState(props.state.checked);
  const [settingId] = useState(props.state.settingId);
  const currentUser = useSelector((state) => state.userState.user);
  const settings = useSelector((state) => state.userState.settings);
  const dispatch = useDispatch();

  function changeSetting() {
    const settingsArr = updateArray(!checked, settings, settingId);
    updateUserSettings("users", currentUser.name, settingsArr);
    dispatch(allActions.userActions.setSettings({ settings }));
    setChecked(!checked);
  }

  return (
    <div>
      <span className="settingSpan">
        {settingId[0].toUpperCase() + settingId.slice(1)}
      </span>
      <Switch
        className="settingSwitch"
        onChange={() => changeSetting()}
        checked={checked}
        onColor="#5864BA"
        offColor="#E87888"
      />
      <hr />
    </div>
  );
}
