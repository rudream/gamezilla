export const signOut = () => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        firebase
            .auth()
            .signOut()
            .then(() => {
                dispatch({ type: "SIGN_OUT" });
            })
            .catch((error) => {
                dispatch({ type: "SIGN_OUT_ERROR" });
            });
    };
};

export const setSignedIn = (isSignedIn) => (dispatch) => {
    if (isSignedIn) {
        dispatch({
            type: "SET_SIGNED_IN",
            payload: {
                isSignedIn: true,
            },
        });
    } else {
        dispatch({
            type: "SET_SIGNED_IN",
            payload: {
                isSignedIn: false,
            },
        });
    }
};
