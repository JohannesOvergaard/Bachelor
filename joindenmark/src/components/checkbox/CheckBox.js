import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import allActions from "../../actions";
import { updateJoinDkChecks } from "../../services/ContentService";
import { updateArray } from "../../Util/Helpers";
import "./CheckBox.css";

export function CheckBox(props) {
  const [stepId] = useState(props.state.id);
  const checkMarks = useSelector((state) => state.userState.checkmarks);
  const [checked, setChecked] = useState(checkMarks.includes(stepId));
  const currentUser = useSelector((state) => state.userState.user);
  const dispatch = useDispatch();

  function onCheckBoxChange() {
    const checkmarksArr = updateArray(checked, checkMarks, stepId);
    updateJoinDkChecks(currentUser.name, checkmarksArr);
    dispatch(allActions.userActions.setCheckmarks({ checkmarks: checkMarks }));
    setChecked(!checked);
  }
  return (
    <label className="container">
      <input
        type="checkbox"
        onChange={() => onCheckBoxChange()}
        checked={checked}
        className="checkBox"
      />
      <span className="checkmark"></span>
    </label>
  );
}
