import React, { useEffect } from 'react'
import { Marker, CircleMarker, Popup } from 'react-leaflet'
import { useSelector, useDispatch } from 'react-redux'
import { setOpenPopup } from '../store/actions/mapActions'

import '../css/FireStations.scss'

const redIcon = new L.Icon({
   iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
   shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
   iconSize: [25, 41],
   iconAnchor: [12, 41],
   popupAnchor: [1, -34],
   shadowSize: [41, 41]
 });

const FireStations = () => {
   
   const stations = useSelector(state => state.map.stations)
   const zoom = useSelector(state => state.map.zoom)
   const openPopupId = useSelector(state => state.map.openPopupId)
   const dispatch = useDispatch()

   const popupLeafletElements = {}

   const handlePopupOpen = id => {
      dispatch( setOpenPopup(id) )
   }

   const handlePopupClose = () => {
      dispatch( setOpenPopup(null) )
   }

   // If a popup is open when the map moves, the stations are cleared out and repopulated
   // This causes any open popups to close.  So instead, we save the mongodb _id of an
   // open popup, and with any update to the stations, we open the popup again (if its still
   // within the stations array.  May need to put a clause in there to nullify openPopupId 
   // if that station goes out of the map bounds)
   useEffect( () => {
      if (popupLeafletElements[openPopupId]){
         popupLeafletElements[openPopupId].leafletElement._source.openPopup()
      }
   }, [stations, openPopupId] )
    
   return (
   
      <>
         {stations.map( station => {

            console.log('stations.length', stations.length)

            const PopupWithDetails = () => (
               <Popup 
                  maxWidth={550} 
                  onOpen={ () => handlePopupOpen(station._id) } 
                  onClose={ handlePopupClose }
                  autoPan={false}
                  ref={ref => popupLeafletElements[station._id] = ref} >

                  <div className="station-popup-content">
                     <h4>{station["Fire dept name"]}</h4>
                     <h5>FDID: {station.FDID}</h5>
                     <div className="address-info">
                        <div className="group group1">
                           {station["HQ addr1"] && <>{station["HQ addr1"]} <br /></>}
                           {station["HQ addr2"] && <>{station["HQ addr2"]} <br /></>}
                           {station["HQ city"] && <>{station["HQ city"]} &nbsp;</>} 
                           {station["HQ state"] && <>{station["HQ state"]},  &nbsp;</>}
                           {station["HQ zip"] && <>{station["HQ zip"]} <br /></>}
                        </div>
                        <div className="group group2">
                           {station["HQ phone"] && <>Phone: {station["HQ phone"]} <br /></>}
                           {station["HQ fax"] && <>Fax: {station["HQ fax"]} <br /></>}
                           {station["County"] && <>{station["County"]}</>} 
                        </div>
                     </div>
                  </div>

               </Popup>

            )

            if (station.Latitude && station.Longitude) {
               if (zoom > 13 || stations.length < 10) {
                  return (
                     <Marker
                        icon={redIcon}
                        position={[station.Latitude, station.Longitude]} >
                        <PopupWithDetails />
                     </Marker>
                  )
               } else {
                  return (
                     <CircleMarker 
                        center={[station.Latitude, station.Longitude]}
                        radius={zoom < 10 ? 2 : 5}
                        fillColor='darkred' 
                        color='darkred' 
                        weight={1} 
                        fillOpacity={0.5} >
                        <PopupWithDetails />
                     </CircleMarker>
                  )
               }
            }


         })}
      </>
   
   )
    
}

export default FireStations