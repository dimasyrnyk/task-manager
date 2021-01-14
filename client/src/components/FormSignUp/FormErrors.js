import React from 'react';

const FormErrors = props =>
  <div className="formErrors">
    {Object.keys(props.formErrors).map((fieldName, i) => {
      if(fieldName === props.name && props.formErrors[fieldName].length > 0){
        return (
          <p key={i}>{fieldName} {props.formErrors[fieldName]}</p>
        )    
      } else {
        return '';
      }
    })}
  </div>

export default FormErrors;