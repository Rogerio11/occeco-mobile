import React, { useState } from 'react';

import { View, FlatList, TouchableHighlight, StyleSheet } from 'react-native';
import { useDispatch, useSelector, connect } from "react-redux";
import { getAllArticles, setCurrentArticle } from "../../actions/ArticleActions";
import { getAllTypes } from "../../actions/TypeArticleActions";
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
moment.updateLocale('fr');
import DropDownPicker from 'react-native-dropdown-picker';
import { Text, Icon, Card, SpeedDial, useTheme, CheckBox, Button, Divider } from 'react-native-elements';
import { set } from 'react-native-reanimated';


function ListArticleScreen({ navigation }) {
  const user = useSelector(state => state.User)
  const dispatch = useDispatch();
  const list = useSelector(state => state.Article);
  const [listArticle, setListArticle] = useState((user.user.accountType === "admin" || user.user.accountType === "partner") ? (Array.isArray(list.articles) ? list.articles : []) : user.user.user.userArticlesLinked);
  const listT = useSelector(state => state.TypeArticle);
  const [listTypeUser, setListTypeUser] = useState(Array.isArray(listT.typesArticle) ? listT.typesArticle : []);
  const [listAllType, setListAllType] = useState(Array.isArray(listT.typesArticle) ? listT.typesArticle : []);
  const [isEvent, setIsEvent] = useState(false);
  const [isNotEvent, setIsNotEvent] = useState(true);
  const [dateDebut, setDateDebut] = useState(moment().add(-1, "month").toDate())
  const [dateFin, setDateFin] = useState(moment().add(1, "month").toDate())
  const { theme } = useTheme();

  React.useEffect(() => {
    if ((user.user.accountType === "admin" || user.user.accountType === "partner")
      && (!Array.isArray(listArticle) || listArticle.length === 0)) {
      dispatch(getAllArticles());
    }
    setListArticle((user.user.accountType === "admin" || user.user.accountType === "partner") ? (Array.isArray(list.articles) ? list.articles : []) : user.user.user.userArticlesLinked)

  }, [])



  if (listTypeUser.length === 0) {
    dispatch(getAllTypes());
    setListTypeUser(useSelector(state => state.TypeArticle))
    setListAllType(useSelector(state => state.TypeArticle))
  }

  const commonType = (listT, articleType) => {
    if (!isEvent && !isNotEvent) {
      return false
    }
    return listT.some(t => articleType.articleCategories.some(articleType => articleType._id == t._id))
  }

  const handleFlatlistOnPress = (article) => {
    console.log(article.articleTitle)
    dispatch(setCurrentArticle(article))
    navigation.push('Article')
  }

  const isNotEventFilter = (article) => {
    return article.isEvent === !isNotEvent
  }
  const isEventFilter = (article) => {
    return article.isEvent === isEvent && moment(article.articleDateEvent).isAfter(dateDebut) && moment(article.articleDateEvent).isBefore(dateFin)
  }

  const filterListe = (article) => {
    return commonType(listAllType, article) && ((isNotEventFilter(article) && isNotEvent) || (isEventFilter(article) && isEvent))
  }

  const toggleIsEvent = () => {
    isEvent ? setIsEvent(false) : setIsEvent(true)
  }
  const toggleIsNotEvent = () => {
    isNotEvent ? setIsNotEvent(false) : setIsNotEvent(true)
  }
  return (


    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Card containerStyle={{ width: '100%', height: '100%' }}>
        <View style={{ width: '100%', minHeight: '93%' }}>
          <Card.Title> Articles :</Card.Title>
          {
            list.articles.length === 0
              ? <View style={{ width: '100%', minHeight: '97%' }}>
                <Text>Pas d'articles à afficher</Text>
              </View>
              :
              <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ width: '40%' }}>Filtrer par catégories </Text>
                  <DropDownPicker
                    items={listTypeUser.map(type => ({
                      label: type.nameType,
                      value: type
                    }))}
                    placeholder="Filtrer"
                    defaultValue={listTypeUser}
                    multiple={true}
                    style={{ backgroundColor: '#fafafa' }}
                    dropDownStyle={{ backgroundColor: '#fafafa' }}
                    onChangeItem={(listSelected) => setListAllType(listSelected)}
                    containerStyle={{ height: 40, width: '60%' }}
                  />
                </View>
                <View >
                  <Divider />
                  <CheckBox
                    title="Voir les évènements"
                    checked={isEvent}
                    onPress={() => toggleIsEvent()}
                  />
                  {
                    isEvent &&
                    <View style={{ flexDirection: 'row' }}>
                      <Text>Du </Text>
                      <DatePicker
                        date={moment(dateDebut).format('DD-MM-YYYY')} // Initial date from state
                        mode="date" // The enum of date, datetime and time
                        placeholder="select date"
                        format="DD-MM-YYYY"
                        confirmBtnText="Valider"
                        cancelBtnText="Annuler"
                        customStyles={{
                          dateIcon: {
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
                        onDateChange={(evt) => setDateDebut(moment(evt, "DD-MM-YYYY"))}
                      />

                      <Text> au </Text>
                      <DatePicker
                        date={moment(dateFin).format('DD-MM-YYYY')} // Initial date from state
                        mode="date" // The enum of date, datetime and time
                        placeholder="select date"
                        format="DD-MM-YYYY"
                        minDate={moment(dateDebut).format('DD-MM-YYYY')}
                        confirmBtnText="Valider"
                        cancelBtnText="Annuler"
                        customStyles={{
                          dateIcon: {
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
                        onDateChange={(evt) => setDateFin(moment(evt, "DD-MM-YYYY"))}
                      />
                    </View>
                  }
                  <CheckBox
                    title="Voir les non-évènements"
                    checked={isNotEvent}
                    onPress={() => toggleIsNotEvent()}
                  />
                </View>
                <View>
                  <Divider />
                  {
                    user && user.user && (user.user.accountType === "admin" || user.user.accountType === "partner") &&
                    <View style={{ flexDirection: 'row'}}>
                      <Button title="Nouvel article" onPress={() => navigation.push('Add Article')} />
                      <Text> </Text>
                      <Button title="Voir catégories" onPress={() => navigation.push('Catégories')} />
                    </View>
                  }
                  <Divider />
                </View>

                <View style={{ minHeight: '50%' }}>
                  <FlatList
                    data={(list.articles || []).filter(function (article) {
                      return filterListe(article)
                    }).sort((a, b) => moment(a.articleStartDate).toDate() - moment(b.articleStartDate).toDate())}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item, index, separators }) =>
                      <TouchableHighlight
                        key={item._id}
                        onPress={() => handleFlatlistOnPress(item)}
                        onShowUnderlay={separators.highlight}
                        onHideUnderlay={separators.unhighlight}
                      >
                        <View style={{ flexDirection: "row", justifyContent: 'space-between', backgroundColor: index % 2 === 0 ? 'white' : '#DCDCDC' }}>
                          <Text h4>{item.articleTitle}</Text>
                          <View style={{ flexDirection: "row", justifyContent: 'space-evenly' }}>
                            {item.articleCategories && item.articleCategories.map(cat =>

                              <Icon key={cat._id} name={cat.iconType} type="material-community" color={cat.colorType} />
                            )}
                          </View>
                          <Icon name="chevron-right" type="material-community" onPress={() => handleFlatlistOnPress(item)} />

                        </View>
                      </TouchableHighlight>
                    }
                  />
                </View>
              </View>
          }
        </View>
      </Card>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: "center",
  },
  label: {
    margin: 8,
  },
});

export default ListArticleScreen;