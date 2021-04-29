import React, {useState} from 'react';
import { useSelector } from "react-redux";
import { MapContainer, TileLayer, Marker, Circle, useMapEvent  } from 'react-leaflet'
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

function MapView() {
    const user = useSelector(state => state.User);
    const distance = user.user.user.userDistance * 1000
    const position = user.user.user.userLocalisation || [43.608294, 3.879343]

    
  return (
    

    <MapContainer style={{ width: "100%", height: "30vh" }} center={position} zoom={12} scrollWheelZoom={false}>
        <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* <Marker position={position} >
          <Circle center={position} radius={distance} /> 
        </Marker> */}
        
    </MapContainer>
      

   

  );
}

export default MapView;