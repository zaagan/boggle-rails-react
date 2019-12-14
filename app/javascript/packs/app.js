import React, { Suspense } from "react";
import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";
import Loadable from "react-loadable";

import Loader from "../components/common/Loader";
import {
  defaultRoutes as PrimaryRoutes,
  controlledRoutes as ControlledRoutes
} from "../routes";
import Aux from "../hoc/_Aux";
import { ToastContainer } from 'react-toastify';


import "./App.css";
import 'react-toastify/dist/ReactToastify.css';

import logo from "../assets/images/logo.png";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faRedo, faHome } from "@fortawesome/free-solid-svg-icons";
library.add(faHome);
library.add(faRedo);

import PrivateRoute from "../components/common/privateRoute/PrivateRoute";

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const primaryRoutes = PrimaryRoutes.map((route, index) => {
      return route.component ? (
        <Route
          key={index}
          path={route.path}
          exact={route.exact}
          name={route.name}
          render={props => <route.component {...props} />}
        />
      ) : null;
    });

    const privateRoutes = ControlledRoutes.map((route, index) => {
      return route.component ? (
        <PrivateRoute
          key={index}
          path={route.path}
          exact={route.exact}
          name={route.name}
          component={route.component}
        />
      ) : null;
    });

    return (
      <Aux>
        <Suspense fallback={<Loader />}>
          <Switch>
            <React.Fragment>
              <div className="container">
                <div className="header">
                  <img src={logo} className="header-logo" alt="logo" />
                </div>

                {primaryRoutes}
                {privateRoutes}
                <ToastContainer />
              </div>
            </React.Fragment>
          </Switch>
        </Suspense>
      </Aux>
    );
  }
}

function mapStateToProps(state) {
  const { currentUser } = state.game;
  return { currentUser };
}

App = connect(mapStateToProps)(App);

export default App;
