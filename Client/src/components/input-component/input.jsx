import React from 'react'
import './input.css'
const InputComponent = ({label, type, name, id, placeholder,  ...otherProps}) => (
    <span>
        {
            label!=null?  
            <div>
            <label>{label}</label>
            </div>:null
        }
      
      
        <input type = {type} name={name} id={id} minLength={3} placeholder={placeholder} autoComplete='true' className={label!=null?'input':'no-label-input'}  {...otherProps}/>
    </span>
)

export default InputComponent;