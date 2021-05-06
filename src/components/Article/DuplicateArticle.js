import React, { useState } from 'react';
import { Button, Input, CheckBox, Card, Text} from 'react-native-elements';
import {useDispatch, useSelector} from "react-redux";
import { View, Modal, StyleSheet, Pressable} from 'react-native';
import {createArticle} from "../../actions/ArticleActions";
import {getAllTypes} from "../../actions/TypeArticleActions";
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
moment.updateLocale('fr');

const DuplicateArticleScreen = ({ navigation, route }) => {
    
    const initialArticle = route.params.article;
    const [newArticle, setNewArticle] = useState(initialArticle);
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
        setNewArticle({...newArticle, [name]: value});
    }

    const toggleIsEvent = () =>{
        console.log("%%%%%%%%%%%%%%%")
        console.log(route.params.article)
        console.log(moment(route.params.article.articleStartDate).format('DD-MM-YYYY'))
        console.log(moment(route.params.article.articleDateEvent).format('DD-MM-YYYY'))
        console.log(moment(route.params.article.articleEndDate).format('DD-MM-YYYY'))
        console.log("%%%%%%%%%%%%%%%")
        const value = newArticle.isEvent ? false : true;
        setNewArticle({...newArticle, ["isEvent"]: value});
    }

    const handleSave = () => {
        if(moment(newArticle.articleStartDate).isAfter(moment(newArticle.articleEndDate))){
            setMsgModal("date d'entrée superieur à date finale")
            setModalVisible(true)
        }else if((moment(newArticle.articleEndDate)).isAfter(moment(newArticle.articleStartDate).add(31, 'day'))){
            setMsgModal("date finale superieur à date d'entrée + 31")
            setModalVisible(true)
        }else if(newArticle.isEvent && moment(newArticle.articleDateEvent).isBefore(moment(newArticle.articleStartDate))){
            setMsgModal("date evènement inférieur à date d'entrée")
            setModalVisible(true)
        }else{
            dispatch(createArticle(newArticle));
            setNewArticle(initialArticle);
            navigation.navigate("Liste Article");
            // console.log("%%%%%%%%%%%%%%%")
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
                date={moment(newArticle.articleStartDate).format('DD-MM-YYYY')} // Initial date from state
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
                    checked={newArticle.isEvent}
                    onPress={() => toggleIsEvent()}
                />

        {
            newArticle.isEvent &&
            <View>
            <Text>Date Event</Text>
            <DatePicker

                date={ moment(newArticle.articleDateEvent).format('DD-MM-YYYY')} // Initial date from state
                mode="date" // The enum of date, datetime and time
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                placeholder="select date"
                format="DD-MM-YYYY"
                minDate={moment(moment(newArticle.articleStartDate).add(-1, 'day').toDate()).format('DD-MM-YYYY')}
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

                date={moment(newArticle.articleEndDate).format('DD-MM-YYYY')} // Initial date from state
                mode="date" // The enum of date, datetime and time
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                placeholder="select date"
                format="DD-MM-YYYY"
                minDate={moment(newArticle.articleStartDate).format('DD-MM-YYYY')}
                maxDate={moment(moment(newArticle.articleStartDate).add(31, 'day').toDate()).format('DD-MM-YYYY')}
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
  

export default DuplicateArticleScreen;