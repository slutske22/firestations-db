import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { FaTimes } from 'react-icons/fa'


import '../css/ActiveFilter.scss'

const ActiveFilter = () => {

   const currentFilter = useSelector(state => state.nav.currentFilter)

   if (currentFilter?.length > 0){
      return ( 
         <div className="ActiveFilter">
            <div>Filters: </div>
            {currentFilter.map( (term, index) => (
               <div className="search-term" key={term.name}>
                  {term.name}: {term.value}{index === currentFilter.length - 1 ? '' : ','}
               </div>
            ))}
            <FaTimes />
         </div>
      )
   } else {
      return null
   }
 
}
 
export default ActiveFilter;