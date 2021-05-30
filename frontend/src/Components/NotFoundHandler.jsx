import React from "react";
import { Link } from "react-router-dom";
import UIC from "../UI_Components/UIC";

const CodeStyle = {
  fontSize: 60,
  fontWeight: 600,
  marginTop: 40,
  marginBottom: 25,
};

const MessageStyle = {
  fontSize: 20,
  fontWeight: 400,
  color: "#333",
  marginBottom: 30,
};

const ActionStyle = {
  marginTop: 20,
};

export default function DisplayErrorCode() {
  return (
    <div className="child-component pt-2">
      <h1 className="text-center text-muted" style={CodeStyle}>
        404
      </h1>
      <h4 className="text-center text-muted" style={MessageStyle}>
        The requested page was not found
      </h4>
      <div className="text-center text-muted" style={ActionStyle}>
        <Link to="/">
          <UIC.Button>Go to Homepage</UIC.Button>
        </Link>
      </div>
    </div>
  );
}
