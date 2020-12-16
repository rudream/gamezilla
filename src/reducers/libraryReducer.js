import { useFirestore } from "react-redux-firebase";

const libraryReducer = (state = [], action) => {
    switch (action.type) {
        case "ADD_GAME":
            return [...state, action.payload.game];
        default:
            return state;
    }
};

export default libraryReducer;
