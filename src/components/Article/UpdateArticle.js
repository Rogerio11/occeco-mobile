import React, { useState } from 'react';
import { Button, Input, CheckBox, Card, Text} from 'react-native-elements';
import {useDispatch, useSelector} from "react-redux";
import { View, Modal, StyleSheet, Pressable} from 'react-native';
import {updateArticle} from "../../actions/ArticleActions";
import {getAllTypes} from "../../actions/TypeArticleActions";
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
moment.updateLocale('fr');

const updateArticleScreen = ({ navigation, route }) => {
    
    const initialArticle = route.params.article;
    const [updArticle, setUpdArticle] = useState(initialArticle);
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
        setUpdArticle({...updArticle, [name]: value});
    }

    const toggleIsEvent = () =>{
        console.log("%%%%%%%%%%%%%%%")
        console.log(route.params.article)
        console.log(moment(route.params.article.articleStartDate).format('DD-MM-YYYY'))
        console.log(moment(route.params.article.articleDateEvent).format('DD-MM-YYYY'))
        console.log(moment(route.params.article.articleEndDate).format('DD-MM-YYYY'))
        console.log("%%%%%%%%%%%%%%%")
        const value = updArticle.isEvent ? false : true;
        setUpdArticle({...updArticle, ["isEvent"]: value});
    }

    const handleSave = () => {
        if(moment(updArticle.articleStartDate).isAfter(moment(updArticle.articleEndDate))){
            setMsgModal("date d'entrée superieur à date finale")
            setModalVisible(true)
        }else if((moment(updArticle.articleEndDate)).isAfter(moment(updArticle.articleStartDate).add(31, 'day'))){
            setMsgModal("date finale superieur à date d'entrée + 31")
            setModalVisible(true)
        }else if(updArticle.isEvent && moment(updArticle.articleDateEvent).isBefore(moment(updArticle.articleStartDate))){
            setMsgModal("date evènement inférieur à date d'entrée")
            setModalVisible(true)
        }else{
            dispatch(updateArticle(updArticle));
            setUpdArticle(initialArticle);
            navigation.goBack();
            // console.log("%%%%%%%%%%%%%%%")
        // console.log(updArticle)
        // console.log(moment(updArticle.articleStartDate).format('DD-MM-YYYY'))
        // console.log(moment(updArticle.articleDateEvent).format('DD-MM-YYYY'))
        // console.log(moment(updArticle.articleEndDate).format('DD-MM-YYYY'))
        // console.log("%%%%%%%%%%%%%%%")
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
            <Text>Date de début</Text>
            <DatePicker
                date={moment(updArticle.articleStartDate).format('DD-MM-YYYY')} // Initial date from state
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
                onDateChange={(evt) => handleChange({name: "articleStartDate", value: moment(evt,"DD-MM-YYYY").toDate()})}
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

                date={ moment(updArticle.articleDateEvent).format('DD-MM-YYYY')} // Initial date from state
                mode="date" // The enum of date, datetime and time
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                placeholder="select date"
                format="DD-MM-YYYY"
                minDate={moment(moment(updArticle.articleStartDate).add(-1, 'day').toDate()).format('DD-MM-YYYY')}
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

                onDateChange={(date) => handleChange({name: "articleDateEvent", value: moment(date,"DD-MM-YYYY").toDate()})}
            />
            </View>
      }
            
            <Text>Date de fin</Text>
            <DatePicker

                date={moment(updArticle.articleEndDate).format('DD-MM-YYYY')} // Initial date from state
                mode="date" // The enum of date, datetime and time
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                placeholder="select date"
                format="DD-MM-YYYY"
                minDate={moment(updArticle.articleStartDate).format('DD-MM-YYYY')}
                maxDate={moment(moment(updArticle.articleStartDate).add(31, 'day').toDate()).format('DD-MM-YYYY')}
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