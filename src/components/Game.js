import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { loadDetail } from "../actions/detailsAction";
import { Link } from "react-router-dom";
import { smallImage } from "../util";
import { popup } from "../animations";
import { useLocation } from "react-router-dom";

//Styling and Animation

const Game = ({ name, released, id, image, genres, rating }) => {
    const location = useLocation();
    const stringPathId = id.toString();
    const dispatch = useDispatch();
    const loadDetailsHandler = () => {
        document.body.style.overflow = "hidden";
        dispatch(loadDetail(id));
    };

    const getPathToGoTo = () => {
        if (location.pathname === "/") {
            return `/game/${id}`;
        } else if (location.pathname.split("/")[1] === "library") {
            return `/library/game/${id}`;
        }
    };

    const formatGenres = (genres) => {
        const genresArray = [];
        genres.forEach((genre) => {
            genresArray.push(genre.name);
        });
        return genresArray.join(", ");
    };

    return (
        <StyledGame
            variants={popup}
            initial="hidden"
            animate="show"
            layoutId={stringPathId}
            onClick={loadDetailsHandler}
        >
            <Link to={getPathToGoTo}>
                <div className="preview-info">
                    <motion.h3 layoutId={`title ${stringPathId}`}>
                        {name}
                    </motion.h3>
                    <p>{formatGenres(genres)}</p>
                    <p>Rating: {rating !== 0 ? rating : "N/A"}</p>
                    <p>{released}</p>
                </div>
                <motion.img
                    layoutId={`image ${stringPathId}`}
                    src={smallImage(image, 1920)}
                    alt={name}
                />
            </Link>
        </StyledGame>
    );
};

const StyledGame = styled(motion.div)`
    box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.2);
    text-align: center;
    border-radius: 1rem;
    cursor: pointer;
    overflow: hidden;
    .preview-info {
        height: 35%;
        display: flex;
        justify-content: space-evenly;
        flex-direction: column;
        margin-bottom: 5%;
    }
    img {
        width: 100%;
        height: 500px;
        object-fit: cover;
    }
    p {
        margin: 0.5rem 0rem;
    }
    h3 {
        font-size: 2rem;
        padding-bottom: 0rem;
        max-width: 80%;
        text-align: center;
        margin: auto;
    }
    @media screen and (max-width: 768px) {
        height: 70vh;
        width: 70vw;
        margin: auto;
        h3 {
            font-size: 1.5rem;
        }
        p {
            font-size: 1rem;
        }
    }
`;

export default Game;
