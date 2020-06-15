import { C } from '../actions/navigationActions'

const initialState = {
   snackbar: 'info'
}

export function navigationReducers(state = initialState, action){

   switch(action.type){

      case C.SET_SNACKBAR:
         return {
            ...state,
            snackbar: action.snackbar
         }

      default:
         return state

   }

}