import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { FaTimes } from 'react-icons/fa'

import { getStations } from '../store/actions/mapActions'
import { clearSearchTerms } from '../store/actions/navigationActions'


import '../css/ActiveFilter.scss'

const ActiveFilter = () => {

   const currentFilter = useSelector(state => state.nav.currentFilter)
   const dispatch = useDispatch()

   if (currentFilter?.length > 0){
      return ( 
         <div className="ActiveFilter">
            <div>Filters: </div>
            {currentFilter.map( (term, index) => (
               <div className="search-term" key={term.name}>
                  {term.name}: {term.value}{index === currentFilter.length - 1 ? '' : ','}
               </div>
            ))}
            <FaTimes 
               className="clear-button" 
               title="Clear Filters" 
               size={20}
               onClick={ () => {
                  getStations({searchTerms: "none"})
                  dispatch( clearSearchTerms() )
               }} />
         </div>
      )
   } else {
      return null
   }
 
}
 
export default ActiveFilter;