import React, { Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import Loadable from "react-loadable";

import Loader from "../components/common/Loader";
import GameRoutes from "../routes";
import Aux from "../hoc/_Aux";

// import '../my.scss';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const gameRoutes = GameRoutes.map((route, index) => {
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

    return (
      <Aux>
        <Suspense fallback={<Loader />}>
          <Switch>{gameRoutes}</Switch>
        </Suspense>
      </Aux>
    );
  }
}

export default App;
