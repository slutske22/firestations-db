import React from 'react';
import FemaLogo from '../../assets/fema-logo-blue_medium.png'

const Info = () => {
   return ( 
      <div className="Info">
         <h2>FEMA Fire Dept Database</h2>
         <section>
            <p className="image-wrapper">
               <img src={FemaLogo} alt="FEMA Logo" className="fema-logo" />
            </p>
            <p>
               This map displays fire departments registered with the Federal Emergency Management Agency (FEMA).  The FEMA registry can be found <a href="https://apps.usfa.fema.gov/registry/" target="_blank" rel="noopener noreferer">here</a>.  It is not a complete list of fire stations in the US.
            </p>
            <p>
               You can filter and search fire departments by clicking on the "Search" button in the lower right corner.  You can add fire departments to the map by clicking the "Add" button.  You can edit or delete departments by clicking the "Edit" or "Delete" buttons in a deparement's popup on the map.
            </p>
            <p>
               This page is not connected to the official FEMA registry database.  Changes made here will not be reflected there, and vice versa.  This page is a proof-of-concept project for demonstration purposes.  Adding or editing the dataset is open to the public, so please be considerate when doing so.
            </p>
         </section>
      </div>
    );
}
 
export default Info;