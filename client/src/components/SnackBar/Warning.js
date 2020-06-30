import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { getStations, displayStations, setZoomThreshhold } from '../../store/actions/mapActions'

import '../../css/Warning.scss'

const Warning = () => {

   const zoomThreshhold = useSelector( state => state.map.zoomThreshhold )
   const dispatch = useDispatch()

   return (
      <div className="Warning">

         <h2 className="warning">Warning</h2>

         <section>

            <p>Your search returned over 500 stations.  Trying to render these all at once may strain or crash the appliation.</p>

            <div className="option">
               <button 
                  onClick={ () => {
                     getStations({newSearch: true})
                     dispatch( setZoomThreshhold(8) )
                  }} >
                  Apply as Filter
               </button>
               <span>Only show stations when zoomed in by a certain amount (this is the default behavior)</span>
            </div>

            <div className="option">
               <button 
                  className="warning"
                  onClick={ () => {
                     displayStations(null, { searchTerms: true }) 
                     }} >
                     Force Render
                  </button>
               <span>Fit the map to contain all stations and force the browser to render them.  The application may freeze, crash, or take a long time to respond.</span>
            </div>

         </section>


      </div>
   )


}

export default Warning