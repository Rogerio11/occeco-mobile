import React, {useState} from 'react';

import { View, FlatList, TouchableHighlight, StyleSheet} from 'react-native';
import {useDispatch, useSelector, connect} from "react-redux";
import {getAllArticles} from "../../actions/ArticleActions";
import {getAllTypes} from "../../actions/TypeArticleActions";
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
moment.updateLocale('fr');


import { Text, Icon, Card, SpeedDial, useTheme, CheckBox} from 'react-native-elements';
import { set } from 'react-native-reanimated';


function ListArticleScreen({ navigation }) {
  const user = useSelector(state => state.User)
  const dispatch = useDispatch();
  const list = useSelector(state => state.Article);
  const [listArticle, setListArticle] = useState((user.user.accountType === "admin" || user.user.accountType === "partner") ? (Array.isArray(list.articles) ? list.articles : []) : user.user.user.userArticlesLinked);
  const listT = useSelector(state => state.TypeArticle);
  const [listTypeUser, setListTypeUser] = useState(Array.isArray(listT.typesArticle) ? listT.typesArticle : []);
  const [listAllType, setListAllType] = useState(Array.isArray(listT.typesArticle) ? listT.typesArticle : []);
  const [open, setOpen] = useState(false);
  const [isEvent, setIsEvent] = useState(false);
  const [isNotEvent, setIsNotEvent] = useState(true);
  const [dateDebut, setDateDebut] = useState(moment().add(-40, "day").toDate())
  const [dateFin, setDateFin] = useState(moment().add(40, "day").toDate())
  const [isAllTypeSelected, setIsAllTypeSelected] = useState(true)
  const { theme } = useTheme();
  const [showUserCheckbox, setShowUserCheckbox] = useState(false)
  const [showEventCheckbox, setShowEventCheckbox] = useState(false)
  const [showNotEventCheckbox, setShowNotEventCheckbox] = useState(false)
  /*
  React.useEffect(() => {
    
    if ( (user.user.accountType === "admin" || user.user.accountType === "partner") && (!Array.isArray(listArticle) || listArticle.length === 0 )){
      dispatch(getAllArticles());
    }
  })
  */
 
  if (listTypeUser.length === 0 ){
      dispatch(getAllTypes());
      setListTypeUser(useSelector(state => state.TypeArticle))
      setListAllType(useSelector(state => state.TypeArticle))
  }

const commonType = (listT, articleType) => {
  if(!isEvent && !isNotEvent){
    return false
  }
  return listT.some(t => articleType.articleCategories.some(articleType => articleType._id == t._id))
}

const changeCategories = (type) => {
  
  const value = listAllType.some(t => t._id === type._id);

  const newListe = value ? listAllType.filter(t => t._id !== type._id) : [...listAllType, type]

  setListAllType(newListe)
}


const toggleIsAllTypeSelected = () => {
  if(isAllTypeSelected){
    setShowUserCheckbox(true)
    setShowEventCheckbox(true)
    setShowNotEventCheckbox(true)
    setIsEvent(true)
    setIsNotEvent(true)
  }else{
    setShowUserCheckbox(false)
    setShowEventCheckbox(false)
    setShowNotEventCheckbox(false)
    setIsEvent(false)
    setIsNotEvent(false)
  }
  setIsAllTypeSelected(!isAllTypeSelected)
}

const isNotEventFilter = (article) => {

  return article.isEvent === !isNotEvent
  
}
const isEventFilter = (article) => {
  return article.isEvent === isEvent && moment(article.articleDateEvent).isAfter(dateDebut) && moment(article.articleDateEvent).isBefore(dateFin)
}

const filterListe = (article) => {
  return commonType(listAllType, article) && ((isNotEventFilter(article) && isNotEvent ) || (isEventFilter(article) && isEvent))
}

const toggleIsEvent = () => {
  isEvent ? setIsEvent(false) : setIsEvent(true)
}
const toggleIsNotEvent = () => {
  isNotEvent ? setIsNotEvent(false) : setIsNotEvent(true)
}
  return (
    
    
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Card containerStyle={{width: '100%', height:'100%'}}>
      <View style={{width: '100%', minHeight:'97%'}}>
        {
          listArticle.length === 0
          ? <View style={{width: '100%', minHeight:'97%'}}>
              <Text>Pas d'articles à afficher</Text>
            </View>
          :
          <View style={{ flex: 1}}>
        <View style={{ width:'50%'}}>
            <CheckBox
                  title="All"
                  checked={isAllTypeSelected}
                  onPress={() => toggleIsAllTypeSelected()}
            />
            {
              showUserCheckbox &&
              listTypeUser.map(t =>
                <CheckBox
                    key={t._id}
                    title={t.nameType}
                    checked={listAllType.some(type => t._id === type._id)}
                    onPress={() => changeCategories(t)}
                />)
            }
            {
              showNotEventCheckbox &&
              <CheckBox
                title="Not évent"
                checked={isNotEvent}
                onPress={() => toggleIsNotEvent()}
              /> }
            {
              showEventCheckbox &&
              <CheckBox
                title="Evènement"
                checked={isEvent}
                onPress={() => toggleIsEvent()}
              /> }
              


  { 
    isEvent && 
    <View style={{flexDirection:'row'}}>

            
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
                onDateChange={(evt) => setDateDebut(moment(evt,"DD-MM-YYYY"))}
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
                onDateChange={(evt) => setDateFin(moment(evt,"DD-MM-YYYY"))}
            />
</View>

  }
        </View>
        <View style={{ minHeight:'50%' }}>

            <FlatList
              data={isAllTypeSelected ? listArticle : listArticle.filter(function(article) {
                return filterListe(article)
              })}
              keyExtractor={(item) => item._id}
              renderItem={({item, index, separators}) => 
              <TouchableHighlight
                key={item._id}
                onPress={() => navigation.push('Article', {article: item})}
                onShowUnderlay={separators.highlight}
                onHideUnderlay={separators.unhighlight}
                >
                <View style={{ flexDirection: "row", justifyContent:'space-between'}}>
                    <Text h4>{item.articleTitle}</Text>
                    <View style={{ flexDirection: "row", justifyContent: 'space-evenly'}}>
                    {item.articleCategories && item.articleCategories.map(cat => 
                    
                      <Icon key={cat._id} name={cat.iconType} type="material-community" color={cat.colorType}/>
                    )}
                    </View>
                    <Icon name="chevron-right" type="material-community" onPress={() => navigation.push('Article', {article: item})}/>
                    
                </View>
              </TouchableHighlight>
              }
            />
        </View>
        
      </View>
      }
</View>
      {
        user && user.user && (user.user.accountType === "admin" || user.user.accountType === "partner") &&
        <View style={{width: '100%', minHeight:'3%'}}>
          <SpeedDial
            isOpen={open}
            icon={{ name: 'add', color: 'white' }}
            openIcon={{ name: 'close', color: 'white' }}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            buttonStyle={{backgroundColor:'green', position:'relative'}}
            >
            
            <SpeedDial.Action
              icon={{ name: 'add', color: 'white' }}
              title="Nouvel article"
              onPress={() => navigation.push('Add Article')}
              buttonStyle={{backgroundColor:'green'}}
            />
            <SpeedDial.Action
              icon={{ name: 'visibility', color: 'white' }}
              title="Voir catégories"
              onPress={() => navigation.push('Catégories')}
              buttonStyle={{backgroundColor:'green'}}
            />
          </SpeedDial>
        </View>
      }
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

const mapStateToProps = (state) => state
export default connect(mapStateToProps)(ListArticleScreen);  