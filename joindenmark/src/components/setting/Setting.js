import React, { useState } from "react";
import Switch from "react-switch";
import { useSelector, useDispatch } from "react-redux";
import allActions from "../../actions";
import { updateUserSettings } from "../../services/ContentService";

export function Setting(props) {
  const [checked, setChecked] = useState(props.state.checked);
  const [settingId] = useState(props.state.settingId);
  const currentUser = useSelector(state => state.currentUser);
  const dispatch = useDispatch();

  function updateSettingsArray(enabled, array, element) {
    const index = array.indexOf(element);
    if (enabled) {
      array.splice(index, 1);
      return array;
    } else {
      array.push(element);
      return array;
    }
  }

  function updateSettings(enabled) {
    console.log(
      "settings is:",
      currentUser.settings,
      " and is type:",
      typeof currentUser.settings
    );
    const settings = updateSettingsArray(
      enabled,
      currentUser.settings,
      settingId
    );
    updateUserSettings("users", currentUser.user.name, settings);

    dispatch(allActions.userActions.setSettings({ settings }));
  }

  function changeSetting() {
    console.log(currentUser);
    updateSettings(!checked);
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
