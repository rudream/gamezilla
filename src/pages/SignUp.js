import React from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import SignUpComponent from "../components/SignUpComponent";

const SignUp = () => {
    const { isSignedIn } = useSelector((state) => state.auth);

    return <>{isSignedIn ? <Redirect to="/" /> : <SignUpComponent />}</>;
};

export default SignUp;
