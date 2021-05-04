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
    function addDays(date, days) {
        var result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }
    const initialArticle = {  
        articleTitle: "",
        articleLink: "", 
        articleDescription: "",
        articleStartDate: new Date(),
        articleEndDate: addDays(new Date(), 1)

    }

    const [newArticle, setNewArticle] = useState(initialArticle);
    const [maxDateEndDate, setMaxDateEndDate] = useState(addDays(newArticle.articleStartDate, 30));
    const [minDateEndDate, setMinDateEndDate] = useState(addDays(newArticle.articleStartDate, 1));
    const [modalVisible, setModalVisible] = useState(false);
    const [msgModal, setMsgModal] = useState("");
    const dispatch = useDispatch();

    const handleChange = (evt) => {
        const { name, value } = evt;
        
        setNewArticle({...newArticle, [name]: value});
        
    }

    const handleStartDateChange = (date) => {
        const day = parseInt(date.substring(0,2))
        const month = parseInt(date.substring(3,5))
        const year = parseInt(date.substring(6))
        const newStartDate = new Date(year, (month-1), day)

        setMinDateEndDate(newStartDate)
        setMaxDateEndDate(addDays(newStartDate, 30))

        if(newStartDate >= newArticle.articleEndDate){
            setNewArticle({...newArticle, ["articleEndDate"] : addDays(newStartDate, 1)});
        }
        setNewArticle({...newArticle, ["articleStartDate"] : newStartDate});
    }


    const handleEndDateChange = (date) => {
        const day = parseInt(date.substring(0,2))
        const month = parseInt(date.substring(3,5))
        const year = parseInt(date.substring(6))
        setNewArticle({...newArticle, ["articleEndDate"] : new Date(year, (month-1), day)});
        
    }


    const handleSave = () => {
        console.log("saveArticle : ", newArticle);
        console.log(newArticle.articleStartDate.toString())
        console.log(newArticle.articleEndDate.toString())
        if(newArticle.articleStartDate > newArticle.articleEndDate){
            setMsgModal("date d'entrée superieur à date finale")
            setModalVisible(true)
        }else if(addDays(newArticle.articleStartDate, 30) < newArticle.articleEndDate){
            setMsgModal("date finale superieur à date d'entrée + 30")
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
            <Text>Date D'entrée</Text>
            <DatePicker
                
                date={newArticle.articleStartDate} // Initial date from state
                mode="date" // The enum of date, datetime and time
                placeholder="select date"
                format="DD-MM-YYYY"
                minDate={new Date()}
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
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
                onDateChange={(date) => {
                    handleStartDateChange(date);
                  }}
            />
            <Text>Date Finale</Text>
            <DatePicker
                
                date={newArticle.articleEndDate} // Initial date from state
                mode="date" // The enum of date, datetime and time
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                placeholder="select date"
                format="DD-MM-YYYY"
                minDate={minDateEndDate}
                maxDate={maxDateEndDate}
                confirmBtnText="Confirm"
                cancelBtnText="Cancell"
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

                onDateChange={(date) => handleEndDateChange(date)}
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