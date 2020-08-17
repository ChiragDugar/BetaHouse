import React, { Component } from 'react'
import Navbar from '../../../Navbars/darkNavbar'
import VerticalMenu from '../../../Navbars/UserProfileVerticalMenu'
import UserIcon from '../../../../Assets/UserIcon.png'
import ProfileTab2 from '../Components/ProfileTab2'
import Footer from '../../../Footer'
import '../StyleSheets/BookingHistory.scss'
import performRequest from '../../../PerformRequest'


export default class BookingHistory extends Component {

    constructor(props){
        super(props)
        this.state = { 
            studentId:localStorage.getItem("studentId"),
            details:[] 
        }
    }

    handleLogout = () => {
        localStorage.clear();
        console.log('Local storage should clear')
        this.props.history.push('/')
    }

    handleAPI = () => {
        let path = "/student/booking/history"
        let method = "POST"
        let studentId = this.state.studentId
        console.log(studentId)
        let body = { studentId }
        let response = performRequest(path, method, body)
        response.then(res => {
            console.log(res)
            if(res.err === false)
            {
                this.setState({
                    details:res.details
                })
                console.log(this.state.details)
            }
        })
    }

    componentDidMount = () => {
        this.handleAPI();
    }


    render() {

        return (
            <div>
                <div className="user-profile-navbar-wrapper">
                    <Navbar history = { this.props.history } ></Navbar>
                </div> 

                <div className="row user-profile-row">
                    <div className="col-lg-2 user-profile-left-panel">
                        <VerticalMenu></VerticalMenu>
                    </div>

                    <div className="col-lg-7 user-profile-center-panel">
                        {/* <ProfileTab1></ProfileTab1> */}
                        <ProfileTab2 details = {this.state.details} ></ProfileTab2>
                    </div>

                    <div className="col-lg-3 user-profile-right-panel">
                        <div className="col-lg-12 User-profile-logout-button-wrapper">
                            {/* <button onClick={() => {this.handleLogout()} } className="User-profile-logout-button" >LOGOUT</button> */}
                            <p className="User-profile-logout-button" onClick={() => {this.handleLogout()} } >LOGOUT <i className="fas fa-sign-out-alt float-right"></i> </p>
                        </div>
                        <div className="row user-profile-rp-user-icon-row">
                            <div className="col-lg-12 user-profile-rp-user-icon">
                                {/* <i className="far fa-user-circle"></i> */}
                                <img src={UserIcon} alt="User Icon" width="40%"/>
                            </div>
                            <div className="col-lg-12 user-profile-rp-details">
                                <b>Name: </b>{localStorage.getItem("studentName")}
                            </div>
                            <div className="col-lg-12 user-profile-rp-details">
                                <b>Email: </b>{localStorage.getItem("studentEmail")}
                            </div>
                            <div className="col-lg-12 user-profile-rp-details">
                                <b>Phone Number: </b>{localStorage.getItem("studentPhoneNumber")}
                            </div>
                            <div className="col-lg-12 user-profile-rp-details">
                                <b>Gender: </b>{localStorage.getItem("studentGender")}
                            </div>
                        </div>
                    </div>

                    
                </div>
                
                <div className={this.state.details && this.state.details.length > 0 ? "User-profile-footer-BH" :"User-profile-footer-BH-none"}>
                    <Footer></Footer>
                </div>

                <div className="row user-profile-phone-row">
                    <div className="user-profile-phone-left-panel">
                        <VerticalMenu></VerticalMenu>
                    </div>
                    
                    <div className="user-profile-center-panel">
                        <ProfileTab2 details = {this.state.details}></ProfileTab2>
                    </div>

                    <Footer></Footer>
                </div>

                {/* <div className={this.state.details && this.state.details.length > 0 ? "User-profile-footer-BH" :"User-profile-footer-BH-none"}>
                    <Footer></Footer>
                </div> */}

            </div>
        )
    }
}
