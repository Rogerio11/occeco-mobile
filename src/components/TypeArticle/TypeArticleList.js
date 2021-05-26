import React, { useState } from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import { getAllTypes, deleteTypeArticle } from "../../actions/TypeArticleActions";
import { ListItem, Button, Icon } from 'react-native-elements';
import UpdateTypeArticle from './UpdateTypeArticle';

const TypeArticleList = ({ navigation }) => {
    const dispatch = useDispatch();
    const list = useSelector(state => state.TypeArticle);
    const [editType, setEditType] = useState(false);
    const [listType, setListType] = useState(Array.isArray(list.typesArticle) ? list.typesArticle : []);

    React.useEffect(() => {
        dispatch(getAllTypes());
    }, []);

    if (listType.length === 0) {
        dispatch(getAllTypes());
        setListType(useSelector(state => state.TypeArticle))
    }

    const handleDelete = (id) => {
        dispatch(deleteTypeArticle(id))
    }

    return (
        <View>
            <Button title="Ajouter une catégorie"
                icon={{ name: 'add', color: 'white' }}
                onPress={() => navigation.push('Create TypeArticle')} />
            {editType && <UpdateTypeArticle initialType={editType} handleClose={() => setEditType(false)} />}

            { Array.isArray(listType) &&
                listType.map(l => (
                    <ListItem key={l._id} bottomDivider>
                        {l.iconType && l.colorType && l.colorType.startsWith('#') &&
                            <Icon
                                name={l.iconType}
                                type="material-community"
                                color={l.colorType}
                            />
                        }
                        {l.iconType && (!l.colorType || l.colorType && !l.colorType.startsWith('#')) &&
                            <Icon
                                name={l.iconType}
                                type="material-community"
                            />
                        }
                        <ListItem.Content>
                            <ListItem.Title>{l.nameType}</ListItem.Title>
                        </ListItem.Content>
                        <Icon name="pencil" color="gray" type="material-community" onPress={() => setEditType(l)} />
                        <Icon name="delete" color="red" type="material-community" onPress={() => handleDelete(l._id)} />

                    </ListItem>
                ))
            }
        </View>
    )
}

export default TypeArticleList;
