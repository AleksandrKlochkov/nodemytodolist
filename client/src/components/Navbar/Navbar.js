import React from 'react'
import './Navbar.css'

const Navbar = props => {
    return(
        <div className={'Navbar'}>
            
            <nav className="blue darken-4 ">
                <div className="menu-icon">
                <i className="large material-icons" >menu</i>
                </div>
          
                <div className={'container-fluid'}>
                    <div className="nav-wrapper">
                     
                        <a href="/" className="brand-logo">Список дел</a>
                        <ul id="nav-mobile" className="right hide-on-med-and-down">
                            <li><a href="/">Главная</a></li>
                            <li><a href="/create">Создать список дел</a></li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar


