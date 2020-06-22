import React from 'react';
import { withFormik, Form, Field, FieldArray } from 'formik'
import * as Yup from 'yup'
import { states } from '../states'


const Add = ({
   values,
   handleChange,
   setFieldValue,
   resetForm
}) => {
   
   const toggleRadioButton = (field, value) => {
      if (values[field] !== value){
         setFieldValue(field, value)
      } else {
         setFieldValue(field, '')
      }
   }
   
   const deptTypes = [
      {value: "Career", name: "Career"},
      {value: "Volunteer", name: "Volunteer"},
      {value: "Mostly volunteer", name: "Mostly Volunteer"},
   ]
   
   const orgTypes = [
      {value: "Local", name: "Local"},
      {value: "State", name: "State"},
      {value: "Contract", name: "Contract"},
      {value: "Private", name: "Private"},
      {value: "Federal DOD", name: "Federal (Department of Defense)"},
      {value: "Federal Exec", name: "Federal (Executive Branch)"},
      {value: "Other", name: "Other"},
   ]
   
   const firefighterTypes = [
      "Number of Stations",
      "Active Firefighters - Career",
      "Active Firefighters - Volunteer",
      "Active Firefighters - Paid per Call",
      "Non-Firefighting - Civilian",
      "Non-Firefighting - Volunteer",
   ]
   
   return ( 
      <div className="Add">
         <h2>Add a Station</h2>
         <section>
         
            <Form>
               <fieldset className="row">
               
                  <small className="required-message">
                     <span className="asterisk">*</span> Indicates a Required Field
                  </small>
               
                  <legend>ID</legend>
                  <div className="input-field col s6">
                     <label className="required">
                        Federal ID: 
                        <Field type="text" name="FDID" />
                     </label>
                  </div>
                  <div className="input-field col s6">
                     <label className="required">
                        Department Name: 
                        <Field type="text" name="Fire dept name" />
                     </label>
                  </div>
               </fieldset>
               
               <fieldset className="row">
                  <legend>Location</legend>
                  <div className="input-field col s6">
                     <label className="required">
                        Address 1: 
                        <Field type="text" name="HQ addr1" />
                     </label>
                  </div>
                  <div className="input-field col s6">
                     <label>
                        Address 2: 
                        <Field type="text" name="HQ addr2" />
                     </label>
                  </div>
                  <div className="input-field col s6">
                     <label className="required">
                        City: 
                        <Field type="text" name="HQ city" />
                     </label>
                  </div>
                  <div className="input-field col s6">
                     <label className="required">
                        County: 
                        <Field type="text" name="County" />
                     </label>
                  </div>
                  <div className="input-field col s6">
                     <label className="required">
                        State: 
                        <Field component="select" name="HQ state" placeholder="Choose a State">
                           <option value="" defaultValue> </option>
                           {states.map( state =>  
                              <option key={state.name} value={state.abbreviation}>
                                 {state.name}
                              </option>   
                           )}
                        </Field>
                     </label>
                  </div>  
                  <div className="input-field col s6">
                     <label className="required">
                        Zip Code: 
                        <Field type="number" max="99999" min="0" name="HQ zip" />
                     </label>
                  </div> 
                  <div className="input-field col s6">
                     <label className="required">
                        Phone: 
                        <Field type="tel" name="HQ phone" />
                     </label>
                  </div>                   
                  <div className="input-field col s6">
                     <label>
                        Fax: 
                        <Field type="tel" name="HQ fax" />
                     </label>
                  </div> 
                  <div className="input-field col s6">
                     <label>
                        Website: 
                        <Field type="text" name="Website" />
                     </label>
                  </div> 
               </fieldset>
               
               <fieldset className="row">
                  <legend>Department Profile</legend>
                  
                  <div className="type-group dept-type">
                     <p className="title required">Department Type:</p>
                     {deptTypes.map(type =>
                        <label className="radio-name" key={type.value}>
                           <input 
                              className="radio dept-type"
                              type="radio"
                              name="Dept Type"
                              value={type.value}
                              checked={ values["Dept Type"] === type.value }
                              onChange={ handleChange }
                              onClick={ () => toggleRadioButton("Dept Type", type.value) }
                           />
                           <span>{type.name}</span>
                        </label>
                     )}
                  </div>

                     
                  <div className="type-group org-type">
                     <p className="title required">Organization Type:</p>
                     <div className="vertical">
                        {orgTypes.map(type =>
                           <label className="radio-name" key={type.name}>
                              <input 
                                 className="radio org-type"
                                 type="radio"
                                 name="Organization Type"
                                 value={type.value}
                                 checked={ values["Organization Type"] === type.value }
                                 onChange={handleChange}
                                 onClick={ () => toggleRadioButton("Organization Type", type.value) }
                              />
                              <span>{type.name}</span>
                           </label>
                        )}
                     </div>
                  </div>
                  
                  <p className="ff-title">Number of:</p>
                  {firefighterTypes.map( type => (
                     <div className="input-field col s6 type-group ff-type" key={type} >
                        <label>
                           <Field 
                              type="number" 
                              min="0"
                              name={type}  />
                           <span className="required">{type}</span>
                        </label>
                        
                     </div>
                  ))}
                  
                  <div className="input-field col s6">
                     <label className="agency">
                        <Field 
                           type="checkbox" 
                           name="Primary agency for emergency mgmt" />
                        <span>Primary Agency for Emergency Management:</span>
                     </label>
                  </div> 

                  
               </fieldset>

               <footer>
                  <button 
                     type="button"
                     className="clear" 
                     onClick={resetForm} >
                     Clear
                  </button>
                  <button className="submit" type="submit">
                     Search
                  </button>
               </footer>

            </Form>
            
         </section>
      </div>
    );
}

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

const FormikAdd = withFormik({
   mapPropsToValues(){
      return initialValues
   },
   handleSubmit(values){
      console.log(values)
   },
   validationSchema: Yup.object().shape({

   })
})(Add)
 
export default FormikAdd