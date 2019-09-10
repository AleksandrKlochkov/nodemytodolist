import React from 'react'
import './Input.css'

const Input = props => {

        const inputClasses = [
            'validate'
        ]

        if(!props.isValid){
            inputClasses.push('invalid')
        }
        
        const inputType = props.type || 'text'
        const inputFor = props.id || Math.random() + inputType
        const inputLabel = props.label || ''
        const inputName = props.name || ''
        const invalidMessage = props.invalidMessage || 'Введите корректное значение'
        return(
            <div className="Input input-field">
                <input
                    id={inputFor} 
                    type={inputType} 
                    className={inputClasses.join(' ')}
                    name={inputName}
                 />
                <label htmlFor={inputFor}>{inputLabel}</label>
                {
                    props.isValid 
                    ? 
                    null
                    :
                    <span class="helper-text invalid">{invalidMessage}</span>
                   
                }
               
            </div>
        )
      
}

export default Input