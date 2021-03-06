import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { GoSearch } from 'react-icons/go'
import { BsInfoCircle } from 'react-icons/bs'
import { RiMapPinAddLine } from 'react-icons/ri'

import { setSnackbar } from '../store/actions/navigationActions'

import '../css/Menu.scss'

const Menu = () => {

   const snackbar = useSelector(state => state.nav.snackbar)
   const dispatch = useDispatch()

   return ( 
      <div className="Menu">
         <div 
            className={`item ${snackbar === 'search' ? 'active' : ''}`} 
            onClick={ () => dispatch( setSnackbar('search') ) } >
            <span>Search</span>
            <GoSearch className="icon" />
         </div>
         <div 
            className={`item ${snackbar === 'add' ? 'active' : ''}`} 
            onClick={ () => dispatch( setSnackbar('add') ) } >
            <span>Add</span>
            <RiMapPinAddLine className="icon" />
         </div>
         <div 
            className={`item ${snackbar === 'info' ? 'active' : ''}`} 
            onClick={ () => dispatch( setSnackbar('info') ) } >
            <span>Information</span>
            <BsInfoCircle className="icon" />
         </div>

      </div>
    );
}
 
export default Menu;