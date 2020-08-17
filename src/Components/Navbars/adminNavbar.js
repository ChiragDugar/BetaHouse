import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Logo from '../../Assets/Asset 1.png';
import './adminNavbar.scss';

export default class adminNavbar extends Component {
    render() {
        return (
            <div className="row admin-navbar-main-wrapper" style={{ backgroundColor: '#2D2D2D', height: '5.435rem' }}>
                <div className="col-5" >
                    <Link exact="true" to="/">
                        <div className="col-2 mx-5 Home1-logo" >
                            <img src={Logo} alt="Logo" />
                        </div>
                    </Link>
                </div>
                <div className="col-7 Admin-navbar-heading-wrapper">
                    <div className="Admin-navbar-heading">Admin Panel</div>
                </div>
            </div>
        )
    }
}
