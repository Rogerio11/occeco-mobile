import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';
// import Geolocation, {hasLocationPermission} from 'react-native-geolocation-service';

const Address = () => {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);


    
    // Geolocation.getCurrentPosition(
    //     (position) => {
    //         console.log(position);
    //         setLocation(position);
    //     },
    //     (error) => {
    //     // See error code charts below.
    //         console.log(error.code, error.message);
    //     },
    //     { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    // );
    

    
    return (
        <View >
          <Text>adresse = {location}</Text>
        </View>
      );
}

export default Address;
