import React, { Component } from 'react'
import { Link } from "react-router-dom";
import Logo from '../../Assets/Asset 1.png'
import './darkNavbar.scss'
import './merchantNavbar.scss'

class Navbar extends Component {
    handleLogOut = () => {
        localStorage.removeItem('merchantId')
        this.props.history.push('/merchant')
    }

    render() {
        return (
            <div>
                <div className="row darkNavbar-row" style={{ backgroundColor: '#2D2D2D', height: '5.435rem', zIndex:100 }} >
                    <div className="col-5" >
                        <Link exact to="/">
                            <div className="col-2 mx-5 Home1-logo" >
                                <img src={Logo} alt="Logo" />
                            </div>
                        </Link>
                    </div>
                    <div className="col-7 text-right mt-4 pr-5 text-uppercase darkNavbar-links-wrapper">
                        <Link exact to="/merchant" className="text-white col-4 col-md-offset-1 merchantLink">Home</Link>
                        <Link exact to="/merchant/dashboard" className="text-white col-4 col-md-offset-1 merchantLink">Dashboard</Link>
                        {/* <Link exact to="/hostels" className="text-white col-2 col-md-offset-1 merchantLink">Hostels</Link> */}
                        {
                            localStorage.getItem("merchantId") ? (
                                <div className="d-inline-block">
                                    {/* <Link exact to="/merchant/profile" className="text-white col-4 col-md-offset-1 merchantLink">
                                        <i className="far fa-user-circle"></i> {localStorage.getItem("merchantName")}
                                    </Link> */}
                                    <Link className="text-white col-4 col-md-offset-1 merchantLink" onClick={this.handleLogOut}>Log Out</Link>
                                </div>
                            ) : (
                                    <Link exact to="/merchant/login" className="text-white col-4 col-md-offset-1 merchantLink">Login</Link>
                                )
                        }
                        {/* <Link exact to="/merchant/login" className="text-white col-2 col-md-offset-1 merchantLink">Login</Link> */}
                    </div>
                </div>
            </div>
        )
    }
}

export default Navbar