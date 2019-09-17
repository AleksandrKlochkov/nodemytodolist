import React from 'react'
import './Checkbox.css'

const Checkbox = props => {
        const checkboxClasses = [
            'filled-in'
        ]
        const itemDone = props.itemDone
        const checkboxType = 'checkbox'
        const checkboxLabel = props.label || ''
        const checkboxName = props.name || `${checkboxType}${props.id}`
        return(
            <div className="Checkbox">
               <p>
                 <label>
                      <input
                        type={checkboxType}
                        data-index={props.idx}
                        onChange={props.onChange}
                        name={checkboxName}
                        className={checkboxClasses.join(' ')} 
                        checked={itemDone}
                        data-id={props.id}
                      />
                     <span>{checkboxLabel}</span>
                 </label>
                </p>
            </div>
        )

      
}

export default Checkbox