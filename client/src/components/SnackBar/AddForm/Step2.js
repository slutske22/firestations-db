import React from 'react'
import { Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

export const step2validation = Yup.object({
   "Dept Type": Yup.string().required("Required"),
   "Organization Type": Yup.string().required("Required"),
   "Website": '',
   "Number Of Stations": Yup.number().required("Required"),
   "Active Firefighters - Career": Yup.number().required("Required"),
   "Active Firefighters - Volunteer": Yup.number().required("Required"),
   "Active Firefighters - Paid per Call": Yup.number().required("Required"),
   "Non-Firefighting - Civilian": Yup.number().required("Required"),
   "Non-Firefighting - Volunteer": Yup.number().required("Required"),
   "Primary agency for emergency mgmt": '',
 })

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
  "Number Of Stations",
  "Active Firefighters - Career",
  "Active Firefighters - Volunteer",
  "Active Firefighters - Paid per Call",
  "Non-Firefighting - Civilian",
  "Non-Firefighting - Volunteer",
]

export const Step2 = ({values, handleChange, setFieldValue}) => {

  const toggleRadioButton = (field, value) => {
    if (values[field] !== value){
       setFieldValue(field, value)
    } else {
       setFieldValue(field, '')
    }
 }

  return(<>
    <fieldset className="row">
      <legend>Department Profile</legend>
      
      <div className="type-group dept-type">
          <p className="title required">
             Department Type:
            <ErrorMessage className="error" component="div" name="Dept Type" />
         </p>
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
          <p className="title required">
             Organization Type:
             <ErrorMessage className="error" component="div" name="Organization Type" />
            </p>
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
                <ErrorMessage className="error" component="div" name={type} />
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
  </>)
}

export default Step2