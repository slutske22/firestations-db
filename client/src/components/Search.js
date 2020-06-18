import React from 'react';
import { withFormik, Form, Field, FieldArray } from 'formik'
import * as Yup from 'yup'

const Search = ({
   values,
   setFieldValue,
}) => {
   
   const toggleRadioButton = (field, value) => {
      if (values[field] !== value){
         setFieldValue(field, "value")
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
      {value: "Federal DOD", name: "Federal (Department of Defense)"},
      {value: "Federal Exec", name: "Federal (Executive Branch)"},
      {value: "Contract", name: "Contract"},
      {value: "Private", name: "Private"},
      {value: "Other", name: "Other"},
   ]
   
   const firefighterTypes = [
      "Active Firefighters - Career",
      "Active Firefighters - Volunteer",
      "Active Firefighters - Paid per Call",
      "Non-Firefighting - Civilian",
      "Non-Firefighting - Volunteer",
   ]
   
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
                  <legend>Location</legend>
                  {/*<div className="input-field col s6">
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
                  </div>*/}
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
                  
                  <div className="type-group dept-type">
                     <p className="title">Department Type:</p>
                     {deptTypes.map(type =>
                        <label className="radio-name" key={type.value}>
                           <input 
                              className="radio dept-type"
                              type="checkbox"
                              name="Dept Type"
                              value={type.value}
                              checked={values["Dept Type"].includes(type.value)}
                              onChange={ e => {
                                 if (!values["Dept Type"].includes(type.value)){
                                    values["Dept Type"].push(type.value)
                                 } else {
                                    const idx = values["Dept Type"].indexOf(type.value)
                                    values["Dept Type"].splice(idx, 1)
                                 }
                                 setFieldValue("Dept Type", values["Dept Type"])
                              }}
                           />
                           <span>{type.name}</span>
                        </label>
                     )}
                  </div>

                     
                  <div className="type-group org-type">
                     <p className="title">Organization Type:</p>
                     <div className="vertical">
                        {orgTypes.map(type =>
                           <label className="radio-name" key={type.name}>
                              <input 
                                 className="radio org-type"
                                 type="checkbox"
                                 name="Organization Type"
                                 value={type.value}
                                 checked={values["Organization Type"].includes(type.value)}
                                 onChange={ e => {
                                    if (!values["Organization Type"].includes(type.value)){
                                       values["Organization Type"].push(type.value)
                                    } else {
                                       const idx = values["Dept Type"].indexOf(type.value)
                                       values["Organization Type"].splice(idx, 1)
                                    }
                                    setFieldValue("Organization Type", values["Organization Type"])
                                 }}
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
                           <input 
                              type="checkbox" 
                              name={type}
                              checked={values[type].use}
                              onChange={ e => {
                                 if (!values[type].use){
                                    values[type].use = true
                                 } else {
                                    values[type].use = null
                                 }
                                 setFieldValue(type.use, values[type].use)
                              }} />
                           <span>{type}</span>
                        </label>
                        
                        <div className="min-max-inputs">
                           <label>
                              <span>At Least:</span>
                              <Field 
                                 type="number" 
                                 name={`${type}.min`}
                                 min="0"
                                 disabled={!values[type].use} />
                           </label>
                           <label>
                              <span>At Most:</span>
                              <Field 
                                 type="number" 
                                 name={`${type}.max`}
                                 max="0"
                                 disabled={!values[type].use} />
                           </label>
                        </div>
                        
                     </div>
                  ))}

                  
               </fieldset>

               <button className="submit" type="submit">
                  Search
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
         "Dept Type": [],
         "Organization Type": [],
         "Website": '',
         "Number Of Stations": '',
         "Active Firefighters - Career": {use: null, min:'', max: ''},
         "Active Firefighters - Volunteer": {use: null, min:'', max: ''},
         "Active Firefighters - Paid per Call": {use: null, min:'', max: ''},
         "Non-Firefighting - Civilian": {use: null, min:'', max: ''},
         "Non-Firefighting - Volunteer": {use: null, min:'', max: ''},
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