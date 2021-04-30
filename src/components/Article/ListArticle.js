import React, {useState} from 'react';
import { View, FlatList } from 'react-native';
import {useDispatch, useSelector} from "react-redux";
import {getAllArticles} from "../../actions/ArticleActions";
import DeleteArticle from "./DeleteArticle"
import { Text, Button, } from 'react-native-elements';

function ListArticleScreen({ navigation }) {
  const user = useSelector(state => state.User)
  const dispatch = useDispatch();
  const list = useSelector(state => state.Article);
  // const [addType, setAddType] = useState(false);
  const [listArticle, setListArticle] = useState(Array.isArray(list.articles) ? list.articles : []);
  const [deleteArticle, setDeleteArticle] = useState(false);
  const [idArticleDelete, setIdArticleDelete] = useState(null);
  // const [editType, setEditType] = useState(false);
  if (listArticle.length && listArticle.length === 0 ){
    dispatch(getAllArticles());
    setListArticle(useSelector(state => state.articles))
  }

  
  const handleDelete = (id) => {
    setIdArticleDelete(id)
    setDeleteArticle(true)
  }
  const DATA = [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      articleTitle: "First Item",
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      articleTitle: "Second Item",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      articleTitle: "Third Item",
    },
  ];
  return (
    
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

      <FlatList
        data={DATA}
        keyExtractor={(item) => item._id}
        renderItem={({item}) => 
        <View>
            <Text h4>{item.articleTitle}</Text>
            
            <View style={{ flexDirection: "row" }}>
            <Button
                title="Duplicate"
                onPress={() => navigation.push('Duplicate Article', {article: item})}
            />
            <Text> </Text>
            <Button
                title="Update"
                onPress={() => navigation.push('Update Article', {article: item})}
            />
            <Text> </Text>
            <Button
                title="Delete"
                onPress={() => handleDelete(item._id)}
            />
            </View>
        </View>}
      />

      {deleteArticle &&  <DeleteArticle handleClose={() => setDeleteArticle(false)} idArticle={idArticleDelete}/> }

      {
        user && user.user && (user.user.accountType === "admin" || user.user.accountType === "partner") &&
        <View style={{ flexDirection: "row" }}>
          <Button
          title="add Article"
          onPress={() => navigation.push('Add Article')}
        />
        <Text> </Text>
        
        <Button
          title="Voir Catégories"
          onPress={() => navigation.push('Catégories')}
        />
        </View>
      }
      
      
    </View>
    
  );
}

export default ListArticleScreen;