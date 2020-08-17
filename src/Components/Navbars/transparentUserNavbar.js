import React, { Component } from 'react'
import { Link } from "react-router-dom";
import Logo from '../../Assets/Asset 1.png'
import './tranparentUserNavbar.scss'
import HamburgerMenu from 'react-hamburger-menu';
import performRequest from '../PerformRequest';

class Navbar extends Component {

    state = {
        open: false,
        showLoggedInMenu: false,
    }

    handleClick = () => {
        this.setState({
            open: !this.state.open
        });
    }

    handleLoggedInMenuHover = () => {
        this.setState({
            showLoggedInMenu: !this.state.showLoggedInMenu
        })
    }

    componentDidMount() {
        const studentId = localStorage.getItem("studentId");
        // this.getStudentDetails()
        // console.log(`Student Id: ${studentId}`);
    }

    getStudentDetails = () => {
        console.log("HITT")
        let path = "/auth/student/getstudentdetails"
        let method = "POST"
        let studentId = localStorage.getItem("studentId")
        let body = { studentId }
        let response = performRequest(path, method, body)
        response.then(res => {
            if (res.err === false) {
                localStorage.setItem("studentFirstName", res.firstName)
                localStorage.setItem("studentLastName", res.lastName)
                localStorage.setItem("studentEmail", res.email)
                localStorage.setItem("studentPhoneNumber", res.phoneNumber)
                var dob = res.dob;
                dob = dob.split('T')[0]
                localStorage.setItem("studentDob", dob)
                localStorage.setItem("studentAddress", res.address)
                localStorage.setItem("studentGender", res.gender)
                localStorage.setItem("x-auth-token", res.token);
                localStorage.setItem("methodOfAuthentication", res.methodOfAuthentication)
            }
            else {
                alert(res.msg)
            }
        })

    }

    render() {
        return (
            <div>
                <div className="row">

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

                    <div className="col-lg-5 col-sm-5 col-5 px-0">
                        <Link exact="true" to="/">
                            <div className="col-lg-2 col-12 mx-5 transparent-user-navbar-logo" >
                                <img src={Logo} alt="Logo" />
                            </div>
                        </Link>
                    </div>

                    <div className="col-lg-7 text-right mt-4 pr-5 text-uppercase transparent-user-navbar-desktop">
                        {/* <Link exact="true" to="/hostels" className="text-white col-3 col-md-offset-1">Student Accomodation</Link> */}
                        {/* <Link exact="true" to="/coliving" className="text-white col-3 col-md-offset-1">Co Living</Link> */}
                        {/* <Link exact="true" to="/blogs" className="text-white col-3 col-md-offset-1">Blogs</Link> */}
                        {/* <Link exact="true" to="/about" className="text-white col-2 col-md-offset-1">About Us</Link>
                        <Link exact="true" to="/contact" className="text-white col-2 col-md-offset-1">Contact Us</Link> */}
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


                    </div>
                </div>
            </div>
        )
    }
}

export default Navbar