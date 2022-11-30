import React from "react";
import {BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import history from "./history";
import register from "./components/register";
import login from './components/login';
import forgotPassword from "./components/forgotPassword";
import resetPassword from "./components/resetPassword";
import Dashboard from "./components/dashboard";
import groupChat from "./components/groupChat"

function App() {
  return (
    <div>
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0"
    ></meta>
      <Router >
        <Switch>
          <Route path="/register" component={register} />
          <Route exact path="/" component={login} />
          <Route path="/forgotPassword" component={forgotPassword} />
          <Route path="/resetPassword" component={resetPassword} />
          <Route path="/dashboard" component={Dashboard}></Route>
          <Route path="/grpChat" component={groupChat}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
