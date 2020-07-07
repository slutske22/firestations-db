import React, { useEffect } from 'react'
import { Marker, CircleMarker, Popup } from 'react-leaflet'
import { useSelector, useDispatch } from 'react-redux'
import { setOpenPopup, createPendingAddition, addStation, createPendingDeletion } from '../store/actions/mapActions'
import { setSnackbar } from '../store/actions/navigationActions'


import '../css/FireStations.scss'

const redIcon = new L.Icon({
   iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
   shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
   iconSize: [25, 41],
   iconAnchor: [12, 41],
   popupAnchor: [1, -34],
   shadowSize: [41, 41]
});

const goldIcon = new L.Icon({
   iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png',
   shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
   iconSize: [25, 41],
   iconAnchor: [12, 41],
   popupAnchor: [1, -34],
   shadowSize: [41, 41]
});

const FireStations = () => {
   
   const mapRef = useSelector(state => state.map.mapRef)
   const stations = useSelector(state => state.map.stations)
   const zoom = useSelector(state => state.map.zoom)
   const openPopupId = useSelector(state => state.map.openPopupId)
   const pendingAddition = useSelector(state => state.map.pendingAddition)
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

   useEffect( () => {
      if (pendingAddition?.geocoded?.results?.length > 0) {

         mapRef.setView([
            pendingAddition.geocoded.results[0].location.lat, 
            pendingAddition.geocoded.results[0].location.lng
         ], 16)
         popupLeafletElements.pending.leafletElement._source.openPopup()

      }
   }, [pendingAddition] )


   const content = station => (
      <div className="station-popup-content">
         <h3>{station["Fire dept name"]}</h3>
         <h4>FDID: {station.FDID}</h4>
         <div className="address-info">
            <div className="group group1">
               {station["HQ addr1"] && <>{station["HQ addr1"]} <br /></>}
               {station["HQ addr2"] && <>{station["HQ addr2"]} <br /></>}
               {station["HQ city"] && <>{station["HQ city"]} &nbsp;</>} 
               {station["HQ state"] && <>{station["HQ state"]},  &nbsp;</>}
               {station["HQ zip"] && <>{station["HQ zip"]} <br /></>}
               {station["County"] && <>{station["County"]}</>} 
            </div>
            <div className="group group2">
               {station["HQ phone"] && <>Phone: {station["HQ phone"]} <br /></>}
               {station["HQ fax"] && <>Fax: {station["HQ fax"]} <br /></>}
            </div>
         </div>
         <div className="station-info">
            <div className="group">
               Organization Type: {station["Organization Type"]} <br />
               Department Type: {station["Dept Type"]} <br />
               Number of Stations: {station["Number Of Stations"]} <br />
               Primary Agency for Emergency Management: {station["Primary agency for emergency mgmt"] 
                  ? ( station["Primary agency for emergency mgmt"] !== " No" ? " Yes" : " No" ) 
                  : " No"} <br />
            </div>
            <div className="staff">
               <div className="group">
                  <h5>Firefighters:</h5>
                  <ul>
                     <li>
                        <span>Career:</span> 
                        <span>{station["Active Firefighters - Career"]}</span>
                     </li>
                     <li>
                        <span>Paid Per call:</span> 
                        <span>{station["Active Firefighters - Paid per Call"]}</span>
                     </li>
                     <li>
                        <span>Volunteer:</span> 
                        <span>{station["Active Firefighters - Volunteer"]}</span>
                     </li>
                  </ul>
               </div>
               <div className="group">
                  <h5>Non-firefighter:</h5>
                  <ul>
                     <li>
                        <span>Civilian:</span> 
                        <span>{station["Non-Firefighting - Civilian"]}</span>
                     </li>
                     <li>
                        <span>Volunteer:</span> 
                        <span>{station["Non-Firefighting - Volunteer"]}</span>
                     </li>
                  </ul>
               </div>
            </div>
         </div>
         <div className="button-group">
            <button>
               Edit
            </button>
            <button onClick={ () => { dispatch( createPendingDeletion(station._id) ) }}>
               Delete
            </button>
         </div>
      </div>
   )

    
   return (
   
      <>
         {stations.map( station => {

            const PopupWithDetails = () => (
               <Popup 
                  maxWidth={500} 
                  onOpen={ () => handlePopupOpen(station._id) } 
                  onClose={ handlePopupClose }
                  autoPan={false}
                  ref={ref => popupLeafletElements[station._id] = ref} >

                  {content(station)}

               </Popup>

            )

            if (station.Latitude && station.Longitude) {
               if (zoom > 13 || stations.length < 10) {
                  return (
                     <Marker
                        icon={redIcon}
                        position={[station.Latitude, station.Longitude]} >
                        <PopupWithDetails station={station}/>
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

         {pendingAddition?.geocoded?.results?.length > 0 && 
            <Marker
               icon={goldIcon}
               position={[
                  pendingAddition.geocoded.results[0].location.lat, 
                  pendingAddition.geocoded.results[0].location.lng
               ]}>

               <Popup 
                  maxWidth={500} 
                  onOpen={ () => {} } 
                  onClose={ () => {dispatch( createPendingAddition(null) )} }
                  ref={ref => popupLeafletElements["pending"] = ref} >

                  <div className="popup-confirm-add-station-wrapper">

                     <h3>Does this look correct?</h3>

                     <div className="station-preview">
                        {content(pendingAddition.search)}
                     </div>

                     <div className="actions">
                        <button onClick={ () => {
                           dispatch( setSnackbar('add') )
                        }}>
                           No, Edit Station Info
                        </button>
                        <button onClick={ () => dispatch( addStation() ) }>
                           Yes, Add Station
                        </button>
                     </div>
                     <p className="warning">Closing this popup without confirming will nullify your request to add this station.</p>

                  </div>


               </Popup>

            </Marker>
         }
      </>
   
   )
    
}

export default FireStations