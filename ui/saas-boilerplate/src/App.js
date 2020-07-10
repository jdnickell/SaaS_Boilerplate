import React from "react";
import logo from "./logo.svg";
import "./App.css";
import ApiRequest from "./components/api/ApiRequest";

function App() {
  ApiRequest({
    method: "get",
    url: "/todos/1",
  }).then((resp) => {
    console.log(resp);
  });

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
