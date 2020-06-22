
import React, { useState } from "react";
import { Form, Formik } from "formik";

export const MultiStepWizard = ({ children, initialValues, onSubmit }) => {

   const [stepNumber, setStepNumber] = useState(0)
   const steps = React.Children.toArray(children)
   const [snapshot, setSnapshot] = useState(initialValues)


   const step = steps[stepNumber]
   const totalSteps = steps.length
   const isLastStep = stepNumber === totalSteps - 1

   const next = values => {
      setSnapshot(values)
      setStepNumber(stepNumber + 1)
   }

   const previous = values => {
      setSnapshot(values)
      setStepNumber(stepNumber - 1)
   }

   const handleSubmit = values => {
      if (!isLastStep){
         next(values)
      } else {
         console.log(values)
      }
   }

   return (
      <Formik
         initialValues={snapshot}
         onSubmit={handleSubmit}
         validationSchema={step.props.validationSchema}
         validateOnBlur={false}
         validateOnChange={false} >
         {formik => (
            <Form>
               {React.cloneElement(step, { 
                  values: formik.values, 
                  setFieldValue: formik.setFieldValue,
                  handleChange: formik.handleChange
               })}
               <footer>
                  {stepNumber > 0 && 
                     <button onClick={() => previous(formik.values)} type="button">
                        Back
                     </button>
                  }
                  <button type="submit" >
                     {isLastStep ? 'Add' : 'Next'}
                  </button>
                  
               </footer>
            </Form>
         )}
      </Formik>
   )

}

export const WizardStep = ({ children, values, setFieldValue, handleChange }) => React.cloneElement(children, { values, setFieldValue, handleChange })
