import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import NotFound from "./components/notFound";
import AdminDashboard from "./components/adminDashboard";
import Home from "./components/home";
import "./App.css";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <main>
          <Switch>
            <Route path="/admin" component={AdminDashboard}></Route>
            <Route path="/not-found" component={NotFound}></Route>
            <Route path="/not-found" component={Home}></Route>
            <Redirect from="/" exact to="/home"></Redirect>
            <Redirect to="/not-found"></Redirect>
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
