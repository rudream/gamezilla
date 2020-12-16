export const addToLibrary = (game) => async (dispatch) => {
    dispatch({
        type: "ADD_GAME",
        payload: {
            game: game,
        },
    });
};
