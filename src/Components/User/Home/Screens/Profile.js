import React, { Component } from 'react';
import Navbar from '../../../Navbars/darkNavbar'
import VerticalMenu from '../../../Navbars/UserProfileVerticalMenu'
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import '../StyleSheets/Profile.scss'
import '../StyleSheets/ProfileTab1.scss'
import '../StyleSheets/ProfileTab2.scss'
import ProfileTab1 from '../Components/ProfileTab1';
import UserIcon from '../../../../Assets/UserIcon.png'
import Footer from '../../../Footer';

class Profile extends Component {

    handleLogout = () => {
        localStorage.clear();
        console.log('Local storage should clear')
        this.props.history.push('/')
        // console.log(this.props.history)
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
                        <ProfileTab1></ProfileTab1>
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
                            {
                                localStorage.getItem("studentPhoneNumber") ? (
                                    <div className="col-lg-12 user-profile-rp-details">
                                        <b>Phone Number: </b>{localStorage.getItem("studentPhoneNumber")}
                                    </div>
                                ) : (
                                    <div> <b>Phone Number: </b> Please add a new number in the edit profile section! </div>
                                )
                            }
                            {
                                localStorage.getItem("studentGender") ? (
                                    <div className="col-lg-12 user-profile-rp-details">
                                        <b>Gender: </b>{localStorage.getItem("studentGender")}
                                    </div>
                                ): (
                                    <div> <b>Gender: </b> Please add your gender in the edit profile section! </div>
                                )
                            }
                        </div>
                    </div>
                </div>

                
                

                <div className="row user-profile-phone-row">
                    <div className="user-profile-phone-left-panel">
                        <VerticalMenu></VerticalMenu>
                    </div>
                    
                    

                    <div className="user-profile-center-panel">
                        <ProfileTab1></ProfileTab1>
                    </div>
                    {/* 
                    
                    <div className="col-lg-3 user-profile-right-panel">
                        <div className="col-lg-12 User-profile-logout-button-wrapper">
                            <p className="User-profile-logout-button" onClick={() => {this.handleLogout()} } >LOGOUT <i className="fas fa-sign-out-alt float-right"></i> </p>
                        </div>
                        <div className="row user-profile-rp-user-icon-row">
                            <div className="col-lg-12 user-profile-rp-user-icon">
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
                    </div> */}

                    

                </div>
                
                <div className="User-profile-footer">
                    <Footer></Footer>
                </div>

                
            </div>
        )
    }
};

export default Profile;