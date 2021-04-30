import React, { useState } from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../actions/UserActions";
import { Card, Input, Button, Slider, Text, useTheme, Icon, CheckBox } from 'react-native-elements'
import { wrongInputsAlert } from "../Utils/Alerts";
import {getAllTypes} from "../../actions/TypeArticleActions";
import DropDownPicker from 'react-native-dropdown-picker';


function UpdateUserScreen({ navigation }) {
  const user = useSelector(state => state.User);
  const list = useSelector(state => state.TypeArticle);
  const dispatch = useDispatch();
  const [userUpdated, setUserUpdated] = useState(user.user.user);
  const { theme } = useTheme();
  const position = user.user.user.userLocalisation || [43.608294, 3.879343]
  const [ pos, setPos ] = useState(position)
  const listType = Array.isArray(list.typesArticle) ? list.typesArticle : [];
  
  const tryUpdate = () => {
    /*
    if (!newAccountMail) { //TODO : compléter ça avec chacun des champs dans la version finale
      wrongInputsAlert()
    } else {
      */
      console.log("tryUpdate", userUpdated)
      dispatch(updateUser(userUpdated));
      navigation.goBack();
    //}
  };

  const handleChange = (evt) => {
    
    const { name, value } = evt;
    setUserUpdated({ ...userUpdated, [name]: value }) 

  }
  const changeCategories = (type) => {
    const value = userUpdated.userCategories.some(t => t._id === type._id);
    
    handleChange({
      name: 'userCategories', 
      value: value ? userUpdated.userCategories.filter(t => t._id !== type._id) : [...userUpdated.userCategories, type]})
  }
  function ChangePositionMap() {
    const map = useMapEvent('drag', () => {
      setPos(map.getCenter())
      setUserUpdated({...userUpdated, userLocalisation: {...pos}})
    })
    
    return (
      <Marker position={pos} >
        <Circle center={pos} radius={userUpdated.userDistance * 1000} /> 
      </Marker>
    )
  }

  return (
    <Card>
      

        <Text>Distance : {userUpdated.userDistance} km</Text>
        <Slider
          value={userUpdated.userDistance}
          maximumValue={200}
          minimumValue={0}
          step={1}
          onValueChange={(evt) => handleChange({ name: "userDistance", value: evt })}
          thumbStyle={{ height: 20, width: 20, backgroundColor: theme.colors.primary }}
        />

        <Text>Adresse : </Text>

       
        <Text>Catégories : </Text>
        { listType.map(t => 
          <CheckBox
            key={t._id}
            title={t.nameType}
            checked={userUpdated.userCategories.some(type => t._id === type._id)}
            onPress={() => changeCategories(t)}
          />)

        }
        
        <Button title="Modifier" onPress={tryUpdate} />
      
    </Card>
  );
}

export default UpdateUserScreen;