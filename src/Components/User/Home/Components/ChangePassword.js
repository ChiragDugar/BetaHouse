import React, { Component } from 'react'
import performRequest from '../../../PerformRequest'

export default class ChangePassword extends Component {

    constructor(props){
        super(props)
        this.state = {
            studentId:localStorage.getItem("studentId"),
            newPassword:"",
            oldPassword:"",
            retype:"",
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    handleAPI = () => {
        if(this.state.newPassword === this.state.retype)
        {
            console.log(this.state.oldPassword)
            let path = "/auth/student/changepassword"
            let method = "POST"
            let body = this.state
            let response = performRequest(path, method, body)
            response.then(res => {
                if(res.err === false)
                {
                    alert(res.msg)
                    window.location.reload()
                }
                else{
                    alert(res.msg)
                    console.log(this.state.oldPassword)
                }
            })
        }
        else{
            alert("The new and the confirm passwords do not match")
        }
    }

    render() {
        return (
            <div className="col-lg-12 User-edit-profile-wrapper">
                <div className="row">
                    <h3 className="col-lg-11 User-edit-profile-heading">Change Password</h3>
                </div>

                <div className="row">
                    <div className="col-lg-12">
                        <input onChange={this.handleChange} type="password" name="oldPassword" id="oldPassword" placeholder="Old Password" className="OverviewLeftPane-input " />
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-6">
                        <input onChange={this.handleChange} type="password" name="newPassword" id="newPassword" placeholder="New Password" className="OverviewLeftPane-input " />
                    </div>

                    <div className="col-lg-6">
                        <input onChange={this.handleChange} type="password" name="retype" id="retype" placeholder="Confirm New Password" className="OverviewLeftPane-input " />

                    </div>
                </div>
                <br/>
                <div className="row">         
                    {/* <div className="col-lg-8">
                        <input onChange={this.handleChange} type="password" name="oldPassword" id="oldPassword" placeholder="Old Password" className="OverviewLeftPane-input " />
                    </div> */}
                    <div className="col-lg-3">
                        <button className= "User-profile-submit-button" onClick={this.handleAPI} >SUBMIT</button>
                    </div>
                </div>
            </div>
        )
    }
}
