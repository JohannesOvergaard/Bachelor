import React, { useState } from "react";
import { Redirect, Route } from "react-router-dom";
import "./LoginPage.css";
import { googleLogin, emailLogin } from "../../firebase";
import allActions from "../../actions";
import { getQuery, getQuerySteps } from "../../services/ContentService";
import { isEmpty } from "lodash";
import { useSelector, useDispatch } from "react-redux";
import { NavBar } from "../../components/navbar/NavBar";
import { HomeButton } from "../../components/homebutton/HomeButton";

export function LoginPage() {
  const currentUser = useSelector((state) => state.userState.user);
  const dispatch = useDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState(
    useSelector((state) => state.userState.loggedIn)
  );
  const [loggingInWithEmail, setLoggingInWithEmail] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = async (loginService) => {
    try {
      let id = null;
      if (!isEmpty(currentUser)) {
        id = currentUser.name;
      } else {
        switch (loginService[0]) {
          case "GOOGLE":
            id = await googleLogin();
            break;
          case "EMAIL":
            id = await emailLogin(loginService[1], loginService[2]);
            break;
        }
      }
      if (id) {
        dispatch(allActions.userActions.setUser({ name: id }));
        setIsLoggedIn(id);
        const disabledUserSettings = await getQuery("users", id);
        const settings = disabledUserSettings.split(",");
        dispatch(allActions.userActions.setSettings({ settings }));

        const checkBoxes = await getQuerySteps("users", id);
        const checkmarks = checkBoxes.split(",");
        dispatch(
          allActions.userActions.setCheckmarks({ checkmarks: checkmarks })
        );
      }
    } catch (err) {
      return alert(err);
    }
  };

  return (
    <div>
      <NavBar state={{ title: "Login" }} />
      <HomeButton />
      <div className="loginPageContainer">
        <p>Here you can login to the Join Denmark application</p>
        <p>
          By logging in you will be able to track your proccess of joining
          Denmark and disable categories you do not want to see
        </p>
        {loggingInWithEmail ? (
          <div>
            <p>Email</p>
            <input
              className="loginInput"
              onChange={(e) => setEmail(e.target.value)}
            />
            <p>Password</p>
            <input
              className="loginInput"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <button
              className="loginButton"
              onClick={() =>
                email && password
                  ? //console.log("email: " + email +" , password: " + password)
                    onLogin(["EMAIL", email, password])
                  : alert("Please write an email and a password")
              }
            >
              Login
            </button>
          </div>
        ) : (
          <div>
            <button className="loginButton" onClick={() => onLogin(["GOOGLE"])}>
              Login with Google
            </button>
            <button
              className="loginButton"
              onClick={() => {
                setLoggingInWithEmail(!loggingInWithEmail);
              }}
            >
              Login with Email
            </button>
          </div>
        )}
        {isLoggedIn ? (
          <Route>
            <Redirect to="/settings" />
          </Route>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}