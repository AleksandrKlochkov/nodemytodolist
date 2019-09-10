import React from 'react'
import './Footer.css'


const Footer = (props) => {
    return(
        <div className={'Footer blue darken-4'}>
            <div className={'container-fluid'}>
               <p>&copy; Список дел 2019 - {new Date().getFullYear()}</p>
            </div>
        </div>
    )
}

export default Footer