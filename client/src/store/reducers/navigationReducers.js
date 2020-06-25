import { C } from '../actions/navigationActions'

const initialState = {
   snackbar: 'info',
   currentSearchTerms: undefined
}

export function navigationReducers(state = initialState, action){

   switch(action.type){

      case C.SET_SNACKBAR:
         return {
            ...state,
            snackbar: action.snackbar
         }

      case C.SAVE_SEARCH_TERMS:
         return {
            ...state,
            currentSearchTerms: action.searchTerms
         }

      default:
         return state

   }

}