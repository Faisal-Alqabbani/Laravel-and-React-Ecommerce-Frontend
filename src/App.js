import React, { Component, Fragment } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoute from "./routes/AppRoute";
export class App extends Component {
  render() {
    return (
      <Fragment>
        <Router>
          <AppRoute />
        </Router>
      </Fragment>
    );
  }
}

export default App;
