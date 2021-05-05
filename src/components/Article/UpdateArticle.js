import React, { useState } from 'react';
import { Button, Input, CheckBox} from 'react-native-elements';
import {useDispatch, useSelector} from "react-redux";
import { View, Text, Modal, Pressable, StyleSheet} from 'react-native';
import {updateArticle} from "../../actions/ArticleActions";
import {getAllTypes} from "../../actions/TypeArticleActions";
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
moment.updateLocale('fr');

const UpdateArticleScreen = ({ navigation, route}) => {
    const initialArticle = route.params.article;
    console.log(initialArticle)
    const [articleUpdate, setArticleUpdate] = useState(initialArticle);
    const [modalVisible, setModalVisible] = useState(false);
    const [msgModal, setMsgModal] = useState("");
    const dispatch = useDispatch();
    const list = useSelector(state => state.TypeArticle);
    const [listType, setListType] = useState(Array.isArray(list.typesArticle) ? list.typesArticle : []);

    if (listType.length === 0 ){
        dispatch(getAllTypes());
        setListType(useSelector(state => state.TypeArticle))
    }

    const handleChange = (evt) => {
        const { name, value } = evt;
        setArticleUpdate({...articleUpdate, [name]: value});
    }

    const changeCategories = (type) => {
        const value = articleUpdate.articleCategories.some(t => t._id === type._id);
        
        handleChange({
          name: 'articleCategories',
          value: value ? articleUpdate.articleCategories.filter(t => t._id !== type._id) : [...articleUpdate.articleCategories, type]
        })
    }

    const handleUpdate = () => {
        console.log("saveArticle : ", articleUpdate);
        
        if(moment(articleUpdate.articleStartDate, 'DD-MM-YYYY').isAfter(moment(articleUpdate.articleEndDate, 'DD-MM-YYYY'))){
            setMsgModal("date d'entrée superieur à date finale")
            setModalVisible(true)
        }else if((moment(articleUpdate.articleEndDate, 'DD-MM-YYYY')).isAfter(moment(articleUpdate.articleStartDate, 'DD-MM-YYYY').add(31, 'day'))){
            setMsgModal("date finale superieur à date d'entrée + 31")
            setModalVisible(true)
        }else{
            dispatch(updateArticle(articleUpdate));
            navigation.goBack();
        } 
    }

    return (
        <View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>{msgModal}</Text>
                        <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => setModalVisible(!modalVisible)}
                        >
                        <Text style={styles.textStyle}>Fermé</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>

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
            <Text>Catégories concernées :</Text>
            {listType.map(t =>
                <CheckBox
                    key={t._id}
                    title={t.nameType}
                    checked={articleUpdate.articleCategories.some(type => t._id === type._id)}
                    onPress={() => changeCategories(t)}
                />)

            }
            <Text>Date de début</Text>
            <DatePicker
                date={moment(articleUpdate.articleStartDate,"DD-MM-YYYY").toDate()} // Initial date from state
                mode="date" // The enum of date, datetime and time
                placeholder="select date"
                format="DD-MM-YYYY"
                minDate={moment().toDate()}
                confirmBtnText="Valider"
                cancelBtnText="Annuler"
                customStyles={{
                    dateIcon: {
                    //display: 'none',
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0,
                    },
                    dateInput: {
                    marginLeft: 36,
                    },
                }}
                useNativeDriver='false'
                onDateChange={(evt) => handleChange({name: "articleStartDate", value: moment(evt,"DD-MM-YYYY").toDate()})}
            />
            <Text>Date de fin</Text>
            <DatePicker

                date={moment(articleUpdate.articleEndDate, "DD-MM-YYYY").toDate()} // Initial date from state
                mode="date" // The enum of date, datetime and time
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                placeholder="select date"
                format="DD-MM-YYYY"
                minDate={moment(articleUpdate.articleStartDate, "DD-MM-YYYY").add(1, 'day').toDate()}
                maxDate={moment(articleUpdate.articleStartDate, "DD-MM-YYYY").add(31, 'day').toDate()}
                confirmBtnText="Valider"
                cancelBtnText="Annuler"
                customStyles={{
                    dateIcon: {
                    //display: 'none',
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0,
                    },
                    dateInput: {
                    marginLeft: 36,
                    },
                }}

                onDateChange={(date) => handleChange({name: "articleEndDate", value: moment(date,"DD-MM-YYYY").toDate()})}
            />
            
            <Button title="Sauvegarder" onPress={handleUpdate} />

        </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    buttonOpen: {
      backgroundColor: "#F194FF",
    },
    buttonClose: {
      backgroundColor: "#2196F3",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    },
  });

export default  UpdateArticleScreen;