import React, { useState, useEffect } from "react";
import Switch from "react-switch";
import { db } from "../../firebase";

export function Setting(props) {
  const [checked, setChecked] = useState(props.state.checked);
  const [settingId] = useState(props.state.settingId);

  function writeSettingToDb(enabled) {
    db.collection("settings")
      .doc(settingId)
      .set({
        enabled: enabled
      })
      .then(function() {
        console.log("Document successfully written with value: ", enabled);
      })
      .catch(function(error) {
        console.error("Error writing document: ", error);
      });
  }

  function changeSetting() {
    writeSettingToDb(!checked);
    setChecked(!checked);
  }

  return (
    <div>
      <span className="settingSpan">{settingId}</span>
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
