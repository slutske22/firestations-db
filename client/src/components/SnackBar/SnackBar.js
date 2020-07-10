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
import Loading from './Loading'

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
   const loading = useSelector(state => state.nav.loading)
   const dispatch = useDispatch()

   return ( 
      <div className={`SnackBar wrapper ${snackbar}`}>
         <div className={`content ${loading ? 'loading' : ''}`}>
            { (snackbar === "add" || snackbar === "info" || snackbar === "search" || snackbar === "edit") && 
               <FaTimes 
                  size={28}
                  className="close-button" 
                  onClick={ () => dispatch( setSnackbar(null) ) } />
            }
            {menus[snackbar]}
         </div>
         {loading && snackbar !== 'info' && <Loading />}
      </div>
    );
}
 
export default SnackBar;