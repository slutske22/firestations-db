import { C } from "../actions/mapActions"

const initialState = {
   reference: undefined,
   center: [35, -116],
   zoom: 8,
   zoomThreshhold: 8
}


export function mapReducers(state = initialState, action){

   switch(action.type){

      case C.SET_MAP_REFERENCE:
         return {
            ...state,
            reference: action.reference
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

      default:
         return state


   }

}