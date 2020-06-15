import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { IconContext } from "react-icons";
import { FaTimes } from 'react-icons/fa'
import Add from './Add'
import Info from './Info'
import Search from './Search'
import { setSnackbar } from '../store/actions/navigationActions'


import '../css/SnackBar.scss'

const menus = {
   add: <Add />,
   info: <Info />,
   search: <Search />
}

const SnackBar = () => {

   const snackbar = useSelector(state => state.nav.snackbar)
   const dispatch = useDispatch()

   return ( 
      <div className="SnackBar wrapper">
         <div className="content">
            <FaTimes 
               size={28}
               className="close-button" 
               onClick={ () => dispatch( setSnackbar(null) ) } />
            {menus[snackbar]}
         </div>
      </div>
    );
}
 
export default SnackBar;