import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import Login from "./components/Login";
import Logout from "./components/Logout";
import Cliente from "./components/Cliente";
import AdicionarCliente from "./components/AdicionarCliente";
import EditarCliente from "./components/EditarCliente";
import { isAuthenticated } from './services/auth';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
);

function App() {
  return (<Router>
    <div className="App">
      <Switch>
        <Route exact path='/' component={Login} />
        <Route path="/login" component={Login} />
        <PrivateRoute exact path="/logout" component={Logout} />
        <PrivateRoute exact path="/cliente" component={Cliente} />
        <PrivateRoute exact path="/cliente/adicionar" component={AdicionarCliente} />
        <PrivateRoute exact path="/cliente/editar/:id" component={EditarCliente} />
      </Switch>

    </div>
  </Router>
  );
}

export default App;
