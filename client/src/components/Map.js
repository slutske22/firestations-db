import React, { useRef, useState, useEffect } from 'react'
import { Map as LeafletMap, TileLayer, Marker } from 'react-leaflet'
import { useSelector, useDispatch } from 'react-redux'

import { setMapReference, setMapZoom, setMapBounds, getStations as callForStations } from '../store/actions/mapActions'
import { initialState } from '../store/reducers/mapReducers'

import GeoSearch from './GeoSearch'
import FireStations from './FireStations'

const mapboxAccessToken = 'pk.eyJ1Ijoic2x1dHNrZTIyIiwiYSI6ImNqeGw1Y3BibDAybG4zeHFyaXl3OXVwZXUifQ.fZ_5Raq5z-DUpo2AK-bQHA'

const Map = () => {

   const zoomThreshhold = useSelector(state => state.map.zoomThreshhold)
   const currentZoom = useSelector(state => state.map.zoom)

   const mapRef = useRef(null)
   const { zoom, center } = initialState
   const dispatch = useDispatch()

   useEffect(() => {
      window.map = mapRef.current.leafletElement
      dispatch( setMapReference(mapRef.current.leafletElement) )
      getStations()
   }, [])

   const getStations = () => {
      
      const map = mapRef.current.leafletElement
      const zoom = map.getZoom()
      const bounds = map.getBounds()
      dispatch( setMapZoom(zoom) )
      dispatch( setMapBounds(bounds) )

      if (zoom >= zoomThreshhold){
         callForStations({ bounds })
      }

   }


   return (

      <LeafletMap 
         center={center} 
         zoom={zoom}
         id="mapID"
         ref={mapRef}
         onMoveEnd={getStations} >

         <GeoSearch 
            position="topleft"
            useMapBounds={false}
            providers={['arcgisOnlineProvider', 'geocodeServiceProvider']} />

         {/* Support depreciated for mapbox classic styles, but they still work: */}
         <TileLayer
            url={`https://api.tiles.mapbox.com/v4/mapbox.outdoors/{z}/{x}/{y}.png?access_token=${mapboxAccessToken}`}
            attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
            id="mapbox.outdoors" />

            {currentZoom >= zoomThreshhold && <FireStations />}


      </LeafletMap>

   )

}

export default Map