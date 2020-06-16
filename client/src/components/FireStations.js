import React from 'react'
import { Marker, CircleMarker, Popup } from 'react-leaflet'
import { useSelector } from 'react-redux'

const FireStations = () => {
   
   const stations = useSelector(state => state.map.stations)
   const zoom = useSelector(state => state.map.zoom)
    
   return (
   
      <>
         {stations.map( station => {
            if (zoom < 13) {
               return (
                  <CircleMarker 
                     center={[station.Latitude, station.Longitude]}
                     radius={zoom < 10 ? 2 : 5}
                     fillColor='darkred' 
                     color='darkred' 
                     weight={1} 
                     fillOpacity={0.5} >
                  </CircleMarker>
               )
            } else {
               return (
                  <Marker
                     position={[station.Latitude, station.Longitude]} >
                  </Marker>
               )
            }
         })}
      </>
   
   )
    
}

export default FireStations