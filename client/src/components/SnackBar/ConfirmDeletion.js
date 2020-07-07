import React from 'react'
import { useDispatch } from 'react-redux'
import { setSnackbar } from '../../store/actions/navigationActions'
import { createPendingDeletion, deleteStation } from '../../store/actions/mapActions'

const ConfirmDeletion = () => {

   const dispatch = useDispatch()

   return (
      <div className="ConfirmDeletion">
         <h4>Are you sure you want to delete this station?  This action is not reversible</h4>
         <div className="button-group">
            <button onClick={ () => {
               console.log('cancel deletion')
               dispatch( setSnackbar(null) )
               dispatch( createPendingDeletion(null) )
            }}>
               Cancel
            </button>
            <button onClick={deleteStation}>
               Yes, Delete
            </button>
         </div>
      </div>
   )

}

export default ConfirmDeletion