import React, {useState} from 'react';
import { View } from 'react-native';
import {useDispatch, useSelector} from "react-redux";
import {getAllTypes} from "../../actions/TypeArticleActions";
import { ListItem, Button } from 'react-native-elements';
import AddTypeArticle from './AddTypeArticle'

const TypeArticleList = ({navigation}) => {
    const dispatch = useDispatch();
    const list = useSelector(state => state.TypeArticle);
    const [addType, setAddType] = useState(false);
    const [listType, setListType] = useState(Array.isArray(list.typesArticle) ? list.typesArticle : []);

    
    if (listType.length === 0){
        dispatch(getAllTypes());
        setListType(useSelector(state => state.TypeArticle))
    }
    

    return (
    <View>
        <Button
            title="Nouveau"
            onPress={() => setAddType(true)}
        />

        {addType &&  <AddTypeArticle handleClose={() => setAddType(false)}/> }

        {
          listType.map((l, i) => (
            <ListItem key={i} bottomDivider>
              <ListItem.Content>
                <ListItem.Title>{l.nameType}</ListItem.Title>
              </ListItem.Content>
            </ListItem>
          ))
        }
      </View>
      )
}

export default TypeArticleList;
