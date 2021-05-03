import React, {useState} from 'react';

import { View, FlatList, TouchableHighlight } from 'react-native';
import {useDispatch, useSelector} from "react-redux";
import {getAllArticles} from "../../actions/ArticleActions";
import { Text, Icon, Card, SpeedDial, useTheme } from 'react-native-elements';


function ListArticleScreen({ navigation }) {
  const user = useSelector(state => state.User)
  const dispatch = useDispatch();
  const list = useSelector(state => state.Article);
  const [listArticle, setListArticle] = useState(Array.isArray(list.articles) ? list.articles : []);
  const [open, setOpen] = useState(false);
  const { theme } = useTheme();
  if (listArticle.length && listArticle.length === 0 ){
    dispatch(getAllArticles());
    setListArticle(useSelector(state => state.articles))
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
      <Card containerStyle={{width: '100%', height:'100%'}}>
        {
          listArticle.length === 0
          ? <View style={{width: '100%', height:'100%'}}>
              <Text>Pas d'articles à afficher</Text>
            </View>
          :
          <View style={{width: '100%', height:'97%'}}>
            <FlatList
              data={listArticle}
              keyExtractor={(item) => item._id}
              renderItem={({item, index, separators}) => 
              <TouchableHighlight
                key={item._id}
                onPress={() => navigation.push('Article', {article: item})}
                onShowUnderlay={separators.highlight}
                onHideUnderlay={separators.unhighlight}
                >
                <View style={{ flexDirection: "row", justifyContent:'space-between', backgroundColor:(index%2 === 0 ? theme.colors.secondary : 'white')}}>
                    <Text h4>{item.articleTitle}</Text>
                    <Icon name="chevron-right" type="material-community" onPress={() => navigation.push('Article', {article: item})}/>
                </View>
              </TouchableHighlight>
              }
            />
          </View>
      }
      {
        user && user.user && (user.user.accountType === "admin" || user.user.accountType === "partner") &&
        <View style={{width: '100%', height:'3%'}}>
          <SpeedDial
            isOpen={open}
            icon={{ name: 'edit', color: 'white' }}
            openIcon={{ name: 'close', color: 'white' }}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            buttonStyle={{backgroundColor:'green', position:'relative'}}
            
          >
            <SpeedDial.Action
              icon={{ name: 'add', color: 'white' }}
              title="Nouvel article"
              onPress={() => navigation.push('Add Article')}
              buttonStyle={{backgroundColor:'green'}}
            />
            <SpeedDial.Action
              icon={{ name: 'visibility', color: 'white' }}
              title="Voir catégories"
              onPress={() => navigation.push('Catégories')}
              buttonStyle={{backgroundColor:'green'}}
            />
          </SpeedDial>
        </View>
      }
      </Card>
    </View>
    
  );
}

export default ListArticleScreen;