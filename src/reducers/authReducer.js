const initialState = { isSignedIn: false };

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SIGN_IN":
            return {
                ...state,
                isSignedIn: true,
            };
        case "SIGN_IN_ERR":
            return {
                ...state,
                isSignedIn: false,
            };
        case "SIGN_UP":
            return {
                ...state,
                isSignedIn: true,
            };
        case "SIGN_OUT":
            return {
                ...state,
                isSignedIn: false,
            };
        case "SIGN_UP_ERR":
            return {
                ...state,
                isSignedIn: false,
            };
        case "SET_SIGNED_IN":
            return {
                ...state,
                isSignedIn: action.payload.isSignedIn,
            };
        default:
            return { ...state };
    }
};

export default authReducer;
