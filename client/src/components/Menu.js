import React from 'react'
import { GoSearch } from 'react-icons/go'
import { BsInfoCircle } from 'react-icons/bs'
import { RiMapPinAddLine } from 'react-icons/ri'

import '../css/Menu.scss'

const Menu = () => {
   return ( 
      <div className="Menu">
         <div className="item">
            Search
            <GoSearch className="icon" />
         </div>
         <div className="item">
            Add
            <RiMapPinAddLine className="icon" />
         </div>
         <div className="item">
            Information
            <BsInfoCircle className="icon" />
         </div>

      </div>
    );
}
 
export default Menu;