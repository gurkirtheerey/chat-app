import React from "react";
import { Route, Redirect } from "react-router-dom";

export const ProtectedRoute = ({ component: Component, value, ...rest }) => {
  return (
    <div>
      <Route
        {...rest}
        render={(props) =>
          value.length !== 0 ? <Component {...props} /> : <Redirect to="/" />
        }
      />
    </div>
  );
};
