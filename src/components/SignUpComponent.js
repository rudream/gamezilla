import React, { useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { StyledForm } from "./FormStyles";
import { signUpWithEmail } from "../actions/authActions";
import { useDispatch } from "react-redux";
import { useFirebase } from "react-redux-firebase";

const SignUpComponent = () => {
    const firebase = useFirebase();
    const history = useHistory();
    const dispatch = useDispatch();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();

    const signUpWithEmailHandler = (e) => {
        e.preventDefault();
        const creds = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };
        console.log(creds);
        dispatch(signUpWithEmail(creds));
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
            <h1>Sign Up</h1>
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
            <div>
                <label htmlFor="confirm-password">Confirm Password</label>
                <input
                    id="confirm-password"
                    type="password"
                    ref={passwordConfirmRef}
                    required
                />
            </div>
            <div className="buttons">
                <button
                    type="submit"
                    onClick={(e) => {
                        signUpWithEmailHandler(e);
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
                Already have an account? <Link to="/login">Sign in.</Link>
            </h4>
        </StyledForm>
    );
};

export default SignUpComponent;
