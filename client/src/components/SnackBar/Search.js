import React from 'react';
import { BsQuestionCircle } from 'react-icons/bs'
import { withFormik, Form, Field } from 'formik'
import ReactTooltip from 'react-tooltip'
import * as Yup from 'yup'

import { states } from './states'

import store from '../../store/store'
import { saveSearchTerms } from '../../store/actions/navigationActions'
import { getStations } from '../../store/actions/mapActions'

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
   "Number Of Stations",
   "Active Firefighters - Career",
   "Active Firefighters - Volunteer",
   "Active Firefighters - Paid per Call",
   "Non-Firefighting - Civilian",
   "Non-Firefighting - Volunteer",
]

const Search = ({
   values,
   setFieldValue,
   resetForm
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
                  <legend>Location</legend>
                  <div className="input-field col s6">
                     <label>
                        City: 
                        <Field type="text" name="HQ city" />
                     </label>
                  </div>
                  <div className="input-field col s6">
                     <label>
                        County: 
                        <Field type="text" name="County" autoComplete="off"/>
                     </label>
                  </div>
                  <div className="input-field col s6">
                     <label>
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
                     <div className="dept-type-group">
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
                  </div>

                     
                  <div className="type-group org-type">
                     <p className="title">Organization Type:</p>
                     <div className="vertical">
                        {orgTypes.map(type =>
                           <label className="radio-name" key={type.name}>
                              <Field 
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
                           <Field 
                              type="checkbox" 
                              name={type}
                              onClick={ () => {
                                 if (values[type] === true){
                                    setFieldValue(`${type} min`, '') 
                                    setFieldValue(`${type} max`, '') 
                                 }
                              }}
                              />
                           <span>{type}</span>
                        </label>
                        
                        <div className={`min-max-inputs ${!values[type] ? 'disabled' : ''}`}>
                           <label>
                              <span>At Least:</span>
                              <Field 
                                 type="number" 
                                 name={`${type} min`}
                                 min="0"
                                 disabled={!values[type]} />
                           </label>
                           <label>
                              <span>At Most:</span>
                              <Field 
                                 type="number" 
                                 name={`${type} max`}
                                 disabled={!values[type]} />
                           </label>
                        </div>
                        
                     </div>
                  ))}

                  
               </fieldset>

               <footer>
                  <button 
                     type="button"
                     className="clear" 
                     onClick={() => {
                        resetForm()
                        setFieldValue("Dept Type", [])
                        setFieldValue("Organization Type", [])
                        setFieldValue("HQ state", '')
                     }} >
                     Clear
                  </button>
                  <div className="search-type">
                     <p>
                        Search Type
                        <BsQuestionCircle data-tip data-for='searchtype' />
                        <ReactTooltip id="searchtype" effect='solid' border borderColor='snow' backgroundColor="rgba(0,0,0,0.975)" className="tooltip">
                           <p>Search Type determines whether to include results that match <i>any</i> of your search terms (OR), or to include only results that match <i>all</i> of your search term (AND).</p>
                        </ReactTooltip>
                        :
                     </p>
                     <div className="labels">
                        <label>
                           <input
                              type="radio"
                              name="search_type"
                              value="$and"
                              checked={values.search_type === "$and"}
                              onChange={() => setFieldValue("search_type", "$and")}
                           />
                           <span>AND</span>
                        </label>
                        <label>
                           <input
                              type="radio"
                              name="search_type"
                              value="$or"
                              checked={values.search_type === "$or"}
                              onChange={() => setFieldValue("search_type", "$or")}
                           />
                           <span>OR</span>
                        </label>
                     </div>
                  </div>
                  <button className="submit search" type="submit">
                     Search
                  </button>
               </footer>

            </Form>
            
         </section>
      </div>
    );
}

const initialValues = {
   "search_type": '$or',
   "FDID": '',
   "Fire dept name": '',
   "HQ city": '',
   "HQ state": '',
   "HQ zip": '',
   "County": '',
   "Dept Type": [],
   "Organization Type": [],
   "Number Of Stations": '',
   "Number Of Stations min": '',
   "Number Of Stations max": '',
   "Active Firefighters - Career": '',
   "Active Firefighters - Career min": '',
   "Active Firefighters - Career max": '',
   "Active Firefighters - Volunteer": '',
   "Active Firefighters - Volunteer min": '',
   "Active Firefighters - Volunteer max": '',
   "Active Firefighters - Paid per Call": '',
   "Active Firefighters - Paid per Call min": '',
   "Active Firefighters - Paid per Call max": '',
   "Non-Firefighting - Civilian": '',
   "Non-Firefighting - Civilian min": '',
   "Non-Firefighting - Civilian max": '',
   "Non-Firefighting - Volunteer": '',
   "Non-Firefighting - Volunteer min": '',
   "Non-Firefighting - Volunteer max": '',
}

const FormikSearch = withFormik({
   mapPropsToValues(){
      return initialValues
   },
   handleSubmit(values){
      store.dispatch( saveSearchTerms(values) )
      getStations({ searchTerms: values })
   },
   validationSchema: Yup.object().shape({

   })
})(Search)
 
export default FormikSearch;