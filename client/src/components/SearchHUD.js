import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { FaTimes } from 'react-icons/fa'


import '../css/SearchHUD.scss'

const SearchHUD = () => {

   const currentSearch = useSelector(state => state.nav.currentSearchTerms)
   console.log('currentSearch', currentSearch)
   const searchterms = []
   for (var key in currentSearch){
      if (typeof currentSearch[key] === "string" 
         && currentSearch[key] !== "" 
         && currentSearch[key] !== "$or" 
         && currentSearch[key] !== "$and"){

         searchterms.push({
            name: key,
            value: currentSearch[key]
         })

      } else if (typeof currentSearch[key] === "object" && currentSearch[key].length > 0) {
         
         searchterms.push({
            name: key,
            value: currentSearch[key].join(', ')
         })
         
      }
   }

   console.log('searchterms from SearchHUD', searchterms)

   if (searchterms.length > 0){
      return ( 
         <div className="SearchHUD">
            <div>Filters: </div>
            {searchterms.map( term => (
               <div className="search-term" key={term.name}>
                  {term.name}: {term.value},
               </div>
            ))}
            <FaTimes />
         </div>
      )
   } else {
      return null
   }
 
}
 
export default SearchHUD;