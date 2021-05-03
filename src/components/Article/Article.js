import React, { useState } from 'react';
import { Button, Input} from 'react-native-elements';
import {useDispatch} from "react-redux";
import { View} from 'react-native';

const ArticleScreen = ({ navigation, route}) => {
    console.log("////////////params/////////")
    console.log(route.params)
    console.log("/////////////////////")
    const article = route.params.article;
    


    return (
        <View>

            <Text>{article.articleTitle}</Text>
            <Text>{article.articleDescription}</Text>
            <Text>{article.articleLink}</Text>
            

        </View>
    );
};

export default  ArticleScreen;