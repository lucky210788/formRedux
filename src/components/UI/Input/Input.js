import React from 'react'
import './Input.scss'

const isInvalid = ({valid, touched, shouldValidate}) => {
  return !valid && shouldValidate && touched
};

const Input = props => {
  const inputType = props.type || 'text';

  return (
    <div className="input">
      <input
        type={inputType}
        value={props.value}
        placeholder={props.placeholder}
        onChange={props.onChange}
      />
      {
        isInvalid(props)
          ? <span>{props.errorMessage}</span>
          : null
      }
    </div>
  )
};

export default Input;