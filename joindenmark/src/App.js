import React from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import { HomePage } from "./pages/homepage/HomePage";
import { CategoryPage } from "./pages/categorypage/CategoryPage";
import { SubTilePage } from "./pages/subtilepage/SubTilePage";
import { JoinDenmarkPage } from "./pages/joindkpage/JoinDenmarkPage";
import { SettingsPage } from "./pages/settingspage/SettingsPage";
import { LoginPage } from "./pages/loginpage/LoginPage";

function App() {
  return (
    <div className="appContainer">
      <Switch>
        <Route exact path="/" component={HomePage} />

        {/* Routes from Home page */}
        <Route path="/joindenmark" component={JoinDenmarkPage} />
        <Route path="/accommodation" component={CategoryPage} />
        <Route path="/culture" component={CategoryPage} />
        <Route path="/jobmarket" component={CategoryPage} />
        <Route path="/settings" component={SettingsPage} />
        <Route path="/login" component={LoginPage} />
        <Route exact path="/publicsector" component={SubTilePage} />

        {/* Routes from Public sector */}
        <Route path="/publicsector/taxes" component={CategoryPage} />
        <Route path="/publicsector/su" component={CategoryPage} />
        <Route path="/publicsector/cpr" component={CategoryPage} />
        <Route path="/publicsector/residencepermit" component={CategoryPage} />
      </Switch>
    </div>
  );
}

export default App;
