import React, { useState } from 'react';
import { Button, Input} from 'react-native-elements';
import {useDispatch} from "react-redux";
import { View} from 'react-native';
import {createArticle} from "../../actions/ArticleActions";

const AddArticleScreen = ({ navigation }) => {
    const initialArticle = {  
        articleTitle: "",
        articleLink: "", 
        articleDescription: ""
    }
    const [newArticle, setNewArticle] = useState(initialArticle);
    const dispatch = useDispatch();

    const handleChange = (evt) => {
        const { name, value } = evt;
        setNewArticle({...newArticle, [name] : value})
    }

    const handleSave = () => {
        console.log("saveArticle : ", newArticle)
        dispatch(createArticle(newArticle));
        setNewArticle(initialArticle);
        navigation.goBack()
    }


    return (
        <View>

            <Input
                placeholder="Titre"
                value={newArticle.articleTitle}
                onChangeText={(evt) => handleChange({name: "articleTitle", value: evt})}
            />
            <Input
                placeholder="Description"
                value={newArticle.articleDescription}
                onChangeText={(evt) => handleChange({name: "articleDescription", value: evt})}
            />
            <Input
                placeholder="Source"
                value={newArticle.articleLink}
                onChangeText={(evt) => handleChange({name: "articleLink", value: evt})}
            />
            
            <Button title="Sauvegarder" onPress={handleSave} />

        </View>
    );
};

export default AddArticleScreen;