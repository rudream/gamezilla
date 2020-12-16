import styled from "styled-components";
import { motion } from "framer-motion";

export const StyledForm = styled(motion.form)`
    height: 70vh;
    width: 50vw;
    box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.2);
    text-align: left;
    border-radius: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    margin: 6vh auto auto auto;
    padding: 3rem 0rem;
    h1 {
        margin-bottom: 2rem;
    }
    label {
        flex-direction: column;
        font-size: 1rem;
        padding-bottom: 0rem;
        text-align: left;
        margin-bottom: 1rem;
        font-weight: bold;
        width: 95%;
    }
    div {
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: flex-start;
    }
    input {
        box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
        outline: none;
        border: none;
        border-radius: 1rem;
        font-family: "Montserrat", sans-serif;
        font-weight: lighter;
        font-size: 1rem;
        padding: 1rem 1rem;
        width: 25vw;
    }
    button {
        font-size: 1.5vh;
        border: none;
        padding: 1.5vh 1vw;
        font-size: 2vh;
        cursor: pointer;
        width: 10vw;
        height: 8vh;
        background: #2d87e0;
        color: white;
        font-family: "Montserrat", sans-serif;
        border-radius: 1rem;
        box-shadow: 0 0px 20px rgba(0, 0, 0, 0.2);
        outline: none;
        text-align: center;
        transition: all 0.3s ease-in-out;
    }
    button:hover {
        background: #035fbb;
    }
    .buttons {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        width: 25vw;
        margin-top: 1rem;
    }
    a {
        color: #035fbb;
    }
`;
