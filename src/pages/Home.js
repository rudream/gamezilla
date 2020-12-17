import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadGames } from "../actions/gamesAction";
import styled from "styled-components";
import { motion, AnimatePresence, AnimateSharedLayout } from "framer-motion";
import Game from "../components/Game";
import GameDetail from "../components/GameDetail";
import { useLocation } from "react-router-dom";
import { fadeIn } from "../animations";
import Loader from "react-loader-spinner";

const Home = () => {
    //get current location
    const location = useLocation();
    const pathId = location.pathname.split("/")[2];
    //fetch games
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadGames());
    }, [dispatch]);

    //Get data back
    const { popular, newGames, upcoming, searched } = useSelector(
        (state) => state.games
    );

    const isLoading = useSelector((state) => state.games.isLoading);

    const clearResultsHandler = () => {
        dispatch({ type: "CLEAR_SEARCHED" });
    };

    return (
        <GameList variants={fadeIn} initial="hidden" animate="show">
            <AnimateSharedLayout type="crossfade">
                <AnimatePresence>
                    {pathId && <GameDetail pathId={pathId} />}
                </AnimatePresence>
                {searched.length ? (
                    <div className="searched">
                        <h2>
                            Search Results{" "}
                            <span
                                onClick={clearResultsHandler}
                                id="clear-results"
                            >
                                Clear Results
                            </span>
                        </h2>
                        <Games>
                            {searched.map((game) => (
                                <Game
                                    name={game.name}
                                    released={game.released}
                                    genres={game.genres}
                                    rating={game.rating}
                                    id={game.id}
                                    image={game.background_image}
                                    key={game.id}
                                />
                            ))}
                        </Games>
                    </div>
                ) : (
                    ""
                )}
                <h2>Upcoming Games</h2>
                {!isLoading ? (
                    <Games>
                        {upcoming.map((game) => (
                            <Game
                                name={game.name}
                                released={game.released}
                                id={game.id}
                                image={game.background_image}
                                key={game.id}
                                genres={game.genres}
                                rating={game.rating}
                            />
                        ))}
                    </Games>
                ) : (
                    <Loader
                        type="ThreeDots"
                        color="orange"
                        height="200"
                        width="200"
                        className="loader"
                    />
                )}
                <h2>High Rated Games</h2>
                {!isLoading ? (
                    <Games>
                        {popular.map((game) => (
                            <Game
                                name={game.name}
                                released={game.released}
                                id={game.id}
                                image={game.background_image}
                                key={game.id}
                                genres={game.genres}
                                rating={game.rating}
                            />
                        ))}
                    </Games>
                ) : (
                    <Loader
                        type="ThreeDots"
                        color="orange"
                        height="200"
                        width="200"
                        className="loader"
                    />
                )}
                <h2>New Games</h2>
                {!isLoading ? (
                    <Games>
                        {newGames.map((game) => (
                            <Game
                                name={game.name}
                                released={game.released}
                                id={game.id}
                                image={game.background_image}
                                key={game.id}
                                genres={game.genres}
                                rating={game.rating}
                            />
                        ))}
                    </Games>
                ) : (
                    <Loader
                        type="ThreeDots"
                        color="orange"
                        height="200"
                        width="200"
                        className="loader"
                    />
                )}
            </AnimateSharedLayout>
        </GameList>
    );
};

export const GameList = styled(motion.div)`
    padding: 0rem 5rem;
    h2 {
        padding: 5rem 0rem;
        font-size: 3rem;
    }
    #clear-results {
        color: #ee6a6a;
        font-family: "Montserrat", sans-serif;
        font-weight: lighter;
        font-size: 1.5rem;
        padding: 1rem;
        cursor: pointer;
    }
    .loader {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    @media screen and (max-width: 768px) {
        width: 100vw;
        padding: 0;
        margin: 0;
        h2 {
            font-size: 1.5rem;
            margin: auto;
            text-align: center;
        }
    }
`;

export const Games = styled(motion.div)`
    min-height: 80vh;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
    grid-column-gap: 3rem;
    grid-row-gap: 5rem;
    @media screen and (max-width: 768px) {
        display: grid;
        grid-template-columns: 1fr;
        grid-row-gap: 10vh;
        padding: auto;
        margin: auto;
        width: 80vw;
    }
`;

export default Home;
