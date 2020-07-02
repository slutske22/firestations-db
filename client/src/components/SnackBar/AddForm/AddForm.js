import React from 'react'
import { useSelector } from 'react-redux'
import { MultiStepWizard, WizardStep } from './MultiStepWizard'
import Step1, { step1validation } from './Step1'
import Step2, { step2validation } from './Step2'

const initialValues = {
   "FDID": '',
   "Fire dept name": '',
   "HQ addr1": '',
   "HQ addr2": '',
   "HQ city": '',
   "HQ state": '',
   "HQ zip": '',
   "HQ phone": '',
   "HQ fax": '',
   "County": '',
   "Dept Type": '',
   "Organization Type": [],
   "Website": '',
   "Number Of Stations": '',
   "Active Firefighters - Career": '',
   "Active Firefighters - Volunteer": '',
   "Active Firefighters - Paid per Call": '',
   "Non-Firefighting - Civilian": '',
   "Non-Firefighting - Volunteer": '',
   "Primary agency for emergency mgmt": '',
}

const AddForm = () => {

   // If there's already content in the Add form, and user wants to go back and edit before submitting, use that content.  Otherwise, Use the initialValues object (all empty fields for new addition)
   const search = useSelector(state => state.map.pendingAddition?.search)

   return (

      <div className="Add">

         <h2>Add a Station</h2>

         <section>
            <MultiStepWizard
               // If there's already content in the Add form, and user wants to go back and edit before submitting, use that content.  Otherwise, Use the initialValues object (all empty fields for new addition)
               initialValues={search || initialValues} >
                  <WizardStep 
                     validationSchema={step1validation}
                     onSubmit={() => console.log("Step1 onSubmit")}>
                     <Step1 />
                  </WizardStep>
                  <WizardStep 
                     validationSchema={step2validation}
                     onSubmit={() => console.log("Step1 onSubmit")}>
                     <Step2 />
                  </WizardStep>
            </MultiStepWizard>
         </section>
         
      </div>

   )

}

export default AddForm