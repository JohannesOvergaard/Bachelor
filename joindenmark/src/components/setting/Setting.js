import React, { useState, useEffect } from "react";
import Switch from "react-switch";
import { useSelector, useDispatch } from "react-redux";
import allActions from "../../actions";
import { updateUserSettings } from "../../services/ContentService";

export function Setting(props) {
  const [checked, setChecked] = useState(props.state.checked);
  const [settingId] = useState(props.state.settingId);
  const currentUser = useSelector(state => state.currentUser);
  const dispatch = useDispatch();

  function updateSettingsArray(array, element) {
    const index = array.indexOf(element);
    if (index > -1) {
      array.splice(index, 1);
      return array;
    } else {
      array.push(element);
      return array;
    }
  }

  function updateSettings(enabled) {
    const settings = updateSettingsArray(
      currentUser.settings.settings,
      settingId
    );
    updateUserSettings(
      "users",
      currentUser.user.name,
      "settingsDisabled",
      settings
    );

    dispatch(allActions.userActions.setSettings({ settings }));
  }

  function changeSetting() {
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
