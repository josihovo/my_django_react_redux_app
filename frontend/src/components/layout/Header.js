import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { logout } from '../../actions/auth'


export class Header extends Component {

    static propTypes ={
        auth: PropTypes.object.isRequired,
        logout:PropTypes.func.isRequired
    }

    render() {

        const { isAuthenticated, user} = this.props.auth;



        const authLinks = (
            <ul className="navbar-nav ml-auto mt-2 mt-lg-0">

               

                 <li className="nav-item">
                 <a className="dropdown-item" href="/#/posts">Car Sales</a>
                </li>
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Catálogos
                    </a>
                    
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <a className="dropdown-item" href="/#/departamentos">Departamentos</a>                    
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item" href="/#/grupos">Grupos</a>
                    <a className="dropdown-item" href="/#/productos">Productos</a>    
                    <a className="dropdown-item" href="/#/medidas">Medidas</a>
                    
                    </div>
                </li>   

                 <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span><strong>{user ? `Usuario:  ${user.username}` : ""}</strong></span>
                    </a>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <a className="dropdown-item" href="#" onClick={this.props.logout }>Salir</a>                    
                    
                    </div>
                </li>                          
                               
                
           
            
            </ul>                        
        );

        const guestLinks = (
            <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                <li className="nav-item"><Link  to="/register" className="nav-link">Register</Link></li>
                <li className="nav-item"><Link  to="/login" className="nav-link">Login</Link></li>
            </ul>                        
        );


        return (            
                <nav className="navbar navbar-expand-sm navbar-light bg-light">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                        <a className="navbar-brand" href="#">Store Warehouse</a>                        
                    </div>
                    {isAuthenticated ? authLinks : guestLinks}
                </nav>
                
            
        )
    }
}

const mapState = state => ({
    auth:state.auth
})

export default connect(mapState,{logout})(Header)
