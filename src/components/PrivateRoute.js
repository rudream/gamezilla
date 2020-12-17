import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { isSignedIn } = useSelector((state) => state.auth);

    return (
        <Route
            {...rest}
            render={(props) => {
                return isSignedIn ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/login" />
                );
            }}
        ></Route>
    );
};

export default PrivateRoute;
