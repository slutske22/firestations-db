import { C } from "./actions"

const initialState = {
   map: {
      reference: undefined,
      center: [35, -116],
      zoom: 8
   }
}


export function rootReducer(state = initialState, action){

   switch(action.type){

      case C.SET_MAP_REFERENCE:
         return {
            ...state,
            map: {
               ...state.map,
               reference: action.reference
            }
         }

      case C.SET_MAP_CENTER:
         return {
            ...state,
            map: {
               ...state.map,
               center: action.center
            }
         }

      case C.SET_MAP_ZOOM:
         return {
            ...state,
            map: {
               ...state.map,
               zoom: action.zoom
            }
         }

      case C.SET_MAP_BOUNDS:
         return {
            ...state,
            map: {
               ...state.map,
               bounds: action.bounds
            }
         }

      default:
         return state


   }

}