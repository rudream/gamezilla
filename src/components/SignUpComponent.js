import React, { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { StyledForm } from "./FormStyles";
import { useDispatch } from "react-redux";
import { useFirebase, getFirebase } from "react-redux-firebase";

const SignUpComponent = () => {
    const firebase = useFirebase();
    const history = useHistory();
    const dispatch = useDispatch();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();

    const [signUpMessage, setSignUpMessage] = useState("");

    const signUpWithEmailHandler = (e) => {
        e.preventDefault();
        const firebase = getFirebase();

        if (passwordRef.current.value === passwordConfirmRef.current.value) {
            firebase
                .auth()
                .createUserWithEmailAndPassword(
                    emailRef.current.value,
                    passwordRef.current.value
                )
                .then(() => {
                    setSignUpMessage(
                        <h3 className="success-message">
                            Welcome to GameZilla! Redirecting..
                        </h3>
                    );
                    dispatch({ type: "SIGN_UP" });
                })
                .catch((err) => {
                    setSignUpMessage(
                        <h3 className="error-message">
                            There was a problem signing you up :&#40
                        </h3>
                    );
                    dispatch({ type: "SIGN_UP_ERR" }, err);
                });
        } else {
            setSignUpMessage(
                <h3 className="error-message">The passwords aren't matching</h3>
            );
        }
    };

    const signInWithGoogleHandler = (e) => {
        e.preventDefault();
        firebase
            .login({
                provider: "google",
                type: "popup",
            })
            .then(() => {
                setSignUpMessage(
                    <h3 className="success-message">
                        Welcome back! Redirecting..
                    </h3>
                );
                dispatch({ type: "SIGN_IN" });
                history.push("/");
            })
            .catch((err) => {
                setSignUpMessage(
                    <h3 className="error-message">
                        There was a problem signing you in.
                    </h3>
                );
                dispatch({ type: "SIGN_IN_ERR" }, err);
            });
    };

    return (
        <StyledForm>
            <h1>Sign Up</h1>
            {signUpMessage}
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
                    Sign Up
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
