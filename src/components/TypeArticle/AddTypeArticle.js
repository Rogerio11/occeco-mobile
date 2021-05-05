import React, { useState } from 'react';
import { Button, Overlay, Input, Icon, Text } from 'react-native-elements';
import {useDispatch} from "react-redux";
import { View } from 'react-native';
import {createTypeArticle} from "../../actions/TypeArticleActions";
import DropDownPicker from 'react-native-dropdown-picker';
import iconList from '../../iconList';

const AddTypeArticle = ({navigation}) => {
    const initialType = { nameType: "", colorType: "", iconType: ""}
    const [newType, setNewType] = useState(initialType);
    const dispatch = useDispatch();

    const handleChange = (evt) => {
        console.log(evt)
        const { name, value } = evt;
        setNewType({...newType, [name] : value})
    }

    const handleSave = () => {
        console.log("handleSave", newType)
        dispatch(createTypeArticle(newType));
        setNewType(initialType);
        navigation.goBack();
    }


    return (
        <View>
            <Input
                placeholder="Nom"
                value={newType.nameType}
                onChangeText={(evt) => handleChange({name: "nameType", value: evt})}
                leftIcon={
                    <Icon
                        name='pencil'
                        type="ionicon"
                        size={24}
                        color='gray'
                    />
                }
            />
            <Text>Icône associée :</Text>
            <DropDownPicker
                items={iconList}
                defaultValue={iconList[0].value}
                containerStyle={{height: 40}}
                style={{backgroundColor: '#fafafa'}}
                itemStyle={{
                    justifyContent: 'flex-start'
                }}
                dropDownStyle={{backgroundColor: '#fafafa'}}
                onChangeItem={item => handleChange({ name: "iconType", value: item.value })}
            />
            <Input
                placeholder="Couleur"
                value={newType.colorType}
                onChangeText={(evt) => handleChange({name:"colorType", value: evt})}
                leftIcon={
                    <Icon
                        name='color-palette'
                        type="ionicon"
                        size={24}
                        color='gray'
                    />
                }
            />
            <Text>La couleur doit être au format hexadécimal</Text>
            <Text>Appuyer "https://htmlcolorcodes.com/fr/" pour convertir dans le bon format</Text>
            <Button title="Sauvegarder" onPress={handleSave} />
            
        </View>
    );
};

export default AddTypeArticle;