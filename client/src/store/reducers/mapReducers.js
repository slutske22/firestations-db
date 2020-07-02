import { C } from "../actions/mapActions"

export const initialState = {
   mapRef: undefined,
   center: [35, -116],
   zoom: 9,
   zoomThreshhold: 8,
   bounds: undefined,
   results: undefined,
   stations: [],
   openPopupId: null,
   pendingAddition: null
}


export function mapReducers(state = initialState, action){

   switch(action.type){

      case C.SET_MAP_REFERENCE:
         return {
            ...state,
            mapRef: action.mapRef
         }

      case C.SET_MAP_CENTER:
         return {
            ...state,
            center: action.center
         }

      case C.SET_MAP_ZOOM:
         return {
            ...state,
            zoom: action.zoom
         }

      case C.SET_ZOOM_THRESHHOLD:
         return {
            ...state,
            zoomThreshhold: action.zoom
         }

      case C.SET_MAP_BOUNDS:
         return {
            ...state,
            bounds: action.bounds
         }

      case C.SAVE_RESULTS:
         return {
            ...state,
            results: action.results
         }
         
      case C.SET_FIRESTATIONS:
         return {
            ...state,
            stations: action.stations
         }

      case C.SET_OPEN_POPUP:
         return {
            ...state,
            openPopupId: action.id
         }

      case C.CREATE_PENDING_ADDITION:
         return {
            ...state,
            pendingAddition: action.pendingAddition
         }

      default:
         return state


   }

}