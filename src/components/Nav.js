import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import logo from "../img/logo.svg";
import { fetchSearch } from "../actions/gamesAction";
import { useDispatch } from "react-redux";
import { fadeIn } from "../animations";
import { Link } from "react-router-dom";

const Nav = () => {
    const dispatch = useDispatch();
    const [textInput, setTextInput] = useState("");

    const inputHandler = (e) => {
        setTextInput(e.target.value);
    };

    const submitSearchHandler = (e) => {
        e.preventDefault();
        dispatch(fetchSearch(textInput));
        setTextInput("");
    };

    const clearSearched = () => {
        dispatch({ type: "CLEAR_SEARCHED" });
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
            <LoginLoggedOut>
                <Link to="/login">
                    <h2 id="login-button">Login</h2>
                </Link>
            </LoginLoggedOut>
        </StyledNav>
    );
};

const StyledNav = styled(motion.nav)`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0rem 0rem;
    text-align: center;
    box-shadow: 0px 20px 20px rgba(0, 0, 0, 0.1);
    height: 15vh;
    margin: 0rem 0rem;
    background-color: orange;
    h1 {
        font-size: 2rem;
        margin-left: 1rem;
    }
    input {
        font-size: 2.5vh;
        padding: 2.5vh 2vw;
        max-height: 8vh;
        width: 30vw;
        border: none;
        box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
        outline: none;
        border-radius: 1rem 0rem 0rem 1rem;
        font-family: "Montserrat", sans-serif;
        margin-left: 5rem;
    }
    button {
        font-size: 2.5vh;
        border: none;
        padding: 2.5vh 2vw;
        font-size: 2.5vh;
        cursor: pointer;
        width: 10vw;
        max-height: 8vh;
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
`;

const Logo = styled(motion.div)`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    cursor: pointer;
    margin: 0rem 0rem;
    img {
        width: 7vw;
    }
    h1 {
        font-size: 3vw;
    }
`;

const LogoAndSearch = styled(motion.div)`
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding-left: 0;
    margin: 0rem 0rem;
`;

const LoginLoggedOut = styled(motion.div)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    #login-button {
        font-family: "Montserrat", sans-serif;
        font-weight: bold;
        font-size: 2rem;
    }
    cursor: pointer;
    height: 15vh;
    width: 20vw;
    :hover {
        background-color: #ffc65c;
    }
    transition: all 0.3s ease-in-out;
`;

export default Nav;
