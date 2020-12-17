import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import logo from "../img/logo.svg";
import { fetchSearch } from "../actions/gamesAction";
import { useDispatch, useSelector } from "react-redux";
import { fadeIn } from "../animations";
import { Link, useHistory } from "react-router-dom";
import book from "../img/library.svg";
import { signOut, setSignedIn } from "../actions/authActions";
import { useFirebase, useFirestoreConnect } from "react-redux-firebase";

const Nav = () => {
    const firebase = useFirebase();
    const dispatch = useDispatch();
    const history = useHistory();
    const [textInput, setTextInput] = useState("");
    const { uid } = useSelector((state) => state.firebase.auth);
    useFirestoreConnect({
        collection: `users/${uid}/library`,
        storeAs: "library",
    });

    useEffect(() => {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                dispatch(setSignedIn(true));
            } else {
                dispatch(setSignedIn(false));
            }
        });
    }, [firebase, dispatch]);

    const { isSignedIn } = useSelector((state) => state.auth);

    const inputHandler = (e) => {
        setTextInput(e.target.value);
    };

    const submitSearchHandler = (e) => {
        e.preventDefault();
        dispatch(fetchSearch(textInput));
        setTextInput("");
        history.push("/");
    };

    const clearSearched = () => {
        dispatch({ type: "CLEAR_SEARCHED" });
        history.push("/");
    };

    const signOutHandler = () => {
        dispatch(signOut());
        history.push("/");
    };

    return (
        <StyledNav variants={fadeIn} initial="hidden" animate="show">
            <LogoAndSearch>
                <Logo onClick={clearSearched}>
                    <img src={logo} alt="dinosaur logo" />
                    <h1>GameZilla</h1>
                </Logo>
                <form onSubmit={submitSearchHandler} className="search">
                    <input
                        value={textInput}
                        onChange={inputHandler}
                        type="text"
                    />
                    <button type="submit">Search</button>
                </form>
            </LogoAndSearch>
            {!isSignedIn ? (
                <RightNavLoggedOut>
                    <Link to="/login">
                        <NavButton id="login-button">Login</NavButton>
                    </Link>
                    <Link to="/signup">
                        <NavButton id="signup-button">Sign Up</NavButton>
                    </Link>
                </RightNavLoggedOut>
            ) : (
                <RightNavLoggedIn>
                    <Link to="/library">
                        <NavButton id="library-button">
                            <img src={book} alt="library icon" />
                        </NavButton>
                    </Link>
                    <NavButton onClick={signOutHandler} id="signout-button">
                        Log Out
                    </NavButton>
                </RightNavLoggedIn>
            )}
        </StyledNav>
    );
};

const StyledNav = styled(motion.nav)`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    padding: 0rem 0rem;
    text-align: center;
    box-shadow: 0px 20px 20px rgba(0, 0, 0, 0.1);
    height: 15vh;
    margin: 0rem 0rem;
    background-color: orange;
    max-width: 100vw;
    h1 {
        font-size: 2rem;
        margin-left: 1rem;
        width: 13vw;
    }
    input {
        font-size: 1vw;
        padding: 1vw 1.5vw;
        max-height: 8vh;
        max-width: 25vw;
        border: none;
        box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
        outline: none;
        border-radius: 1rem 0rem 0rem 1rem;
        font-family: "Montserrat", sans-serif;
        margin-left: 5rem;
    }
    button {
        font-size: 1vw;
        border: none;
        padding: 1vw 1.5vw;
        cursor: pointer;
        max-height: 8vh;
        max-width: 8vw;
        background: #2d87e0;
        color: white;
        font-family: "Montserrat", sans-serif;
        border-radius: 0rem 1rem 1rem 0rem;
        box-shadow: 0 0px 20px rgba(0, 0, 0, 0.2);
        outline: none;
        text-align: center;
        transition: all 0.3s ease-in-out;
    }
    button:hover {
        background: #035fbb;
    }
    @media screen and (max-width: 768px) {
        height: 10vh;
        h1 {
            display: none;
            margin: 2vh auto;
            padding: 2vh auto;
        }
        input {
            min-width: 40vw;
            font-size: 2.5vw;
            margin: 0rem 0rem;
            min-height: 5vh;
            padding: 1vh 1vw;
        }
        button {
            min-width: 12vw;
            min-height: 5vh;
            font-size: 2.5vw;
            padding: 1vh 1vw;
        }
    }
`;

const Logo = styled(motion.div)`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    cursor: pointer;
    margin: 0rem 0rem;
    img {
        height: 12vh;
    }
    h1 {
        font-size: 3vw;
    }
    @media screen and (max-width: 768px) {
        img {
            display: none;
        }
    }
`;

const LogoAndSearch = styled(motion.div)`
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding-left: 0;
    margin: 0rem 0rem;
    flex-grow: 3;
    @media screen and (max-width: 768px) {
        justify-content: flex-start;
        min-width: 60vw;
    }
`;

const RightNavLoggedOut = styled(motion.div)`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    flex-grow: 3;
`;

const RightNavLoggedIn = styled(motion.div)`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    flex-grow: 3;
    #library-button {
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        margin: 0rem 0rem;
    }
    img {
        height: 7vh;
    }
`;

const NavButton = styled(motion.div)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-family: "Montserrat", sans-serif;
    font-weight: bold;
    font-size: 2vw;
    height: 15vh;
    flex-grow: 1;
    width: 15vw;
    cursor: pointer;
    padding: auto;
    :hover {
        background-color: #ffc65c;
    }
    transition: all 0.3s ease-in-out;
    @media screen and (max-width: 768px) {
        font-size: 3vw;
        height: 10vh;
    }
`;

export default Nav;
