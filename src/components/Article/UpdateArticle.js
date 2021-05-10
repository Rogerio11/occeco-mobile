import React, { useState } from 'react';
import { Button, Input, CheckBox, Card, Text} from 'react-native-elements';
import {useDispatch, useSelector} from "react-redux";
import { View, Modal, StyleSheet, Pressable} from 'react-native';
import {updateArticle} from "../../actions/ArticleActions";
import {getAllTypes} from "../../actions/TypeArticleActions";
import DatePicker from 'react-native-datepicker';
import MapViewScreen from '../User/MapView'
import moment from 'moment';
import formatMoments from '../formatMoments';
moment.updateLocale('fr');

const updateArticleScreen = ({ navigation, route }) => {
    
    const initialArticle = route.params.article;
    const [updArticle, setUpdArticle] = useState(initialArticle);
    const [modalVisible, setModalVisible] = useState(false);
    const [msgModal, setMsgModal] = useState("");
    const dispatch = useDispatch();
    const list = useSelector(state => state.TypeArticle);
    const [listType, setListType] = useState(Array.isArray(list.typesArticle) ? list.typesArticle : []);
    const [addLocalisation, setLocalisation] = useState(articleUpdate.articleLocalisation);
/*

    if (listType.length === 0 ){
        dispatch(getAllTypes());
        setListType(useSelector(state => state.TypeArticle))
    }
 */   
    const handleChange = (evt) => {
        const { name, value } = evt;
        setUpdArticle({...updArticle, [name]: value});
    }

    const toggleIsEvent = () =>{
        const value = updArticle.isEvent ? false : true;
        setUpdArticle({...updArticle, ["isEvent"]: value});
    }


    const handleUpdate = () => {
        console.log("saveArticle : ", articleUpdate);
        if(moment(articleUpdate.articleStartDate, formatMoments).isAfter(moment(articleUpdate.articleEndDate, formatMoments))){
            setMsgModal("La date de début est après la date de fin de notification.\n Merci de bien vouloir modifier les dates. ")
            setModalVisible(true)
        }else if(moment(articleUpdate.articleEndDate, formatMoments).isAfter(moment(articleUpdate.articleStartDate, formatMoments).add(31, 'day'))){
            setMsgModal("La durée maximale d'une notification est d'1 mois. \n Merci de bien vouloir modifier les dates.")
            setModalVisible(true)
        }else if(updArticle.isEvent && moment(updArticle.articleDateEvent).isBefore(moment(updArticle.articleStartDate))){
            setMsgModal("La date de l'évènement est avant la date de début de notification.\n Merci de bien vouloir modifier les dates. ")
            setModalVisible(true)
        }else{
            dispatch(updateArticle(updArticle));
            setUpdArticle(initialArticle);
            navigation.goBack();
        } 
    }

    const changeCategories = (type) => {
        const value = updArticle.articleCategories.some(t => t === type._id);
        handleChange({
          name: 'articleCategories',
          value: value ? updArticle.articleCategories.filter(t => t !== type._id) : [...updArticle.articleCategories, type._id]
        })
        
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
            <Card>
            <Input
                placeholder="Titre"
                value={updArticle.articleTitle}
                onChangeText={(evt) => handleChange({name: "articleTitle", value: evt})}
            />
            <Input
                placeholder="Description"
                value={updArticle.articleDescription}
                onChangeText={(evt) => handleChange({name: "articleDescription", value: evt})}
            />
            <Input
                placeholder="Source"
                value={updArticle.articleLink}
                onChangeText={(evt) => handleChange({name: "articleLink", value: evt})}
            />
            <Text>Catégories concernées :</Text>
            {listType.map(t =>
                <CheckBox
                    key={t._id}
                    title={t.nameType}
                    checked={updArticle.articleCategories.some(type => t._id === type)}
                    onPress={() => changeCategories(t)}
                />)

            }
            <View style={{flexDirection:'row'}}>

            
            <Text>Date de début</Text>
            <DatePicker
                date={moment(articleUpdate.articleStartDate,formatMoments).toDate()} // Initial date from state
                mode="date" // The enum of date, datetime and time
                placeholder="select date"
                format="DD-MM-YYYY"
                minDate={moment()}
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
                onDateChange={(evt) => handleChange({name: "articleStartDate", value: moment(evt,formatMoments).toDate()})}
            />
            <CheckBox
                    title="evenement"
                    checked={updArticle.isEvent}
                    onPress={() => toggleIsEvent()}
                />

        {
            updArticle.isEvent &&
            <View>
            <Text>Date Event</Text>
            <DatePicker

                date={ moment(updArticle.articleDateEvent,formatMoments).toDate()} // Initial date from state
                mode="date" // The enum of date, datetime and time
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                placeholder="select date"
                format="DD-MM-YYYY"
                minDate={moment(updArticle.articleStartDate, formatMoments).add(-1, 'day').toDate()}
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

                onDateChange={(date) => handleChange({name: "articleDateEvent", value: moment(date,formatMoments).toDate()})}
            />
            </View>
      }
            
            <Text>Date de fin</Text>
            <DatePicker
                date={moment(articleUpdate.articleEndDate, formatMoments).toDate()} // Initial date from state
                mode="date" // The enum of date, datetime and time
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                placeholder="select date"
                format="DD-MM-YYYY"
                minDate={moment(articleUpdate.articleStartDate, formatMoments).add(1, 'day').toDate()}
                maxDate={moment(articleUpdate.articleStartDate, formatMoments).add(31, 'day').toDate()}
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

                onDateChange={(date) => handleChange({name: "articleEndDate", value: moment(date,formatMoments).toDate()})}
            />
            </View>
            <CheckBox
                title="Ajouter localisation ?"
                checked={addLocalisation}
                onPress={() => setLocalisation(!addLocalisation)}
            />
            {
                addLocalisation && 
                <View style={{width:'100%', height:'50%'}}>
                    <MapViewScreen changeLocalisation={(evt) => handleChange({name:'articleLocalisation', value: evt})} localisation={articleUpdate.articleLocalisation ? {lat: articleUpdate.articleLocalisation.lat, lng:articleUpdate.articleLocalisation.lng} : null}/>
                </View>
            }
            
            <Button title="Sauvegarder" onPress={handleSave} />
            </Card>
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
  

export default updateArticleScreen;