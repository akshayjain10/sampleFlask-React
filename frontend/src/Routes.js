import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import Header from "./Components/Header.jsx";
import Evaluate from "./Components/Evaluate.jsx";
import Home from "./Components/Home.jsx";
import DisplayErrorCode from "./Components/NotFoundHandler.jsx";

export default class AppRoutes extends React.Component {
  render() {
    return (
      <HashRouter>
        <div>
          <Header {...this.props} />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/evaluate" component={Evaluate} />

            <Route path="*" component={DisplayErrorCode} />
          </Switch>
        </div>
      </HashRouter>
    );
  }
}
