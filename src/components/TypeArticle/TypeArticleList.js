import React, {useState} from 'react';
import { View } from 'react-native';
import {useDispatch, useSelector} from "react-redux";
import {getAllTypes, deleteTypeArticle} from "../../actions/TypeArticleActions";
import { ListItem, Button, FAB, Icon } from 'react-native-elements';
import AddTypeArticle from './AddTypeArticle';
import UpdateTypeArticle from './UpdateTypeArticle';

const TypeArticleList = ({navigation}) => {
    const dispatch = useDispatch();
    const list = useSelector(state => state.TypeArticle);
    const [addType, setAddType] = useState(false);
    const [listType, setListType] = useState(Array.isArray(list.typesArticle) ? list.typesArticle : []);
    const [editType, setEditType] = useState(false);
    
    
    if (listType.length === 0 ){
        dispatch(getAllTypes());
        setListType(useSelector(state => state.TypeArticle))
    }

    const handleDelete = (id) => {
        dispatch(deleteTypeArticle(id))
    }
    
    console.log(listType)
    return (
    <View>
        <Button
            title="Nouveau"
            onPress={() => setAddType(true)}
        />

        {addType &&  <AddTypeArticle handleClose={() => setAddType(false)}/> }
        {editType &&  <UpdateTypeArticle initialType={editType} handleClose={() => setEditType(false)}/> }

        { Array.isArray(listType) &&
          listType.map(l => (
            <ListItem key={l._id} bottomDivider>
                <Icon name={l.iconType} color={l.colorType} type="material-community" />
                <ListItem.Content>
                    <ListItem.Title>{l.nameType}</ListItem.Title>
                </ListItem.Content>
                <Icon name="pencil" color="gray" type="material-community" onPress={() => setEditType(l)}/>
                <Icon name="delete" color="red" type="material-community" onPress={() => handleDelete(l._id)}/>
                
            </ListItem>
          ))
        }
      </View>
      )
}

export default TypeArticleList;
