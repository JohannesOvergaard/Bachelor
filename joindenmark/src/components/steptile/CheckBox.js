import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import allActions from "../../actions";
import { updateJoinDkChecks } from "../../services/ContentService";
import { updateArray } from "../../Util/Helpers";

export function CheckBox(props) {
  const [stepId] = useState(props.state.id);
  const checkMarks = useSelector((state) => state.userState.checkmarks);
  const [checked, setChecked] = useState(checkMarks.includes(stepId));
  const currentUser = useSelector((state) => state.userState.user);
  const dispatch = useDispatch();

  function onCheckBoxChange(checked) {
    console.log(props.state.id);
    const checkmarksArr = updateArray(!checked, checkMarks, stepId);
    updateJoinDkChecks(currentUser.name, checkmarksArr);
    dispatch(allActions.userActions.setCheckmarks({ checkmarks: checkMarks }));
    setChecked(checked);
  }
  return (
    <div>
      {" "}
      <input
        type="checkbox"
        onChange={() => onCheckBoxChange(!checked)}
        checked={checked}
        className="form-check-input"
      />
    </div>
  );
}
