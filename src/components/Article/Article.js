import React, { useState } from 'react';
import { Card, Text, FAB, Divider} from 'react-native-elements';
import {useDispatch, useSelector} from "react-redux";
import { View} from 'react-native';
import DeleteArticle from "./DeleteArticle";
import moment from 'moment';

moment.updateLocale('fr');
const ArticleScreen = ({ navigation, route}) => {
    
    const article = route.params.article;
    const user = useSelector(state => state.User)
    const [deleteArticle, setDeleteArticle] = useState(false);
    const [idArticleDelete, setIdArticleDelete] = useState(null);
    const handleDelete = (id) => {
        setIdArticleDelete(id)
        setDeleteArticle(true)
      }
    return (
        <View style={{ alignItems:'center' }}>
            <Card containerStyle={{height:'100%', width:'100%'}}>
            
            <Text h3>{article.articleTitle}</Text>
            <Divider />
            <Text>{moment(article.articleStartDate).format('DD/MM/YYYY')} - {moment(article.articleEndDate).format('DD/MM/YYYY')}</Text>
            <Text>Description : {article.articleDescription}</Text>
            <Text>Lien : {article.articleLink}</Text>
            
            {deleteArticle &&  <DeleteArticle handleClose={() => setDeleteArticle(false)} idArticle={idArticleDelete}/> }

            {
              user && user.user && (user.user.accountType === "admin" || user.user.accountType === "partner") &&

              <View style={{ flexDirection: "row", justifyContent:'center' }}>
                  <FAB
                        visible={true}
                        icon={{ name: 'content-copy', color: 'white' }}
                        buttonStyle={{backgroundColor:'green'}}
                        onPress={() => navigation.push('Duplicate Article', {article: article})}
                  />
                  <Text> </Text>
                  <FAB
                      visible={true}
                      icon={{ name: 'edit', color: 'white' }}
                      buttonStyle={{backgroundColor:'gray'}}
                      onPress={() => navigation.push('Update Article', {article: article})}
                  />
                  <Text> </Text>
                  <FAB
                      visible={true}
                      icon={{ name: 'delete', color: 'white' }}
                      buttonStyle={{backgroundColor:'red'}}
                      onPress={() => handleDelete(article._id)}
                  />
                  </View>
            }
            </Card>
        </View>
    );
};

export default  ArticleScreen;