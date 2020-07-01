import React from 'react'
import { useDispatch } from 'react-redux'

const ConfirmAddition = () => {
   return ( 
      <div className="ConfirmAddition">
         <h2>Does this look correct?</h2>
         <button>
            &lt; Edit
         </button>
         <button>
            Yes, Add to database &gt;
         </button>
      </div>
    );
}
 
export default ConfirmAddition;