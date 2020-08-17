import React, { Component } from 'react'
import performRequest from '../../../PerformRequest'

export default class ChangeEmail extends Component {

    constructor(props){
        super(props)
        this.state = {
            studentId:localStorage.getItem("studentId"),
            newEmail:"",
            emailUniqueId:"",
            uniqueCode:""
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    verifyEmail = () => {
        let path =  "/auth/student/changeemail"
        let method = "POST"
        let body = this.state
        let response = performRequest(path, method, body)
        response.then(res => { 
            if(res.err === false)
            {
                alert(res.msg)
                this.setState({
                    emailUniqueId:res.emailUniqueId
                })
            }
            else{
                alert(res.msg)
            }
        })
    }

    handleAPI = () => {
        let path = "/auth/student/verifychangeemail"
        let method = "POST"
        let body = this.state
        let response = performRequest(path, method, body)
        response.then(res => {
            if(res.err === false)
            {
                alert(res.msg)
                localStorage.setItem("studentEmail", this.state.newEmail)
                window.location.reload()
            }
            else{
                alert(res.msg)
            }
        })
    }

    render() {
        return (
            <div className="col-lg-12 User-edit-profile-wrapper">
                <div className="row">
                    <h3 className="col-lg-11 User-edit-profile-heading">Change Email</h3>
                    {/* <div className="col-lg-1 User-edit-profile-button" onClick={this.handleEdit}>Edit</div> */}
                </div>

                <div className="row">
                    <div className="col-lg-12">

                        {
                                    this.state.emailUniqueId === "" ?
                                    (
                                        <div className="row">
                                            
                                            <input value={this.state.newEmail} onChange={this.handleChange} type="text" name="newEmail" id="newEmail" placeholder="New Email" className="OverviewLeftPane-input change-number-user-profile-code col-lg-8 col-11" />
                                            
                                            {/* <div className="row"> */}
                                                <div className="col-lg-3 col-4">
                                                    <button className= "User-profile-verify-button" onClick={this.verifyEmail} >VERIFY</button>
                                                </div>
                                            {/* </div> */}
                                        </div>
                                    ):(
                                        <div className="row">
                                            <input value={this.state.uniqueCode} onChange={this.handleChange} type="text" name="uniqueCode" id="uniqueCode" placeholder="Enter OTP" className="OverviewLeftPane-input change-number-user-profile-code col-lg-8 col-11" />
                                            {/* <div className="row"> */}
                                                <div className="col-lg-3 col-4">
                                                    <button className= "User-profile-verify-button" onClick={this.handleAPI} >SUBMIT</button>
                                                </div>
                                            {/* </div> */}
                                        </div>
                                    )
                                }
                    </div>
                </div>

                
            </div>
                
            
        )
    }
}
