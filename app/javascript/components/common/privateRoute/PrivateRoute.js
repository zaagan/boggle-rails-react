import React from "react";
import { Route, Redirect } from "react-router-dom";

import { ROUTE_INTRO } from "../../../constants/routeNames";
import { getCurrentUser } from "../../../helpers";

function PrivateRoute({ component: Component, ...rest }) {
  const user = getCurrentUser();
  
  return (
    <Route
      {...rest}
      render={props =>
        user ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: ROUTE_INTRO,
              state: {
                from: props.location
              },
              children: props.children
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
