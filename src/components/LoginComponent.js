import React, { useRef, useState } from "react";
import { StyledForm } from "./FormStyles";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useFirebase, getFirebase } from "react-redux-firebase";
import { useHistory } from "react-router-dom";

const LoginComponent = () => {
    const dispatch = useDispatch();
    const firebase = useFirebase();
    const history = useHistory();

    const emailRef = useRef();
    const passwordRef = useRef();

    const [loginMessage, setLoginMessage] = useState("");

    const signInWithEmailHandler = (e) => {
        e.preventDefault();
        const firebase = getFirebase();
        firebase
            .auth()
            .signInWithEmailAndPassword(
                emailRef.current.value,
                passwordRef.current.value
            )
            .then(() => {
                dispatch({ type: "SIGN_IN" });
                setLoginMessage(
                    <h3 className="success-message">
                        Welcome back! Redirecting..
                    </h3>
                );
            })
            .catch((err) => {
                setLoginMessage(
                    <h3 className="error-message">
                        Invalid email or password.
                    </h3>
                );
                dispatch({ type: "SIGN_IN_ERR" }, err);
            });
    };

    const signInWithGoogleHandler = (e) => {
        e.preventDefault();
        firebase
            .login({
                provider: "google",
                type: "popup",
            })
            .then(() => {
                setLoginMessage(
                    <h3 className="success-message">
                        Welcome back! Redirecting..
                    </h3>
                );
                dispatch({ type: "SIGN_IN" });
                history.push("/");
            })
            .catch((err) => {
                setLoginMessage(
                    <h3 className="error-message">
                        There was a problem signing you in.
                    </h3>
                );
                dispatch({ type: "SIGN_IN_ERR" }, err);
            });
    };

    return (
        <StyledForm>
            <h1>Log In</h1>
            {loginMessage}
            <div>
                <label htmlFor="email">Email</label>
                <input id="email" type="email" ref={emailRef} required />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    type="password"
                    ref={passwordRef}
                    required
                />
            </div>
            <div className="buttons">
                <button
                    type="submit"
                    onClick={(e) => {
                        signInWithEmailHandler(e);
                    }}
                >
                    Log in
                </button>
                <button
                    type="submit"
                    onClick={(e) => {
                        signInWithGoogleHandler(e);
                    }}
                >
                    Sign in with Google
                </button>
            </div>
            <h4>
                Don't have an account? <Link to="/signup">Sign up.</Link>
            </h4>
        </StyledForm>
    );
};

export default LoginComponent;
