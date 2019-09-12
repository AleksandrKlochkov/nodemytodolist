import React from 'react'
import './Checkbox.css'

const Checkbox = props => {
        const checkboxClasses = [
            'filled-in'
        ]

        const checkboxLabel = props.label || ''
        const checkboxName = props.name || ''
        return(
            <div className="Checkbox">
               <p>
                 <label>
                    <input
                      type="checkbox"
                      data-index={props.idx}
                      onChange={props.markTaskHandler}
                      name={checkboxName}
                      className={checkboxClasses.join(' ')} 
                      defaultChecked={props.itemDone}
                    />
                     <span>{checkboxLabel}</span>
                 </label>
                </p>
            </div>
        )
      
}

export default Checkbox