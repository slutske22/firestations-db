import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FaTimes } from 'react-icons/fa'

import AddForm from './AddForm/AddForm'
import EditForm from './EditForm/EditForm'
import Info from './Info'
import Search from './Search'
import Warning from './Warning'
import ConfirmAddition from './ConfirmAddition'
import ConfirmDeletion from './ConfirmDeletion'

import { setSnackbar } from '../../store/actions/navigationActions'


import '../../css/SnackBar.scss'

const menus = {
   add: <AddForm />,
   info: <Info />,
   search: <Search />,
   warning: <Warning />,
   confirm: <ConfirmAddition />,
   delete: <ConfirmDeletion />,
   edit: <EditForm />
}

const SnackBar = () => {

   const snackbar = useSelector(state => state.nav.snackbar)
   const dispatch = useDispatch()

   return ( 
      <div className={`SnackBar wrapper ${snackbar}`}>
         <div className="content">
            { (snackbar === "add" || snackbar === "info" || snackbar === "search" || snackbar === "edit") && 
               <FaTimes 
                  size={28}
                  className="close-button" 
                  onClick={ () => dispatch( setSnackbar(null) ) } />
            }
            {menus[snackbar]}
         </div>
      </div>
    );
}
 
export default SnackBar;