import React, {useState} from 'react';
import { useSelector } from "react-redux";
import { MapView, Marker } from 'react-native-maps';
import { YOUR_ACCESSTOKEN } from '../../../servUrl';
import { View, Text } from 'react-native';


function MapViewScreen() {
    const user = useSelector(state => state.User);
    const distance = user.user.user.userDistance * 1000
    const position = user.user.user.userLocalisation || [43.608294, 3.879343]

    
  return (
   
      
      <MapView
       
       region={{
         latitude: 37.78825,
         longitude: -122.4324,
         latitudeDelta: 0.015,
         longitudeDelta: 0.0121,
       }}
     >
       <Marker
        coordinate={{ latitude : position.lat , longitude : position.lng }}
        
      />
     </MapView>
   

   

  );
}

export default MapViewScreen;