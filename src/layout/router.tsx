import * as React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "../containers/Home";
import Notes from "../containers/Notes";

import NavBar from "../containers/NavBar";
import Login from "../containers/Login";
import Register from "../containers/Register";

interface Props {
  loading: boolean;
  authUser: boolean;
  setStateSafe: (newState) => void;
}

export const Router: React.StatelessComponent<Props> = (props) => {
    return (
        <div>
        <NavBar {...props}/>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" render={() => (
              props.authUser ? (
                <Redirect to="/notes"/>
              ) : (
                <Login {...props} />
              )
            )} />
            <Route exact path="/register" render={() => (
              props.authUser ? (
                <Redirect to="/notes"/>
              ) : (
                <Register {...props} />
              )
            )} />
            <Route exact path="/notes" render={() => (
              props.authUser ? (
                <Notes {...props} /> 
              ) : (
                <Redirect to="/login"/>
              )
            )} />
          </Switch>
        </div>
    );
};
