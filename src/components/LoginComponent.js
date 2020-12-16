import React, { useRef } from "react";
import { StyledForm } from "./FormStyles";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useFirebase } from "react-redux-firebase";
import { useHistory } from "react-router-dom";
import { signInWithEmail } from "../actions/authActions";

const LoginComponent = () => {
    const dispatch = useDispatch();
    const firebase = useFirebase();
    const history = useHistory();

    const emailRef = useRef();
    const passwordRef = useRef();

    const signInWithEmailHandler = (e) => {
        e.preventDefault();
        const creds = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };
        console.log(creds);
        dispatch(signInWithEmail(creds));
    };

    const signInWithGoogleHandler = (e) => {
        e.preventDefault();
        firebase
            .login({
                provider: "google",
                type: "popup",
            })
            .then(() => {
                history.push("/");
            });
    };

    return (
        <StyledForm>
            <h1>Log In</h1>
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
