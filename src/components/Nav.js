import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import logo from "../img/logo.svg";
import { fetchSearch } from "../actions/gamesAction";
import { useDispatch } from "react-redux";
import { fadeIn } from "../animations";

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
            <Logo onClick={clearSearched}>
                <img src={logo} alt="dinosaur logo" />
                <h1>GameZilla</h1>
            </Logo>
            <form onSubmit={submitSearchHandler} className="search">
                <input value={textInput} onChange={inputHandler} type="text" />
                <button type="submit">Search</button>
            </form>
        </StyledNav>
    );
};

const StyledNav = styled(motion.nav)`
    padding: 3rem 5rem;
    text-align: center;
    h1 {
        font-size: 2rem;
        margin-left: 1rem;
    }
    input {
        width: 30%auto;
        font-size: 1.5rem;
        padding: 1rem;
        border: none;
        margin-top: 1rem;
        box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.2);
        outline: none;
        border-radius: 1rem 0rem 0rem 1rem;
    }
    button {
        font-size: 1.5rem;
        border: none;
        padding: 1rem 2rem;
        cursor: pointer;
        background: #ee6a6a;
        color: white;
        font-family: "Montserrat", sans-serif;
        border-radius: 0rem 1rem 1rem 0rem;
        box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.2);
        outline: none;
    }
`;

const Logo = styled(motion.div)`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    cursor: pointer;
    img {
        height: 4rem;
        width: 4rem;
    }
`;

export default Nav;
