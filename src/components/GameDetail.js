import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { smallImage } from "../util";

import playstation from "../img/playstation.svg";
import steam from "../img/steam.svg";
import xbox from "../img/xbox.svg";
import nintendo from "../img/nintendo.svg";
import apple from "../img/apple.svg";
import gamepad from "../img/gamepad.svg";

const GameDetail = ({ pathId }) => {
    const history = useHistory();

    const exitDetailHandler = (e) => {
        const element = e.target;
        console.log(element);
        if (element.classList.contains("shadow")) {
            document.body.style.overflow = "auto";
            history.push("/");
        }
    };

    //get platform icons

    const getPlatform = (platform) => {
        switch (platform) {
            case "PlayStation 5":
            case "PlayStation 4":
            case "PlayStation 3":
                return playstation;
            case "Xbox One":
            case "Xbox Series S/X":
            case "Xbox 360":
                return xbox;
            case "PC":
            case "Linux":
                return steam;
            case "Nintendo Switch":
            case "Wii":
            case "GameCube":
            case "Wii U":
                return nintendo;
            case "iOS":
            case "macOS":
                return apple;
            default:
                return gamepad;
        }
    };

    //Data
    const { screen, game, isLoading } = useSelector((state) => state.details);
    return (
        <>
            {!isLoading && (
                <CardShadow className="shadow" onClick={exitDetailHandler}>
                    <Detail layoutId={pathId}>
                        <Stats>
                            <div className="rating">
                                <motion.h3 layoutId={`title ${pathId}`}>
                                    {game.name}
                                </motion.h3>
                                <p>Rating: {game.rating}</p>
                            </div>
                            <Info>
                                <h3>Platforms</h3>
                                <Platforms>
                                    {game.platforms.map((data) => (
                                        <Platform key={data.platform.id}>
                                            <img
                                                src={getPlatform(
                                                    data.platform.name
                                                )}
                                                alt={data.platform.name}
                                            ></img>
                                            <h3 class="platform-name">
                                                {data.platform.name}
                                            </h3>
                                        </Platform>
                                    ))}
                                </Platforms>
                            </Info>
                        </Stats>
                        <Media>
                            <motion.img
                                layoutId={`image ${pathId}`}
                                src={smallImage(game.background_image, 1280)}
                                alt="preview"
                            />
                        </Media>
                        <Description>
                            <p>{game.description_raw}</p>
                        </Description>
                        <Gallery>
                            {screen.results.map((screen) => {
                                return (
                                    <img
                                        src={smallImage(screen.image, 1280)}
                                        key={screen.id}
                                        alt="screenshot"
                                    />
                                );
                            })}
                        </Gallery>
                    </Detail>
                </CardShadow>
            )}
        </>
    );
};

const CardShadow = styled(motion.div)`
    width: 100%;
    min-height: 100vh;
    overflow-y: scroll;
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 4;
    &::-webkit-scrollbar {
        width: 0.5rem;
    }
    &::-webkit-scrollbar-thumb {
        background-color: lightgrey;
    }
    &::-webkit-scrollbar-track {
        background-color: white;
    }
`;

const Detail = styled(motion.div)`
    width: 80%;
    border-radius: 1rem;
    padding: 2rem 5rem;
    background: white;
    position: absolute;
    left: 10%;
    color: black;
    z-index: 5;
    img {
        width: 100%;
    }
`;

const Stats = styled(motion.div)`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const Info = styled(motion.div)`
    text-align: center;
`;

const Platforms = styled(motion.div)`
    display: flex;
    justify-content: space-evenly;
    text-align: center;
    align-items: flex-end;
`;

const Platform = styled(motion.div)`
    .platform-name {
        font-size: 0.8rem;
        text-align: center;
        padding-top: 0.2rem;
    }
    img {
        width: 5rem;
        height: 100px;
        margin: auto;
    }
    margin-left: 2rem;
`;

const Media = styled(motion.div)`
    margin-top: 5rem;
    img {
        width: 100%;
    }
`;

const Description = styled(motion.div)`
    margin: 5rem 0rem;
`;

const Gallery = styled(motion.div)`
    img {
        margin-bottom: 3rem;
    }
`;

export default GameDetail;
