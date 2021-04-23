import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { MapContainer, TileLayer, Marker, Circle } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

function MapView({ navigation }) {
    const user = useSelector(state => state.User);
    const distance = user.user.user.userDistance * 1000
    
  return (
    

    <MapContainer style={{ width: "100%", height: "30vh" }} center={[43.608294, 3.879343]} zoom={12} scrollWheelZoom={false}>
        <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker 
        position={[43.608294, 3.879343]}
        eventHandlers={{
            click: (evt) => {
            console.log(evt)
            },
        }}>
            <Circle center={[43.608294, 3.879343]} radius={distance} />
        
        </Marker>
    </MapContainer>
      

   

  );
}

export default MapView;