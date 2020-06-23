import { C } from "../actions/mapActions"

export const initialState = {
   mapRef: undefined,
   center: [35, -116],
   zoom: 9,
   zoomThreshhold: 8,
   bounds: undefined,
   stations: [],
   openPopupId: null
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

      case C.SET_MAP_BOUNDS:
         return {
            ...state,
            bounds: action.bounds
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

      default:
         return state


   }

}