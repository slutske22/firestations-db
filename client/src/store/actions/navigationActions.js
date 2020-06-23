export const C = {

   SET_SNACKBAR: "SET_SNACKBAR",
   SAVE_SEARCH_TERMS: "SAVE_SEARCH_TERMS"

}

export const setSnackbar = snackbar => ({
   type: C.SET_SNACKBAR,
   snackbar
})

export const saveSearchTerms = searchTerms => ({
   type: C.SAVE_SEARCH_TERMS,
   searchTerms
})