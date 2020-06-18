import React from 'react';
import { withFormik, Form, Field } from 'formik'
import * as Yup from 'yup'

const Search = ({
   values,
   setFieldValue,
}) => {
   return ( 
      <div className="Search">
         <h2>Search for Stations</h2>
         <section>
         
            <Form>
               <fieldset className="row">
                  <legend>ID</legend>
                  <div className="input-field col s6">
                     <label>
                        Federal ID: 
                        <Field type="text" name="FDID" />
                     </label>
                  </div>
                  <div className="input-field col s6">
                     <label>
                        Department Name: 
                        <Field type="text" name="Fire dept name" />
                     </label>
                  </div>
               </fieldset>
               
               <fieldset className="row">
                  <legend>Address</legend>
                  <div className="input-field col s6">
                     <label>
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
                     <label>
                        City: 
                        <Field type="text" name="HQ city" />
                     </label>
                  </div>
                  <div className="input-field col s6">
                     <label>
                        County: 
                        <Field type="text" name="County" />
                     </label>
                  </div>
                  <div className="input-field col s6">
                     <label>
                        State: 
                        <Field type="text" name="HQ state" />
                     </label>
                  </div>  
                  <div className="input-field col s6">
                     <label>
                        Zip Code: 
                        <Field type="number" max="99999" min="0" name="HQ zip" />
                     </label>
                  </div> 
               </fieldset>
               
               <fieldset className="row">
                  <legend>Department Profile</legend>
                  <p>Type:</p>
                  <label>
                     Career
                     <input 
                        type="radio" 
                        name="Organization Type"
                        value="Career"
                        checked={values["Organization Type"] === "Career"}
                        onChange={() => setFieldValue("Organization Type", "Career")} />
                  </label>
                  <label>
                     Volunteer
                     <input 
                        type="radio" 
                        name="Organization Type"
                        value="Volunteer"
                        checked={values["Organization Type"] === "Volunteer"}
                        onChange={() => setFieldValue("Organization Type", "Volunteer")} />
                  </label>
               </fieldset>

               <button className="submit" type="submit">
                  Add Station
               </button>
            </Form>
            
         </section>
      </div>
    );
}

const FormikSearch = withFormik({
   mapPropsToValues(){
      return {
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
         "Organization Type": '',
         "Website": '',
         "Number Of Stations": '',
         "Active Firefighters - Career": '',
         "Active Firefighters - Volunteer": '',
         "Active Firefighters - Paid per Call": '',
         "Non-Firefighting - Civilian": '',
         "Non-Firefighting - Volunteer": '',
         "Primary agency for emergency mgmt": '',
      }
   },
   handleSubmit(values){
      console.log(values)
   },
   validationSchema: Yup.object().shape({

   })
})(Search)
 
export default FormikSearch;