import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import App from "./App";
import Login from "./components/Login";
import Register from "./components/Register";
import ActivityLog from "./components/routes/ActivityLog";
import Profile from "./components/routes/Profile";
export default class Router extends Component {
  render() {
    return (
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Header />
        <Switch>
          <Route exact path="/" component={App} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/activities" component={ActivityLog} />
          <Route path="/profile" component={Profile}/>
        </Switch>
      </BrowserRouter>
    );
  }
}
