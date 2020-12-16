export const signInWithEmail = (creds) => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        firebase
            .auth()
            .signInWithEmailAndPassword(creds.email, creds.password)
            .then(() => {
                dispatch({ type: "SIGN_IN" });
            })
            .catch((err) => {
                dispatch({ type: "SIGN_IN_ERR" }, err);
            });
    };
};

export const signUpWithEmail = (creds) => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();

        firebase
            .auth()
            .createUserWithEmailAndPassword(creds.email, creds.password)
            .then(() => {
                dispatch({ type: "SIGN_UP" });
            })
            .catch((err) => {
                dispatch({ type: "SIGN_UP_ERR" }, err);
            });
    };
};
