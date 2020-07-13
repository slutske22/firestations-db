import React from 'react'
import { useSelector } from 'react-redux'
import { TiWarning } from 'react-icons/ti'
import ReactTooltip from 'react-tooltip'

import '../css/NoStationWarning.scss'

const NoStationWarning = () => {

   const stations = useSelector(state => state.map.stations)
   const zoom = useSelector(state => state.map.zoom)
   const zoomThreshhold = useSelector(state => state.map.zoomThreshhold)

   console.log('zoom', zoom, 'zoomThreshhold', zoomThreshhold)


   if (zoom > zoomThreshhold) {

      return null

   } else {

      if (stations.length > 0 && zoom >= zoomThreshhold) {

         return null

      } else {

         return (

            <div className="NoStationWarning">
   
               <TiWarning id="warning-icon" data-tip data-for='nostationwarning' size={30} />
   
               <ReactTooltip 
                  id="nostationwarning" 
                  effect='solid' 
                  border borderColor='snow' 
                  backgroundColor="rgba(0,0,0,0.85)" 
                  className="tooltip" 
                  arrowColor="transparent"
                  overridePosition={ ({ left, bottom, top }) => {
                     const warningIcon = document.getElementById('warning-icon')
                     const iconTop = Math.floor(warningIcon.getBoundingClientRect().top)
                     left = 20; 
                     bottom = window.innerHeight - iconTop + 10;
                     top = 'auto';
                     return { left, bottom, top }
                  }}>
   
                  <p>
                     Don't see any departments on the map?  This may happen if your filter does not produce any results in the current map boundary, or if you are too far zoomed out.
                  </p>
   
               </ReactTooltip>
   
            </div>
            
         )
      }

      

   }

}

export default NoStationWarning