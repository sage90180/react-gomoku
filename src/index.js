import React from "react";
import ReactDOM from "react-dom";
import { ResetStyle, GlobalStyle } from "./globalStyle";

import App from "./App";

ReactDOM.render(
  <>
    <ResetStyle />
    <GlobalStyle />
    <App />
  </>,
  document.getElementById("root")
);
