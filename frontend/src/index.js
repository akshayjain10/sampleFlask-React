import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, useHistory } from "react-router-dom";
import Routes from "./Routes";
import { MyContextProvider } from "./Context/MyContext";

const App = () => {
  const history = useHistory();
  return (
    <BrowserRouter history={history}>
      <MyContextProvider>
        <Routes />
      </MyContextProvider>
    </BrowserRouter>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
