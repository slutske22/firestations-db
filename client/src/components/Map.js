import React, { useRef, useEffect } from 'react'
import { Map as LeafletMap, TileLayer } from 'react-leaflet'
import { useSelector, useDispatch } from 'react-redux'

import { setMapReference, setMapZoom, setMapBounds, setMapCenter } from '../store/actions'

const mapboxAccessToken = 'pk.eyJ1Ijoic2x1dHNrZTIyIiwiYSI6ImNqeGw1Y3BibDAybG4zeHFyaXl3OXVwZXUifQ.fZ_5Raq5z-DUpo2AK-bQHA'

const Map = () => {

   const mapRef = useRef(null)

   const center = useSelector(state => state.map.center)
   const zoom = useSelector(state => state.map.zoom)
   const dispatch = useDispatch()

   useEffect(() => {
      dispatch( setMapReference(mapRef.current.leafletElement) )
   }, [])

   const moveHandler = () => {
      const map = mapRef.current.leafletElement
      const center = map.getCenter()
      setBounds()
      dispatch( setMapCenter(center) )
   }

   const zoomHandler = () => {
      const map = mapRef.current.leafletElement
      const zoom = map.getZoom()
      setBounds()
      dispatch( setMapZoom(zoom) )
   }

   const setBounds = () => {
      const map = mapRef.current.leafletElement
      const bounds = map.getBounds()
      dispatch( setMapBounds(bounds) )
   }


   return (

      <LeafletMap 
         center={center} 
         zoom={zoom}
         id="mapID"
         ref={mapRef}
         onMoveEnd={moveHandler}
         onZoomEnd={zoomHandler} >

         {/* Support depreciated for mapbox classic styles, but they still work: */}
         <TileLayer
            url={`https://api.tiles.mapbox.com/v4/mapbox.outdoors/{z}/{x}/{y}.png?access_token=${mapboxAccessToken}`}
            attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
            id="mapbox.outdoors" />


      </LeafletMap>

   )

}

export default Map