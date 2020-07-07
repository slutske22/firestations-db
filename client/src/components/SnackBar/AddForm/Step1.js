import React from 'react'
import { Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { states } from '../states'

export const step1validation = Yup.object({
  "FDID": Yup.string().required("Required"),
  "Fire dept name": Yup.string().required("Required"),
  "HQ addr1": Yup.string().required("Required"),
  "HQ addr2": '',
  "HQ city": Yup.string().required("Required"),
  "HQ state": Yup.string().required("Required"),
  "HQ zip": Yup.string().required("Required"),
  "HQ phone": Yup.string().required("Required"),
  "HQ fax": '',
  "County": Yup.string().required("Required"),
})

export const Step1 = () => (
  <>
    <fieldset className="row">
      
      <small className="required-message">
        <span className="asterisk">*</span> Indicates a Required Field
      </small>

      <legend>ID</legend>
      <div className="input-field col s6">
        <label className="required">
            Federal ID: 
            <ErrorMessage className="error" component="span" name="FDID" />
            <Field type="text" name="FDID" />
        </label>
      </div>
      <div className="input-field col s6">
        <label className="required">
            Department Name: 
            <ErrorMessage className="error" component="div" name="Fire dept name" />
            <Field type="text" name="Fire dept name" />
        </label>
      </div>
    </fieldset>

    <fieldset className="row">
      <legend>Location</legend>
      <div className="input-field col s6">
          <label className="required">
            Address 1: 
            <ErrorMessage className="error" component="div" name="HQ Addr1" />
            <Field type="text" name="HQ addr1" />
          </label>
      </div>
      <div className="input-field col s6">
          <label>
            Address 2: 
            <ErrorMessage className="error" component="div" name="HQ Addr2" />
            <Field type="text" name="HQ addr2" />
          </label>
      </div>
      <div className="input-field col s6">
          <label className="required">
            City: 
            <ErrorMessage className="error" component="div" name="HQ city" />
            <Field type="text" name="HQ city" />
          </label>
      </div>
      <div className="input-field col s6">
          <label className="required">
            County: 
            <ErrorMessage className="error" component="div" name="County" />
            <Field type="text" name="County" autoComplete="off" />
          </label>
      </div>
      <div className="input-field col s6">
          <label className="required">
            State: 
            <ErrorMessage className="error" component="div" name="HQ state" />
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
            <ErrorMessage className="error" component="div" name="HQ zip" />
            <Field type="number" max="99999" min="0" name="HQ zip" />
          </label>
      </div> 
      <div className="input-field col s6">
          <label className="required">
            Phone: 
            <ErrorMessage className="error" component="div" name="HQ phone" />
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
  </>
)

export default Step1