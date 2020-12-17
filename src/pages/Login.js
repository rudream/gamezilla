import React from "react";
import LoginComponent from "../components/LoginComponent";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

const Login = () => {
    const { isSignedIn } = useSelector((state) => state.auth);

    return <>{isSignedIn ? <Redirect to="/" /> : <LoginComponent />}</>;
};

export default Login;
