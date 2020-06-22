import React from 'react'
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

const AddForm = () => (

   <div className="Add">

      <h2>Add a Station</h2>

      <section>
         <MultiStepWizard
            initialValues={initialValues} >
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

export default AddForm