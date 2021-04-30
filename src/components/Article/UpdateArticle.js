import React, { useState } from 'react';
import { Button, Input} from 'react-native-elements';
import {useDispatch} from "react-redux";
import { View} from 'react-native';
import {updateArticle} from "../../actions/ArticleActions";

const UpdateArticleScreen = ({ navigation, route}) => {
    
    const article = route.params.article;

    const initialArticle = { 
        _id: article._id, 
        articleTitle: article.articleTitle,
        articleLink: article.articleLink, 
        articleDescription: article.articleDescription
    }
    
    const [articleUpdate, setArticleUpdate] = useState(initialArticle);
    const dispatch = useDispatch();

    const handleChange = (evt) => {
        const { name, value } = evt;
        setArticleUpdate({...articleUpdate, [name] : value})
    }

    const handleUpdate = () => {
        console.log("update article = ", articleUpdate)
        dispatch(updateArticle(articleUpdate));
        navigation.goBack()
    }


    return (
        <View>

            <Input
                placeholder="Titre"
                value={articleUpdate.articleTitle}
                onChangeText={(evt) => handleChange({name: "articleTitle", value: evt})}
            />
            <Input
                placeholder="Description"
                value={articleUpdate.articleDescription}
                onChangeText={(evt) => handleChange({name: "articleDescription", value: evt})}
            />
            <Input
                placeholder="Source"
                value={articleUpdate.articleLink}
                onChangeText={(evt) => handleChange({name: "articleLink", value: evt})}
            />
            
            <Button title="Sauvegarder" onPress={handleUpdate} />

        </View>
    );
};

export default  UpdateArticleScreen;