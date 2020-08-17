import React, { Component } from 'react'
import performRequest from '../../../PerformRequest'
import UserProfile from '../../../../Assets/UserProfile2.png'
import ChangeNumber from './ChangeNumber'
import ChangeEmail from './ChangeEmail'
import ChangePassword from './ChangePassword'
import UserIcon from '../../../../Assets/UserIcon.png'

export default class ProfileTab1 extends Component {

    constructor(props){
        super(props)
        this.state = {
            studentId:localStorage.getItem("studentId"),
            firstName:localStorage.getItem("studentFirstName"),
            lastName:localStorage.getItem("studentLastName"),
            email:localStorage.getItem("studentEmail"),
            phoneNumber:"",
            dob:"",
            showDate:"",
            gender:"",
            address:"",
            disableInput:true,
            showButton:false,
        }
    }

    handleAuth = () => {
        if(localStorage.getItem("methodOfAuthentication") === "regular")
        {
            this.setState({
                phoneNumber:localStorage.getItem("studentPhoneNumber"),
                dob:localStorage.getItem("studentDob"),
                gender:localStorage.getItem("studentGender"),
                address:localStorage.getItem("studentAddress")
            })
        }
        else{
            this.setState({
                phoneNumber:"Please enter your phone Number",
                gender:"Please add your Gender",
                address:"Please add your address",
            })
        }
    }

    handleDate = () => {
        var dob = localStorage.getItem("studentDob")
        if(dob !== null || dob !== undefined || localStorage.getItem("methodOfAuthentication") === "regular")
        {
            console.log(dob)
            dob = dob.split("-").reverse().join("-")
            this.setState({
                showDate:dob
            })
        }
        else{
            this.setState({
                showDate:"Please enter your Date Of Birth"
            })
        }
        
    }


    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    handleDateChange = (e) => {
        this.setState({
            dob: e.target.value,
            [e.target.name]:e.target.value
            // dob:this.showDate
        })
    }

    handleEdit = () => {
        this.setState({
            disableInput:!this.state.disableInput,
            showButton:!this.state.showButton
        })
    }

    handleAPI = () => {
        let path = "/student/edit/profile"
        let method = "POST"
        console.log(this.state.studentId)
        let body = this.state
        let response = performRequest(path, method, body)
        response.then(res => {
            if(res.err === true)
            {
                alert(res.msg)
            }
            else
            {
                console.log(res)
                alert(res.msg)
                localStorage.setItem("studentFirstName",res.db.firstName)
                localStorage.setItem("studentLastName",res.db.lastName)
                localStorage.setItem("studentEmail",res.db.email)
                localStorage.setItem("studentPhoneNumber",res.db.phoneNumber)
                var dobone = res.db.dob;
                dobone = dobone.split('T')[0]
                localStorage.setItem("studentDob",dobone)
                // this.handleDate()
                console.log(localStorage)
                localStorage.setItem("studentAddress",res.db.address)
                localStorage.setItem("studentGender",res.db.gender)
                var studName = res.db.firstName + " " + res.db.lastName;
                localStorage.setItem("studentName", studName);
                this.setState({
                    firstName:localStorage.getItem("studentFirstName"),
                    lastName:localStorage.getItem("studentLastName"),
                    email:localStorage.getItem("studentEmail"),
                    phoneNumber:localStorage.getItem("studentPhoneNumber"),
                    dob:localStorage.getItem("studentDob"),
                    gender:localStorage.getItem("studentGender"),
                    address:localStorage.getItem("studentAddress"),
                    disableInput:true,
                    showButton:false
                })
                window.location.reload()
            }
            
        })
    }

    componentDidMount = () => {
        this.handleAuth()
        this.handleDate()
    }

    render() {
        return (
            <div>
                
                

                <div className="row User-profile-tab1-greeting-row">
                    <div className="col-lg-6">
                        <h2 className="User-profile-tab1-greeting">Welcome back, {localStorage.getItem("studentName")} </h2>
                    </div>
                    <div className="col-lg-6 user-profile-tab1-image">
                        <img src={UserProfile} className="user-profile-ep-greeting-img" alt="userProfile" width="70%"/>
                    </div>
                    
                </div>

                

                    <div className="row user-profile-right-panel-phone">
                        <div >
                            {/* <div className="col-lg-12 User-profile-logout-button-wrapper">
                                <p className="User-profile-logout-button" onClick={() => {this.handleLogout()} } >LOGOUT <i className="fas fa-sign-out-alt float-right"></i> </p>
                            </div> */}
                            <div className="row user-profile-rp-user-icon-row">
                                <div className="col-lg-12 user-profile-rp-user-icon">
                                    <img src={UserIcon} alt="User Icon" className="user-profile-ep-det-img" width="45%"/>
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
                                {/* <div className="col-lg-12 user-profile-rp-details">
                                    <b>Gender: </b>{localStorage.getItem("studentGender")}
                                </div> */}
                            </div>
                        </div>
                    </div>




                <div className="row user-edit-profile-row">
                    <div className="col-lg-12 User-edit-profile-wrapper">
                        <div className="row">
                            <h3 className="col-lg-11 User-edit-profile-heading">Personal Details</h3>
                            <div className="col-lg-1 User-edit-profile-button" onClick={this.handleEdit}>Edit</div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <span className="user-profile-span-names-disp">First Name <sup className="user-profile-sup-asterix">*</sup> </span>
                                <input value={this.state.firstName} disabled={this.state.disableInput} onChange={this.handleChange}  type="text" name="firstName" id="fname" placeholder={localStorage.getItem("studentFirstName")} className={ this.state.disableInput === true ? "User-profile-personal-details-input" : "OverviewLeftPane-input" } />
                            </div>
                            <div className="col">
                                <span className="user-profile-span-names-disp" >Last Name <sup className="user-profile-sup-asterix">*</sup> </span>
                                <input value={this.state.lastName} disabled={this.state.disableInput} onChange={this.handleChange} type="text" name="lastName" id="lname" placeholder="Last Name" className={ this.state.disableInput === true ? "User-profile-personal-details-input" : "OverviewLeftPane-input" } />
                            </div>
                        </div>
                        {/* <div className="row">
                            <div className="col">
                                <input value={this.state.email} disabled={this.state.disableInput} onChange={this.handleChange} type="text" name="email" id="email" placeholder={localStorage.getItem("studentEmail")} className="OverviewLeftPane-input" />
                            </div>
                            <div className="col">
                                <input type="number" className="OverviewLeftPane-input OverviewLeftPane-input-code-no col-3" name="codeNumber" placeholder="Code Number" />
                                <input value={this.state.phoneNumber} disabled={this.state.disableInput} onChange={this.handleChange} type="text" name="phoneNumber" id="phoneNumber" placeholder="Phone Number" className="OverviewLeftPane-input" />
                            </div>
                        </div> */}
                        <br/>
                        <div className="row">
                            <div className="col">
                                <span className="user-profile-span-names-disp">Date of Birth <sup className="user-profile-sup-asterix">*</sup> </span>
                                <input value={this.state.showDate} disabled={this.state.disableInput} onChange={this.handleDateChange} type="text" onFocus={(e) => e.target.type = 'date'} onBlur={(e) => e.target.type = 'text' } name="showDate" id="dob" placeholder={this.state.showDate} className={ this.state.disableInput === true ? "User-profile-personal-details-input" : "OverviewLeftPane-input" } />
                            </div>
                            <div className="col">
                                <span className="user-profile-span-names-disp">Gender <sup className="user-profile-sup-asterix">*</sup> </span>
                                <input value={this.state.gender} disabled={this.state.disableInput} onChange={this.handleChange} type="text" name="gender" id="gender" className={ this.state.disableInput === true ? "User-profile-personal-details-input" : "User-profile-personal-details-input-gender-dd" } />
                                <select onChange={this.handleChange} name="gender" id="gender" className={ this.state.disableInput === true ? "User-profile-personal-details-input-gender-dd" : "OverviewLeftPane-input" }>
                                    <option>Choose your gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                        </div>
                        <br/>
                        <div className="row">
                            <div className="col">
                                <span className="user-profile-span-names-disp">Address <sup className="user-profile-sup-asterix">*</sup> </span>
                                <textarea value={this.state.address} disabled={this.state.disableInput} onChange={this.handleChange} name="address" id="Address" placeholder="Address" className={ this.state.disableInput === true ? "User-profile-personal-details-input" : "OverviewLeftPane-input" }></textarea>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <button className={this.state.showButton === true ? "User-profile-update-button-open" : "User-profile-update-button-close" } onClick={this.handleAPI} >SUBMIT</button>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="row user-edit-profile-row justify-content-around">
                    <ChangeNumber></ChangeNumber>
                </div>

                <div className="row user-edit-profile-row justify-content-around">
                    { localStorage.getItem("methodOfAuthentication") === "regular" ?
                        (
                            <ChangeEmail></ChangeEmail>
                        ):(
                            <div></div>
                        )
                    }
                </div>

                <div className="row user-edit-profile-row justify-content-around">
                    { localStorage.getItem("methodOfAuthentication") === "regular" ?
                        (
                            <ChangePassword></ChangePassword>
                        ):(
                            <div></div>
                        )
                    }
                </div>

            </div>
        )
    }
}
