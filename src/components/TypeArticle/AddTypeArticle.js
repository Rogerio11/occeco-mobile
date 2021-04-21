import React, { useState } from 'react';
import { Button, Overlay, Input } from 'react-native-elements';
import {useDispatch} from "react-redux";
import { View, Text } from 'react-native';
import {createTypeArticle} from "../../actions/TypeArticleActions";

const AddTypeArticle = ({handleClose}) => {
    const initialType = { nameType: ""}
    const [newType, setNewType] = useState(initialType);
    const dispatch = useDispatch();

    const handleSave = () => {
        console.log("handleSave", newType)
        dispatch(createTypeArticle(newType));
        setNewType(initialType);
        handleClose()
    }


    return (
        <View>
            <Overlay isVisible={true} onBackdropPress={handleClose}>
            <Text>Hello from Overlay!</Text>
            <Input
                placeholder="Nom"
                value={newType.nameType}
                onChangeText={(evt) => setNewType({nameType: evt})}
            />
            <Button title="Sauvegarder" onPress={handleSave} />
            </Overlay>
        </View>
    );
};

export default AddTypeArticle;