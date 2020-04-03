import React, {useState} from "react";
import { Redirect, Route } from "react-router-dom";
import { login } from "../../firebase";
import allActions from "../../actions";
import { getQuery } from "../../services/ContentService";
import { isEmpty } from "lodash";
import { useSelector, useDispatch } from "react-redux";
import { NavBar } from "../../components/navbar/NavBar";

export function LoginPage(){
    const currentUser = useSelector(state => state.userState.user);
    const dispatch = useDispatch();
    const [isLoggedIn, setIsLoggedIn] = useState(useSelector(state => state.userState.loggedIn));

    const onLogin = async () => {
      let id = null;
      if (!isEmpty(currentUser)) {
        id = currentUser.name;
      } else {
        id = await login();
        dispatch(allActions.userActions.setUser({ name: id }));
        setIsLoggedIn(id);
      }
      const disabledUserSettings = await getQuery("users", id);
      const settings = disabledUserSettings.split(",");
      dispatch(allActions.userActions.setSettings({ settings }));
    };

    return (
    <div>
        <NavBar state={{ title: "Profile" }}/>
        <p>Here you can login to the Join Denmark application</p>
        <p>By logging in you will be able to track your proccess of joining Denmark and disable categories you don't wanna see</p>
        <button onClick={()=>onLogin()}>Login with Google</button>
        {isLoggedIn ? (
        <Route>
          <Redirect to="/settings"/>
        </Route>
      ) : (
          <div></div>
      )}
    </div>
    );
}