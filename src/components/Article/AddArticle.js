import React, { useState } from 'react';
import { Button, Input, CheckBox, Card, Text} from 'react-native-elements';
import {useDispatch, useSelector} from "react-redux";
import { View, Modal, StyleSheet, Pressable} from 'react-native';
import {createArticle} from "../../actions/ArticleActions";
import {getAllTypes} from "../../actions/TypeArticleActions";
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
import MapViewScreen from '../User/MapView';
import formatMoments from '../formatMoments';
moment.updateLocale('fr');

const AddArticleScreen = ({ navigation }) => {
    
    const initialArticle = {  
        articleTitle: "",
        articleLink: "", 
        articleDescription: "",
        articleStartDate: moment().set({'hour': 8, 'minutes':0}),
        articleEndDate: moment().set({'hour': 8, 'minutes':0}).add(1, 'day'),
        articleCategories: [], 
        articleLocalisation: null,
        articleDateEvent: moment().set({'hour': 8, 'minutes':0}),
        isEvent: false,

    }

    const [newArticle, setNewArticle] = useState(initialArticle);
    const [modalVisible, setModalVisible] = useState(false);
    const [msgModal, setMsgModal] = useState("");
    const dispatch = useDispatch();
    const list = useSelector(state => state.TypeArticle);
    const [listType, setListType] = useState(Array.isArray(list.typesArticle) ? list.typesArticle : []);

    const [addLocalisation, setLocalisation] = useState(false);


    if (listType.length === 0 ){
        dispatch(getAllTypes());
        setListType(useSelector(state => state.TypeArticle))
    }
    
    const handleChange = (evt) => {
        const { name, value } = evt;
        setNewArticle({...newArticle, [name]: value});
    }

    const toggleIsEvent = () =>{
        const value = newArticle.isEvent ? false : true;
        setNewArticle({...newArticle, ["isEvent"]: value});
    }

    const handleSave = () => {

        console.log("saveArticle : ", newArticle);
        
        if(moment(newArticle.articleStartDate, formatMoments).isAfter(moment(newArticle.articleEndDate, formatMoments))){
            setMsgModal("La date de début est après la date de fin de notification.\n Merci de bien vouloir modifier les dates. ")
            setModalVisible(true)
        }else if((moment(newArticle.articleEndDate, formatMoments)).isAfter(moment(newArticle.articleStartDate, formatMoments).add(31, 'day'))){
            setMsgModal("La durée maximale d'une notification est d'1 mois. \n Merci de bien vouloir modifier les dates.")
            setModalVisible(true)
        }else{
            dispatch(createArticle(newArticle));
            setNewArticle(initialArticle);
            navigation.navigate("Liste Article");
        //     console.log("%%%%%%%%%%%%%%%")
        // console.log(newArticle)
        // console.log(moment(newArticle.articleStartDate).format('DD-MM-YYYY'))
        // console.log(moment(newArticle.articleDateEvent).format('DD-MM-YYYY'))
        // console.log(moment(newArticle.articleEndDate).format('DD-MM-YYYY'))
        // console.log("%%%%%%%%%%%%%%%")
        } 
    }

    const changeCategories = (type) => {
        const value = newArticle.articleCategories.some(t => t === type._id);
        handleChange({
          name: 'articleCategories',
          value: value ? newArticle.articleCategories.filter(t => t !== type._id) : [...newArticle.articleCategories, type._id]
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
                value={newArticle.articleTitle}
                onChangeText={(evt) => handleChange({name: "articleTitle", value: evt})}
            />
            <Input
                placeholder="Description"
                value={newArticle.articleDescription}
                onChangeText={(evt) => handleChange({name: "articleDescription", value: evt})}
            />
            <Input
                placeholder="Source"
                value={newArticle.articleLink}
                onChangeText={(evt) => handleChange({name: "articleLink", value: evt})}
            />
            <Text>Catégories concernées :</Text>
            {listType.map(t =>
                <CheckBox
                    key={t._id}
                    title={t.nameType}
                    checked={newArticle.articleCategories.some(type => t._id === type)}
                    onPress={() => changeCategories(t)}
                />)

            }
            <Text>Date de début</Text>
            <DatePicker

                date={moment(newArticle.articleStartDate,formatMoments).toDate()} // Initial date from state
                mode="datetime" // The enum of date, datetime and time
                placeholder="select date"
                format="DD-MM-YYYY HH:mm"
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
                    title="Est-ce un évènement ?"
                    checked={newArticle.isEvent}
                    onPress={() => toggleIsEvent()}
                />

        {
            newArticle.isEvent &&
            <View>
            <Text>Date Event</Text>
            <DatePicker

                date={ moment(newArticle.articleDateEvent).format(formatMoments)} // Initial date from state
                mode="datetime" // The enum of date, datetime and time
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                placeholder="select date"
                format="DD-MM-YYYY HH:mm"
                minDate={moment(moment(newArticle.articleStartDate).add(-1, 'day').toDate()).format(formatMoments)}
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

                date={moment(newArticle.articleEndDate, formatMoments).toDate()} // Initial date from state
                mode="datetime" // The enum of date, datetime and time
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                placeholder="select date"
                format="DD-MM-YYYY HH:mm"
                minDate={moment(newArticle.articleStartDate, formatMoments).add(1, 'day').toDate()}
                maxDate={moment(newArticle.articleStartDate, formatMoments).add(31, 'day').toDate()}
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
            <CheckBox
                title="Ajouter localisation ?"
                checked={addLocalisation}
                onPress={() => setLocalisation(!addLocalisation)}
            />
            {
                addLocalisation && <MapViewScreen changeLocalisation={(evt) => handleChange({name:'articleLocalisation', value: evt})} localisation={{lat: newArticle.articleLocalisation.lat, lng:newArticle.articleLocalisation.lng}}/>
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

  

export default AddArticleScreen;