import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useFirestore } from "react-redux-firebase";
import styled from "styled-components";
import { motion } from "framer-motion";
import add from "../img/add.svg";
import checkmark from "../img/checkmark.svg";
import remove from "../img/remove.svg";
import { useLocation, useHistory, Link } from "react-router-dom";

const LibraryButton = ({ data, alreadyIn }) => {
    const history = useHistory();
    const location = useLocation();

    const firestore = useFirestore();

    const [isHovering, setIsHovering] = useState(false);

    const hoverHandler = (hovering) => {
        setIsHovering(hovering);
    };

    const { uid } = useSelector((state) => state.firebase.auth);
    const { isSignedIn } = useSelector((state) => state.auth);

    const addToLibraryHandler = () => {
        firestore
            .collection("users")
            .doc(uid)
            .collection("library")
            .doc(data.id.toString())
            .set({ ...data });
    };

    const removeFromLibraryHandler = () => {
        firestore
            .collection("users")
            .doc(uid)
            .collection("library")
            .doc(data.id.toString())
            .delete()
            .then(() => {
                if (location.pathname.split("/")[1] === "library") {
                    document.body.style.overflow = "auto";
                    history.push("/library");
                }
            });
    };

    const redirectToLogin = () => {
        document.body.style.overflow = "auto";
    };

    return (
        <>
            {isSignedIn ? (
                <>
                    {alreadyIn && !isHovering ? (
                        <Button
                            onMouseEnter={() => hoverHandler(true)}
                            onMouseLeave={() => hoverHandler(false)}
                        >
                            <img
                                onClick={removeFromLibraryHandler}
                                src={checkmark}
                                alt="already in library"
                            />
                            <h3>This game is in your library</h3>
                        </Button>
                    ) : isHovering ? (
                        <Button
                            onClick={removeFromLibraryHandler}
                            onMouseEnter={() => hoverHandler(true)}
                            onMouseLeave={() => hoverHandler(false)}
                        >
                            <img src={remove} alt="remove from library" />
                            <h3>Remove from library</h3>
                        </Button>
                    ) : (
                        <Button onClick={addToLibraryHandler}>
                            <img src={add} alt="add to library" />
                            <h3>Add to library</h3>
                        </Button>
                    )}
                </>
            ) : (
                <Link to="/login" onClick={redirectToLogin}>
                    <Button>
                        <img src={add} alt="log in to add to library" />
                        <h3>Log in to add to library</h3>
                    </Button>
                </Link>
            )}
        </>
    );
};

const Button = styled(motion.div)`
    cursor: pointer;
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    align-items: center;
    max-width: 20vw;
    h3 {
        font-size: 1rem;
    }
    img {
        margin-right: 2vw;
    }
    @media screen and (max-width: 768px) {
        max-width: 40vw;
    }
`;

export default LibraryButton;
