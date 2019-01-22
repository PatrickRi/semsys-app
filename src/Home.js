import React from "react";
import logo from "./logo.svg";
import "./Home.scss";

export default function Home() {
  return (
    <div>
      <div className="App">
        <header className="app-header">
          <img src={logo} className="app-logo" alt="logo"/>
          <h1 className="app-title">Our fancy semantic SPARQL UI</h1>
          <img src={logo} className="app-logo-right" alt="logo"/>
        </header>
      </div>
    </div>
  );
}
