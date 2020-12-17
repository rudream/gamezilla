import React from "react";
import { useSelector } from "react-redux";
import Game from "../components/Game";
import GameDetail from "../components/GameDetail";
import { Games, GameList } from "./Home";
import { fadeIn } from "../animations";
import { AnimatePresence, AnimateSharedLayout } from "framer-motion";
import { useLocation } from "react-router-dom";

const Library = () => {
    const location = useLocation();
    const pathId = location.pathname.split("/")[3];

    const useLibrary = () =>
        useSelector((state) => state.firestore.data.library) ?? {};

    const libraryArray = Object.values(useLibrary());

    return (
        <GameList variants={fadeIn} initial="hidden" animate="show">
            <AnimateSharedLayout type="crossfade">
                <AnimatePresence>
                    {pathId && <GameDetail pathId={pathId} />}
                </AnimatePresence>
                <div className="library">
                    <h2>Your Library:</h2>
                    {libraryArray.length > 0 ? (
                        <Games>
                            {libraryArray.map((game) => {
                                if (game) {
                                    return (
                                        <Game
                                            name={game.name}
                                            released={game.released}
                                            genres={game.genres}
                                            rating={game.rating}
                                            id={game.id}
                                            image={game.backgroundImageSrc}
                                            key={game.id}
                                        />
                                    );
                                } else {
                                    return "";
                                }
                            })}
                        </Games>
                    ) : (
                        <h1>You haven't added any games to your library yet</h1>
                    )}
                </div>
            </AnimateSharedLayout>
        </GameList>
    );
};

export default Library;
