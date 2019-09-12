import React from 'react'

const Button = props => {

    const buttonType = props.type || 'button'
    const buttonName = props.name || ''

    const btnClasses = [
        'btn', 'waves-effect','waves-light', 'teal','lighten-1'
    ]

    return(
        <button
         className={btnClasses.join(' ')} 
         type={buttonType} 
         name={buttonName}
        >
         {props.children}
        </button>
    )
}

export default Button