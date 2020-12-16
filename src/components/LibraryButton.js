import React from "react";
import { addToLibrary } from "../actions/libraryActions";
import { useDispatch, useSelector } from "react-redux";
import { firestoreConnect, useFirestore } from "react-redux-firebase";
import styled from "styled-components";
import { motion } from "framer-motion";
import add from "../img/add.svg";
import checkmark from "../img/checkmark.svg";
import remove from "../img/remove.svg";

const LibraryButton = ({ id }) => {
    const dispatch = useDispatch();
    const firestore = useFirestore();
    const { uid } = useSelector((state) => state.firebase.auth);

    const libraryButtonClickHandler = () => {
        dispatch(addToLibrary(id));
        firestore
            .collection("users")
            .doc(uid)
            .collection("library")
            .add({ id: id })
            .then((docRef) => {
                docRef.update({
                    gameID: docRef.id,
                });
            });
    };

    return (
        <Button>
            <img
                onClick={libraryButtonClickHandler}
                src={add}
                alt="add to library"
            ></img>
        </Button>
    );
};

const Button = styled(motion.div)`
    cursor: pointer;
`;

export default LibraryButton;
