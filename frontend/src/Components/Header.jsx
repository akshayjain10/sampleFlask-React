import React, { Fragment } from "react";
import { Link } from "react-router-dom";

export default class Header extends React.Component {
  render() {
    return (
      <Fragment>
        <div className="navbar navbar-expand-md navbar-dark bg-color-steel">
          <div className="container">
            <Link className="navbar-brand" to="/">
              Sample Task
            </Link>
          </div>
        </div>
      </Fragment>
    );
  }
}
