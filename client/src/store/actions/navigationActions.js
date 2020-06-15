export const C = {

   SET_SNACKBAR: "SET_SNACKBAR"

}

export const setSnackbar = snackbar => ({
   type: C.SET_SNACKBAR,
   snackbar
})