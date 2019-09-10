import React, {Component} from 'react'
import './Layout.css'

import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'

class Layout extends Component {
    render(){
        return(
            <div className={'Layout'}>
                <div className="wrapper">
                    <Navbar />
                    
                    <div className="content">
                        <div className="container">
                           {this.props.children}
                        </div>
                    </div>

                    <Footer />
                </div>
            </div>
        )
    }
}

export default Layout