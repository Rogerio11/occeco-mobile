import React, {useState} from 'react';
import { useSelector } from "react-redux";
import MapView, { Marker, Circle } from 'react-native-maps';



const MapViewScreen = ({changeLocalisation = false, localisation = false }) => {
  const user = useSelector(state => state.User);
  const position = (localisation ? localisation : user.user.user.userLocalisation )|| { lat: 43.608294, lng:3.879343}
  const distance = user.user.user.userDistance * 1000
  const [delta, setDelta] = useState({lat:0.15, lng:0.15})
  const [pos, setPos] = useState(position)

  const handleChange = (evt) => {
    setPos({lat: evt.latitude, lng: evt.longitude})
    setDelta({lat: evt.latitudeDelta, lng: evt.longitudeDelta})
    if (changeLocalisation){
      changeLocalisation({ lat: evt.latitude, lng: evt.longitude})
    }
  }

  return (
    <MapView
      style={{flex:1}}
      region={{
          latitude: pos.lat,
          longitude: pos.lng,
          latitudeDelta: delta.lat,
          longitudeDelta: delta.lng
      }}
      onRegionChange={changeLocalisation ? handleChange : ''}
    >
      <Marker 
        coordinate={{ latitude : pos.lat , longitude : pos.lng }}
      />
      {
        !changeLocalisation && 
        <Circle 
          center={{ latitude : pos.lat , longitude : pos.lng }} 
          radius={distance} 
          fillColor={"rgba(137,209,254,.4)"}
        />
      }
      
      
    </MapView>
  );
}

export default MapViewScreen;