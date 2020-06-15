import React from 'react';
import FemaLogo from '../assets/fema-logo-blue_medium.png'

const Info = () => {
   return ( 
      <div className="info">
         <h2>FEMA Fire Stations Database</h2>
         <section>
            <p className="image-wrapper">
               <img src={FemaLogo} alt="FEMA Logo" className="fema-logo" />
            </p>
            <p>
               This map displays fire stations registered with the Federal Emergency Management Agency (FEMA).  The FEMA registry can be found <a href="https://apps.usfa.fema.gov/registry/" target="_blank" rel="noopener noreferer">here</a>.  It is not a complete list of fire stations in the US.
            </p>
            <p>
               You can filter and search fire stations by clicking on the "Search" button in the lower right corner.  You can also add fire stations to the registry by clicking the "Add" button.
            </p>
         </section>
      </div>
    );
}
 
export default Info;