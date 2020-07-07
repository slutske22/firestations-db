import React from 'react'
import { useSelector } from 'react-redux'
import { MultiStepWizard, WizardStep } from './MultiStepWizard'
import Step1, { step1validation } from '../AddForm/Step1'
import Step2, { step2validation } from '../AddForm/Step2'

const EditForm = () => {

   const initialValues = useSelector(state => state.map.pendingEdit)

   return (

      <div className="Add">

         <h2>Edit Department Details</h2>

         <section>
            <MultiStepWizard
               initialValues={initialValues}>
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

export default EditForm