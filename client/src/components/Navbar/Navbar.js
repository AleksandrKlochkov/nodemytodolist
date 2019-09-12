import React from 'react'
import './Navbar.css'

import {NavLink } from 'react-router-dom'

const Navbar = props => {
    return(
        <div className={'Navbar'}>
            
            <nav className="blue darken-4 ">
                <div className="menu-icon">
                <i className="large material-icons" >menu</i>
                </div>
          
                <div className={'container-fluid'}>
                    <div className="nav-wrapper">
                     
                        <NavLink exact to="/" className="brand-logo">Список дел</NavLink> 
                        <ul id="nav-mobile" className="right hide-on-med-and-down">
                            <li><NavLink exact activeClassName="activesada" to="/">Главная</NavLink></li>
                            <li><NavLink to="/create">Создать список дел</NavLink></li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar


