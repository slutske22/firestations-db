import store from '../store'
import { setZoomThreshhold } from './mapActions'
import { initialState } from '../reducers/mapReducers'

export const C = {

   SET_SNACKBAR: "SET_SNACKBAR",
   SAVE_SEARCH_TERMS: "SAVE_SEARCH_TERMS",
   CLEAR_SEARCH_TERMS: "CLEAR_SEARCH_TERMS",
   SET_LOADING_STATUS: "SET_LOADING_STATUS"

}

export const setSnackbar = snackbar => ({
   type: C.SET_SNACKBAR,
   snackbar
})

export const saveSearchTerms = searchTerms => {

   const currentFilter = []

   for (var key in searchTerms){
      if ((typeof searchTerms[key] === "string" || typeof searchTerms[key] === "number") 
         && searchTerms[key] !== "" 
         && searchTerms[key] !== "$or" 
         && searchTerms[key] !== "$and"){

            currentFilter.push({
            name: key,
            value: searchTerms[key]
         })

      } else if (typeof searchTerms[key] === "object" && searchTerms[key].length > 0) {
         
         currentFilter.push({
            name: key,
            value: searchTerms[key].join(', ')
         })
         
      }
   }
   
   return {
      type: C.SAVE_SEARCH_TERMS,
      searchTerms,
      currentFilter
   }
}


export const clearSearchTerms = () => {

   store.dispatch( setZoomThreshhold(initialState.zoomThreshhold) )

   return {
      type: C.CLEAR_SEARCH_TERMS,
      searchTerms: undefined,
      currentFilter: undefined
   }
}

export const setLoadingStatus = status => ({
   type: C.SET_LOADING_STATUS,
   status
})
