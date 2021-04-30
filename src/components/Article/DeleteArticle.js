import React from 'react';
import { Button, Overlay, Input, Icon } from 'react-native-elements';
import {useDispatch} from "react-redux";
import { View} from 'react-native';
import {deleteArticle} from "../../actions/ArticleActions";


const DeleteArticle = ({handleClose, idArticle}) => {
    
    const dispatch = useDispatch();

    console.log("Je suis rentré dans le delete")
    const handleNon = () => {
        console.log("Je suis dans le Non")
        handleClose()
    }

    const handleOui = () => {
        console.log("Je suis dans le Oui");
        console.log(idArticle)
        dispatch(deleteArticle(idArticle));
        handleClose()
    }


    return (
        <View>
            <Overlay isVisible={true} onBackdropPress={handleClose}>
            
            <Button title="Non" onPress={handleNon} />
            <Button title="Oui" onPress={handleOui} />
            </Overlay>
        </View>
    );
};

export default DeleteArticle;