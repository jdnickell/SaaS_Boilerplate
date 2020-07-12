import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Register from "./components/account/Register";
import SignUp from "./components/account/SignUp";
import ConfirmEmail from "./components/account/ConfirmEmail";
import "react-bulma-components/dist/react-bulma-components.min.css";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route exact path="/" />
            <Route path="/register" component={Register} />
            <Route path="/signup" component={SignUp} />
            <Route path="/ConfirmEmail" component={ConfirmEmail} />
          </Switch>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
