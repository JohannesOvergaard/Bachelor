import React from "react";
import "./App.css";
import { FrontPage } from "./frontpage/FrontPage";
import { Page } from "./page/Page";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" exact component={FrontPage} />
        <Route exact path="/publicsector" exact component={Page} />
        <Route exact path="/accommodation" exact component={Page} />
        <Route exact path="/culture" exact component={Page} />
        <Route exact path="/jobmarket" exact component={Page} />
      </Switch>
    </div>
  );
}

export default App;
