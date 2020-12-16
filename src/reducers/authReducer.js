const authReducer = (state = {}, action) => {
    switch (action.type) {
        case "SIGN_IN":
            console.log("Welcome back");
            return state;
        case "SIGN_IN_ERR":
            console.log("Sign in error");
            return state;
        case "SIGN_UP":
            console.log("Welcome..");
            return state;
        case "SIGN_UP_ERR":
            console.log("Sign up error");
            return state;
        default:
            return state;
    }
};

export default authReducer;
