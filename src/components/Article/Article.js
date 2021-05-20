import React, { useState } from 'react';
import { Card, Text, FAB, Divider, Overlay, Button} from 'react-native-elements';
import {useDispatch, useSelector} from "react-redux";
import { View} from 'react-native';
import {deleteArticle} from "../../actions/ArticleActions";
import moment from 'moment';
import MapViewScreen from '../User/MapView'

moment.updateLocale('fr');
const ArticleScreen = ({ navigation}) => {
    
    const dispatch = useDispatch();

    const currentArticle = useSelector(state => state.Article.currentArticle);
    console.log("£££££££££££££££££££££££")
    console.log(currentArticle)
    console.log("£££££££££££££££££££££££")
    const user = useSelector(state => state.User)

    
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

    return (
        <View style={{ alignItems:'center' }}>
            <Card containerStyle={{height:'100%', width:'100%'}}>
            
            <Text h3>{currentArticle.articleTitle}</Text>
            <Divider />
            <Text>{moment(currentArticle.articleStartDate).format('DD-MM-YYYY')} - {moment(currentArticle.articleEndDate).format('DD-MM-YYYY')}</Text>
            <Text>Description : {currentArticle.articleDescription}</Text>
            <Text>Lien : {currentArticle.articleLink}</Text>
            {
                currentArticle.articleLocalisation && <MapViewScreen localisation={currentArticle.articleLocalisation}/>
            }
  
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