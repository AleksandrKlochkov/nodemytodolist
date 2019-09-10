import React from 'react'
import './Checkbox.css'


const Checkbox = props => {

        const checkboxClasses = [
            'validate'
        ]

        if(!props.isValid){
            checkboxClasses.push('invalid')
        }
        
        const checkboxType = props.type || 'text'
        const checkboxFor = props.id || Math.random() + checkboxType
        const checkboxLabel = props.label || ''
        const checkboxName = props.name || ''
        const invalidMessage = props.invalidMessage || 'Введите корректное значение'
        return(
            <div className="Checkbox">
               <p style={{marginTop: '15px'}}>
                        <label>
                            {props.itemDone ? <input type="checkbox" className="filled-in"/> : <input type="checkbox" className="filled-in"/>}
                            <span></span>
                        </label>
                </p>
            </div>
        )
      
}

export default Checkbox