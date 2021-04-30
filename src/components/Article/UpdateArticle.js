import React, { useState } from 'react';
import { Button, Input} from 'react-native-elements';
import {useDispatch} from "react-redux";
import { View} from 'react-native';
import {updateArticle} from "../../actions/ArticleActions";

const UpdateArticleScreen = ({ navigation, route}) => {
    console.log("////////////params/////////")
    console.log(route.params)
    console.log("/////////////////////")
    const article = route.params.article;
    var _id = "";
    var articleTitle = "";
    var articleLink = "";
    var articleDescription = "";


    if(article){
        console.log("///////l'id de l'article")
        console.log(article._id)
        console.log("/////////////////////")
        _id = article._id;
        articleTitle = article.articleTitle;
        articleLink = article.articleLink;
        articleDescription = article.articleDescription;
    }
    const initialArticle = { 
        _id: _id, 
        articleTitle: articleTitle,
        articleLink: articleLink, 
        articleDescription: articleDescription
    }
    
    const [articleUpdate, setArticleUpdate] = useState(initialArticle);
    const dispatch = useDispatch();

    const handleChange = (evt) => {
        const { name, value } = evt;
        setArticleUpdate({...articleUpdate, [name] : value})
    }

    const handleUpdate = () => {
        console.log("///////dans le handle Update///////")
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