import React, { Component } from 'react'
import { NavLink } from "react-router-dom";
import './UserProfileVerticalMenu.scss'


export default class UserProfileVerticalMenu extends Component {

    // constructor(props){
    //     super(props)
    //     this.state = {
    //         activeLink:true,
    //     }
    // }

    // onActive = () => {
    //     this.setState({

    //     })
    // }

    render() {
        return (
            <div className="user-profile-vertical-menu-wrapper">
                
                <div className="row user-profile-vm-link-row">                    
                        <NavLink exact={true} to="/user/profile/bookingHistory" className="user-profile-vm-link" activeStyle={{ color: "#000000" , borderRight:'0.1rem solid black' }}> 
                            <i className="fas fa-history"></i> &nbsp; &nbsp; Booking History
                        </NavLink>
                    
                </div>
                <div className="row user-profile-vm-link-row">
                    
                        <NavLink exact= {true} to="/user/profile" className="user-profile-vm-link" activeStyle={{ color: "#000000", borderRight:'0.1rem solid black'  }} >
                            <i className="far fa-edit"></i> &nbsp; &nbsp; Edit Profile
                        </NavLink>
                    
                </div>

                <div className="user-profile-vm-link-phone-row">                    
                        <NavLink exact={true} to="/user/profile/bookingHistory" className="user-profile-vm-link-phone" activeStyle={{ color: "#000000" }}> 
                            <i className="fas fa-history"></i> &nbsp; &nbsp; Booking History
                        </NavLink>
                    
                </div>
                <div className="user-profile-vm-link-phone-row">
                    
                        <NavLink exact= {true} to="/user/profile" className="user-profile-vm-link-phone" activeStyle={{ color: "#000000",  }} >
                            <i className="far fa-edit"></i> &nbsp; &nbsp; Edit Profile
                        </NavLink>
                    
                </div>
            </div>
        )
    }
}
