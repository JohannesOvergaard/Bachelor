import React from "react";
import "./App.css";
import { FrontPage } from "./frontpage/FrontPage";
import { Page } from "./page/Page";
import { SubTilePage } from "./subtilepage/SubTilePage";
import { JoinDenmarkPage } from "./joindkpage/JoinDenmarkPage";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <div>
      <Switch>
<<<<<<< HEAD
        <Route exact path="/" exact component={FrontPage} />
        <Route exact path="/joindenmark" exact component={JoinDenmarkPage} />
        <Route exact path="/publicsector" exact component={SubTilePage} />
        <Route exact path="/accommodation" exact component={Page} />
        <Route exact path="/culture" exact component={Page} />
        <Route exact path="/jobmarket" exact component={Page} />
=======
        <Route exact path="/"component={FrontPage} />

        {/* Routes from Home page */}
        <Route path="/accommodation" component={Page} />
        <Route path="/culture" component={Page} />
        <Route path="/jobmarket" component={Page} />
        <Route exact path="/publicsector" component={SubTilePage} />

        {/* Routes from Public sector */}
        <Route path="/publicsector/taxes" component={Page}/>
        <Route path="/publicsector/su" component={Page}/>
        <Route path="/publicsector/cpr" component={Page}/>
        <Route path="/publicsector/residencepermit" component={Page}/>
>>>>>>> develop
      </Switch>
    </div>
  );
}

export default App;
