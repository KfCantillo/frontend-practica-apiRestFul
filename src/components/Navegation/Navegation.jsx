import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';

import logo from './logotipo.png';

const Token = localStorage.getItem('tokenKfC');

export default class Navegation extends Component {
    render() {
        return (
            <nav className="Navigation grey darken-2" role="navigation">
                <div className="nav-wrapper container">
                    <Link id="logo-container" className="brand-logo" to="/">
                        <img src={logo} className="responsive-img" alt=""/>
                    </Link>
                    <ul className="right hide-on-med-and-down">
                        { Token ? <li><Link to="/posts" > Posts </Link></li> : ''}
                        { !Token ? <li><Link to="/sign-in" > Iniciar Sesión </Link></li> : ''}
                        { !Token ? <li><Link to="/sign-up" > Registro </Link></li> : ''}
                        { Token ? <li><Link to="/logout" > Cerrar Sesión </Link></li> : ''}
                    </ul>

                    <ul id="nav-mobile" className="sidenav">
                        <li>
                            <Link to="/Posts" > Posts </Link>
                            <Link to="/sign-in" > Sign In </Link>
                            <Link to="/sign-up" > Sign Up </Link>
                        </li>
                    </ul>
                    <Link data-target="nav-mobile" className="sidenav-trigger" to="#">
                        <i className="material-icons">menu</i>
                    </Link >
                </div>
            </nav>
        )
    }
}
