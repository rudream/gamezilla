import { combineReducers } from "redux";
import gamesReducer from "./gamesReducer";
import detailsReducer from "./detailsReducer";
import authReducer from "./authReducer";
import libraryReducer from "./libraryReducer";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";

const rootReducer = combineReducers({
    games: gamesReducer,
    details: detailsReducer,
    auth: authReducer,
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    library: libraryReducer,
});

export default rootReducer;
