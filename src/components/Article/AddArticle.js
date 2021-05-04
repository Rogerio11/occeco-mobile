import React, { useState } from 'react';
import { Button, Input} from 'react-native-elements';
import {useDispatch} from "react-redux";
import { View, Modal, StyleSheet, Pressable, Text} from 'react-native';
import {createArticle} from "../../actions/ArticleActions";
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
import { Value } from 'react-native-reanimated';
moment.updateLocale('fr');

const AddArticleScreen = ({ navigation }) => {
    
    const initialArticle = {  
        articleTitle: "",
        articleLink: "", 
        articleDescription: "",
        articleStartDate: moment(),
        articleEndDate: moment().add(1, 'day')
    }

    const [newArticle, setNewArticle] = useState(initialArticle);
    const [maxDateEndDate, setMaxDateEndDate] = useState(moment(newArticle.articleStartDate).add(31, 'day'));
    const [minDateEndDate, setMinDateEndDate] = useState(moment(newArticle.articleStartDate).add(1, 'day'));
    const [modalVisible, setModalVisible] = useState(false);
    const [msgModal, setMsgModal] = useState("");
    const dispatch = useDispatch();

    const handleChange = (evt) => {
        const { name, value } = evt;
        setNewArticle({...newArticle, [name]: value});
        
    }

    const handleSave = () => {
        console.log("saveArticle : ", newArticle);
        
        if(moment(newArticle.articleStartDate, 'DD-MM-YYYY').isAfter(moment(newArticle.articleEndDate, 'DD-MM-YYYY'))){
            setMsgModal("date d'entrée superieur à date finale")
            setModalVisible(true)
        }else if((moment(newArticle.articleEndDate, 'DD-MM-YYYY')).isAfter(moment(newArticle.articleStartDate, 'DD-MM-YYYY').add(31, 'day'))){
            setMsgModal("date finale superieur à date d'entrée + 31")
            setModalVisible(true)
        }
        
        dispatch(createArticle(newArticle));
        setNewArticle(initialArticle);
        navigation.goBack();
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
                        <Text style={styles.textStyle}>Hide Modal</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
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
            <Text>Date de début</Text>
            <DatePicker
                date={moment(newArticle.articleStartDate,"DD-MM-YYYY").toDate()} // Initial date from state
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
                date={moment(newArticle.articleEndDate, "DD-MM-YYYY").toDate()} // Initial date from state
                mode="date" // The enum of date, datetime and time
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                placeholder="select date"
                format="DD-MM-YYYY"
                minDate={moment(newArticle.articleStartDate, "DD-MM-YYYY").add(1, 'day').toDate()}
                maxDate={moment(newArticle.articleStartDate, "DD-MM-YYYY").add(31, 'day').toDate()}
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
            
            <Button title="Sauvegarder" onPress={handleSave} />

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