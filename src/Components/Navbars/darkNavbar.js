import React, { Component } from 'react'
import { Link } from "react-router-dom";
import Logo from '../../Assets/Asset 1.png'
import HamburgerMenu from 'react-hamburger-menu';
import './darkNavbar.scss'
import UserIcon from '../../Assets/UserIcon.png'

class Navbar extends Component {

    constructor(props) {
        super(props)
        this.state = {
            open: false,
            showLoggedInMenu: false,
        }
    }

    handleClick = () => {
        this.setState({
            open: !this.state.open
        });
    }

    handleLogout = () => {
        localStorage.clear();
        console.log('Local storage should clear')
        this.props.history.push('/')
    }

    render() {
        return (

            <div className="row darkNavbar-row" >

                <div className="col-sm-5 col-5 transparent-user-navbar-hamburger">
                    <HamburgerMenu
                        isOpen={this.state.open}
                        menuClicked={this.handleClick.bind(this)}
                        width={25}
                        height={20}
                        strokeWidth={3}
                        rotate={0}
                        color='white'
                        borderRadius={0}
                        animationDuration={0.5}

                    />
                </div>

                <div className="col-5" >
                    <Link exact="true" to="/">
                        <div className="col-lg-2 col-12 mx-5 Home1-logo transparent-user-navbar-logo" >
                            <img src={Logo} alt="Logo" />
                        </div>
                    </Link>
                </div>
                <div className="col-lg-7 text-right mt-4 pr-5 text-uppercase darkNavbar-links-wrapper">
                    {/* <Link exact="true" to="/hostels" className="text-white col-3 col-md-offset-1">Student Accomodation</Link> */}
                    {/* <Link exact="true" to="/coliving" className="text-white col-3 col-md-offset-1">Co Living</Link> */}
                    {/* <Link exact="true" to="/blogs" className="text-white col-3 col-md-offset-1">Blogs</Link> */}
                    {/* <Link exact="true" to="/about" className="text-white col-2 col-md-offset-1">About Us</Link>
                        <Link exact="true" to="/contact" className="text-white col-2 col-md-offset-1">Contact Us</Link> */}
                    {/* <Link exact="true" to="/user/login" className="text-white col-3 col-md-offset-1">Login</Link> */}
                    {
                        localStorage.getItem("studentId") ? (
                            <Link exact="true" to="/user/profile/bookingHistory" className="text-white col-3 col-md-offset-1">
                                <i className="far fa-user-circle"></i> {localStorage.getItem("studentName")}
                            </Link>
                        ) : (
                                <Link exact="true" to="/user/login" className="text-white col-3 col-md-offset-1">Login</Link>
                            )
                    }
                </div>


                <div className={this.state.open === true ? "transparent-user-navbar-phoneHeader col-lg-9" : "transparent-user-navbar-phoneHeaderClose col-lg-9"}>
                    <div onClick={this.handleClick} className="transparent-user-navbar-phone-links-first">
                        <Link exact="true" to="/" className="text-white col-3 col-md-offset-1">Home</Link>
                    </div>
                    {/* <div onClick={this.handleClick} className="transparent-user-navbar-phone-links">
                            <Link exact="true" to="/coliving" className="text-white col-3 col-md-offset-1">Co Living</Link>
                        </div>
                        <div onClick={this.handleClick} className="transparent-user-navbar-phone-links">
                            <Link exact="true" to="/blogs" className="text-white col-3 col-md-offset-1">Blogs</Link>
                        </div> */}
                    {/* <Link exact="true" to="/about" className="text-white col-2 col-md-offset-1">About Us</Link>
                        <Link exact="true" to="/contact" className="text-white col-2 col-md-offset-1">Contact Us</Link> */}
                    <div onClick={this.handleClick} className="transparent-user-navbar-phone-links">
                        {/* <Link exact="true" to="/user/login" className="text-white col-3 col-md-offset-1">Login</Link> */}
                        {
                            localStorage.getItem("studentId") ? (
                                <Link exact="true" to="/user/profile/bookingHistory" onClick={this.getStudentDetails} className="text-white col-3 col-md-offset-1">
                                    <i className="far fa-user-circle"></i> {localStorage.getItem("studentName")}
                                </Link>

                            ) : (
                                    <Link exact="true" to="/user/login" className="text-white col-3 col-md-offset-1">Login</Link>
                                )
                        }
                    </div>


                    {
                        localStorage.getItem("studentId") ? (
                            <div className="col-lg-12 User-profile-logout-button-wrapper-phone">
                                <p className="User-profile-logout-button-phone" onClick={() => { this.handleLogout() }} >LOGOUT <i className="fas fa-sign-out-alt float-right"></i> </p>
                            </div>
                        ) : (
                                <div></div>
                            )
                    }



                </div>
            </div>
        )
    }
}

export default Navbar