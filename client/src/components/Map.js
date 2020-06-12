import React, { useRef, useState, useEffect } from 'react'
import { Map as LeafletMap, TileLayer, Marker } from 'react-leaflet'
import { useSelector, useDispatch } from 'react-redux'

import { setMapReference, setMapBounds } from '../store/actions'

const mapboxAccessToken = 'pk.eyJ1Ijoic2x1dHNrZTIyIiwiYSI6ImNqeGw1Y3BibDAybG4zeHFyaXl3OXVwZXUifQ.fZ_5Raq5z-DUpo2AK-bQHA'

const Map = () => {
   
   const mapRef = useRef(null)
   const center = useSelector(state => state.map.center)
   const zoom = useSelector(state => state.map.zoom)
   const dispatch = useDispatch()

   const [stations, setStations] = useState([])

   useEffect(() => {
      window.map = mapRef.current.leafletElement
      dispatch( setMapReference(mapRef.current.leafletElement) )
   }, [])

   const moveEndHandler = () => {
      
      const { zoomThreshhold } = store.getState().map
      const map = mapRef.current.leafletElement
      const zoom = map.getZoom()
      const bounds = map.getBounds()
      dispatch( setMapBounds(bounds) )

      if (zoom > zoomThreshhold){

         fetch('/api/stationtest', {
            method: "POST",
            headers: {
               'Content-Type': 'application/json'
               // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({
               message: "this is a test",
               coords: {
                  south: bounds.getSouth(),
                  north: bounds.getNorth(),
                  east: bounds.getEast(),
                  west: bounds.getWest()
               },
               "HQ city": "San Diego"
            })
         })
         .then( res => res.json() )
         .then( res => {
            console.log(res)
            setStations(res)
         })

      }

   }


   return (

      <LeafletMap 
         center={center} 
         zoom={zoom}
         id="mapID"
         ref={mapRef}
         onMoveEnd={moveEndHandler} >

         {/* Support depreciated for mapbox classic styles, but they still work: */}
         <TileLayer
            url={`https://api.tiles.mapbox.com/v4/mapbox.outdoors/{z}/{x}/{y}.png?access_token=${mapboxAccessToken}`}
            attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
            id="mapbox.outdoors" />

            {stations.map( station => 
               <Marker position={[station.Latitude, station.Longitude]}>
               </Marker>
            )}


      </LeafletMap>

   )

}

export default Map