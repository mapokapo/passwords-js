import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import MainApp from "./MainApp";
import reportWebVitals from "./reportWebVitals";
import { HashRouter as Router } from "react-router-dom";

function generateHexString(length: number): string {
  var ret = "";
  while (ret.length < length) {
    ret += Math.random().toString(16).substring(2);
  }
  return ret.substring(0, length);
}

if (localStorage.getItem("salt") === null)
  localStorage.setItem("salt", generateHexString(58));

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <MainApp />
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
