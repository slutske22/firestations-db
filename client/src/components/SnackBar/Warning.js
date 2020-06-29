import React from 'react'
import { useSelector } from 'react-redux'

const Warning = () => {

   const zoomThreshhold = useSelector( state => state.map.zoomThreshhold )

   return (
      <div className="Warning">
         <h2>Warning</h2>
         <p>Your search returned over 500 stations.  Trying to render these all at once may strain or crash the appliation.</p>

         <div className="option">
            <button>Apply as Filter</button>
            <span>Only show stations when zoomed in by a certain amount (this is the default behavior)</span>
         </div>

         <div className="option">
            <button>Force Render</button>
            <span>Fit the map to contain all stations and force the browser to render them.</span>
         </div>

      </div>
   )


}

export default Warning