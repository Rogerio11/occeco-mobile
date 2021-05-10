import React from 'react';
import { Button, Overlay, Text, Divider } from 'react-native-elements';
import {useDispatch} from "react-redux";
import { View} from 'react-native';
import {deleteArticle} from "../../actions/ArticleActions";


const DeleteArticle = ({navigation, route }) => {
    const { handleClose, idArticle } = route.params
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
        navigation.navigate('Liste Article')
    }


    return (
        <View>
            <Overlay isVisible={true} onBackdropPress={handleClose} style={{ minWidth: '50%' }}>
            <Text h4>Voulez-vous vraiment supprimer cet article ?</Text>
            <Divider />
            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <Button title="Oui" onPress={handleOui} style={{ minWidth: '48%' }}/>
                
                <Button title="Non" onPress={handleNon} style={{ minWidth: '48%' }}/>
                
            </View>
            
            </Overlay>
        </View>
    );
};

export default DeleteArticle;