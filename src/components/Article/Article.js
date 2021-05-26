import React, { useState, useCallback } from 'react';
import { Card, Text, FAB, Divider, Overlay, Button, Icon} from 'react-native-elements';
import {useDispatch, useSelector} from "react-redux";
import { Alert, Linking,View} from 'react-native';
import {deleteArticle} from "../../actions/ArticleActions";
import { updateUser } from "../../actions/UserActions";
import moment from 'moment';
import MapViewScreen from '../User/MapView';
import MaterialChip from "react-native-material-chip";


const supportedURL = "https://google.com";

moment.updateLocale('fr');
const ArticleScreen = ({ navigation}) => {
    
    const dispatch = useDispatch();

    const currentArticle = useSelector(state => state.Article.currentArticle);
    console.log("£££££££££££££££££££££££")
    console.log(currentArticle)
    console.log("£££££££££££££££££££££££")
    const user = useSelector(state => state.User)
    
    if (user.user.user.userArticlesLinked.some(a => a._id === currentArticle._id && !a.isOpen)){
        const userUpdated = {...user.user.user, userArticlesLinked: userArticlesLinked.map(a => {
            if (a._id === currentArticle._id){
                a.isOpen = true
            }
            return a
        })}
        console.log(userUpdated)
        //dispatch(updateUser(userUpdated))
    }
    
    const [visible, setVisible] = useState(false);
      
    const toggleOverlay = () => {
          setVisible(!visible);
    };


    const handleOui = () => {
        console.log("Je suis dans le Oui");
        dispatch(deleteArticle(currentArticle._id));
        toggleOverlay()
        navigation.navigate("Liste Article")
    }
    const url = currentArticle.articleLink
    const handlePress = useCallback(async () => {
        
        // Checking if the link is supported for links with custom URL scheme.
        const supported = await Linking.canOpenURL(url.toString());
        console.log(supported)
        if (supported) {
          // Opening the link with some app, if the URL scheme is "http" the web link should be opened
          // by some browser in the mobile
          await Linking.openURL(url.toString());
        } else {
          Alert.alert(`Don't know how to open this URL: ${url}`);
        }
      }, [url]);

    return (
        <View style={{ alignItems:'center' }}>
            <Card containerStyle={{height:'100%', width:'100%'}}>
            
            <Text h3>{currentArticle.articleTitle}</Text>
            <Divider />
            {currentArticle.articleCategories.map(cat =>
        <MaterialChip
          key={cat._id}
          text={cat.nameType}
          leftIcon={
            <Icon name={cat.iconType} type="material-community" size={18} />
          }
          style={{
            borderBottomColor: cat.colorType,
            borderLeftColor: cat.colorType,
            borderTopColor: cat.colorType,
            borderRightColor: cat.colorType,
            borderBottomWidth: '3px',
            borderTopWidth: '3px',
            borderLeftWidth: '3px',
            borderRightWidth: '3px',
          }}
        />)
      }
            <Divider />
            {
                currentArticle.isEvent 
                ? <Text>Date de l'évènement : {moment(currentArticle.articleDateEvent).format('DD-MM-YYYY')}</Text>
                : <></>
            }
            <Text>Description : {currentArticle.articleDescription}</Text>
            
            <Button onPress={handlePress} title="Voir le post"></Button>
            <View style={{width:'100%', height:'30%'}}>
            {
                currentArticle.articleLocalisation && <MapViewScreen localisation={currentArticle.articleLocalisation}/>
            }
            </View>
            
  
      <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
      <Text h4>Voulez-vous vraiment supprimer cet article ?</Text>
            <Divider />
            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <Button title="Oui" onPress={handleOui} style={{ minWidth: '48%' }}/>
                
                <Button title="Non" onPress={toggleOverlay} style={{ minWidth: '48%' }}/>
                
            </View>
      </Overlay>

         
            {
              user && user.user && (user.user.accountType === "admin" || user.user.accountType === "partner") &&

              <View style={{ flexDirection: "row", justifyContent:'center' }}>
                  <FAB
                        visible={true}
                        icon={{ name: 'content-copy', color: 'white' }}
                        buttonStyle={{backgroundColor:'green'}}
                        onPress={() => navigation.push('Duplicate Article', {article: currentArticle})}
                  />
                  <Text> </Text>
                  <FAB
                      visible={true}
                      icon={{ name: 'edit', color: 'white' }}
                      buttonStyle={{backgroundColor:'gray'}}
                      onPress={() => navigation.push('Update Article', {article: currentArticle})}
                  />
                  <Text> </Text>
                  <FAB
                      visible={true}
                      icon={{ name: 'delete', color: 'white' }}
                      buttonStyle={{backgroundColor:'red'}}
                      onPress={toggleOverlay}
                  />
                  </View>
            }

            </Card>
            
        </View>
    );
};

export default  ArticleScreen;