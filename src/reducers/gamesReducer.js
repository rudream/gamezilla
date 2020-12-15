const initialState = {
    popular: [],
    newGames: [],
    upcoming: [],
    searched: [],
};

const gamesReducer = (state = initialState, action) => {
    switch (action.type) {
        case "FETCH_GAMES":
            return {
                ...state,
                popular: action.payload.popular,
                newGames: action.payload.newGames,
                upcoming: action.payload.upcoming,
            };
        default:
            return { ...state };
    }
};

const fetchGames = (userData) => {
    return {
        type: "FETCH_GAMES",
        payload: userData,
    };
};

export default gamesReducer;
