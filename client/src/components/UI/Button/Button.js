import React from 'react'

const Button = props => {

    const buttonType = props.type || 'button'
    const buttonName = props.name || ''

    const cls = [
        'btn', 'waves-effect','waves-light', 'blue','darken-4'
    ]

    return(
        <button
         className={cls.join(' ')} 
         type={buttonType} 
         name={buttonName}
        >
         {props.children}
        </button>
    )
}

export default Button