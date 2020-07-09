import L from 'leaflet'
import store from '../store'
import { setSnackbar, clearSearchTerms } from './navigationActions'

export const C = {

   SET_MAP_REFERENCE: "SET_MAP_REFERENCE",
   SET_MAP_CENTER: "SET_MAP_CENTER",
   SET_MAP_ZOOM: "SET_MAP_ZOOM",
   SET_ZOOM_THRESHHOLD: "SET_ZOOM_THRESHHOLD",
   SET_MAP_BOUNDS: "SET_MAP_BOUNDS",
   SET_FIRESTATIONS: "SET_FIRESTATIONS",
   SET_OPEN_POPUP: "SET_OPEN_POPUP",
   SAVE_RESULTS: "SAVE_RESULTS",
   FIT_MAP_TO_RESULTS: "FIT_MAP_TO_RESULTS",
   CREATE_PENDING_ADDITION: "CREATE_PENDING_ADDITION",
   CREATE_PENDING_DELETION: "CREATE_PENDING_DELETION",
   CREATE_PENDING_EDIT: "CREATE_PENDING_EDIT"

}

export const setMapReference = mapRef => ({
   type: C.SET_MAP_REFERENCE,
   mapRef
})

export const setMapCenter = center => ({
   type: C.SET_MAP_CENTER,
   center
})

export const setMapZoom = zoom => ({
   type: C.SET_MAP_ZOOM,
   zoom
})

export const setZoomThreshhold = zoom => ({
   type: C.SET_ZOOM_THRESHHOLD,
   zoom
})

export const setMapBounds = bounds => ({
   type: C.SET_MAP_BOUNDS,
   bounds
})

export const setFireStations = stations => ({
   type: C.SET_FIRESTATIONS,
   stations
})

export const setOpenPopup = id => ({
   type: C.SET_OPEN_POPUP,
   id
})

export const getStations = search => {

   const { zoom, zoomThreshhold } = store.getState().map

   const boundsToUse = search.bounds || store.getState().map.bounds

   const query = {
      searchTerms: search.searchTerms !== "none" 
         ? search.searchTerms || store.getState().nav.currentSearchTerms
         : null,
      coords: search.bounds !== "ignore" 
      ? {
         south: boundsToUse.getSouth(),
         north: boundsToUse.getNorth(),
         east: boundsToUse.getEast(),
         west: boundsToUse.getWest()
      } 
      : null,
      newSearch: search.newSearch
   }

   console.log('Call:', query)

   fetch('/api/getstations', {
      method: "POST",
      headers: {
         'Content-Type': 'application/json'
      },
      body: JSON.stringify(query)
   })
   .then( res => res.json() )
   .then( res => {

      console.log('Response:', res)

      if (res.stations.length > 500 && search.newSearch){

         store.dispatch( saveResults(res) )
         store.dispatch( setSnackbar('warning') )

      } else {

         displayStations(res, search)

      }

   })

}

export const displayStations = (res, search) => {

   const results = res || store.getState().map.results

   if (results.fitMapToResults){
      fitMapToResults(results.stations)
   }
   store.dispatch( setFireStations(results.stations) )

   // if getStations called from a new search, close the snackbar
   if (search.searchTerms || search.closeSnackbar){
      store.dispatch( setSnackbar(null) )
   }

}


export const saveResults = results => ({
   type: C.SAVE_RESULTS,
   results
})



export const fitMapToResults = results => {

   const { mapRef } = store.getState().map
   store.dispatch( setZoomThreshhold(0) )

   const latlngs = results.map( station => {
      if (station.Latitude && station.Longitude){
         return L.marker([station.Latitude, station.Longitude])
      }
   }).filter( point => point )
   console.log('latlngs', latlngs)
   const group = L.featureGroup(latlngs)

   mapRef.fitBounds(group.getBounds(), {padding: [40, 40]})

}

export const geocodeStation = values => {

   console.log('values in geocodeStation', values)

   fetch('/api/geocodestation', {
      method: "POST",
      headers: {
         'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
   })
      .then( res => res.json() )
      .then( res => {
         console.log(res)
         store.dispatch( createPendingAddition(values, res) )
         store.dispatch( setSnackbar(null) )
      })
      .catch( err => console.error(err) )

}


export const createPendingAddition = (search, results) => ({
   type: C.CREATE_PENDING_ADDITION,
   pendingAddition: {
      search, 
      geocoded: results
   }
})


export const addStation = () => {

   const { search, geocoded } = store.getState().map.pendingAddition
   
   const stationToAdd = {
      ...search,
      Latitude: geocoded.results[0].location.lat,
      Longitude: geocoded.results[0].location.lng
   }

   console.log('stationToAdd', stationToAdd)

   return function(dispatch){

      return fetch('/api/addstation', {
         method: "POST",
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(stationToAdd)
      })
         .then( res => res.json() )
         .then( res => {
            console.log('response after adding station', res)
            dispatch(createPendingAddition(null))
            dispatch(clearSearchTerms())
            getStations({searchTerms: 'none'})
            dispatch(setOpenPopup(res._id))
         })

   }


}



export const createPendingDeletion = id => {

   if (id){
      store.dispatch( setSnackbar('delete') )
   }

   return {
      type: C.CREATE_PENDING_DELETION,
      id
   }

}


export const deleteStation = () => {

   fetch('/api/deleteStation', {
      method: "POST",
      headers: {
         'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: store.getState().map.pendingDeletion })
   })
      .then( res => res.json() )
      .then( res => {
         console.log('deleteStation', res)
         store.dispatch( setSnackbar(null) )
         store.dispatch( createPendingDeletion(null) )
         store.dispatch(setOpenPopup(null))
         getStations({})
      })

}


export const createPendingEdit = values => {

   if (values) {
      store.dispatch( setSnackbar('edit') )
   }

   return {
      type: C.CREATE_PENDING_EDIT,
      values
   }
}

export const saveEdit = values => {

   fetch('/api/editStation', {
      method: "POST",
      headers: {
         'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
   })
      .then( res => res.json() )
      .then( res => {
         console.log('response to edit', res)
         store.dispatch( createPendingEdit(null) )
         store.dispatch( setSnackbar(null) )
         store.dispatch( createPendingEdit(null) )
         getStations({})
      })

}