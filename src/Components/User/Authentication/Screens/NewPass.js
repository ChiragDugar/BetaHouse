import React, { Component } from 'react'
import '../Stylesheets/Login.scss'
import DarkNavbar from '../../../Navbars/darkNavbar'
import PerformRequest from '../../../PerformRequest'
import Footer from '../../../Footer'
import Back from '../../../../Assets/LoginImage.png'

export default class OtpVerify extends Component {

    constructor(props) {
        super(props)
        this.state = {
            studentId:this.props.location.state.student,
            password:'',
            cnfpassword:''
        }
    }

    handleChange = (e) => {
        let lhs = e.target.name
        let rhs = e.target.value
        this.setState({ [lhs]: rhs })
    }

    formSubmit=e=>{
        e.preventDefault()
        console.log(this.state)
        if(this.state.password===this.state.cnfpassword){
            this.handleAPI()
        }
        else{
            alert("The password don't match")
        }
        
    }

    handleAPI = () => {
        let path = "/auth/student/changeforgotpassword"
        let method = "POST"
        let body = {
            studentId: this.state.studentId,
            newPassword: this.state.password,
            type: "STUDENT"
        }
        let response = PerformRequest(path, method, body)
        response.then(res => {
            if (res.err === false) {
                if (this.props && this.props.location && this.props.location.state && this.props.location.state.isLoggedIn === false) {
                    this.props.history.push({
                        pathname: '/',
                        state: {
                            // email:this.state.email,
                            // phone:this.state.phone
                            studentId:this.state.studentId,
                            newPassword:this.state.password
                        }
                    })
                }
                else {
                    this.props.history.push({
                        pathname: '/',
                        state: {
                            // email:this.state.email,
                            // phone:this.state.phone
                            studentId:this.state.studentId,
                            newPassword:this.state.password
                        }
                    })
                }
                // localStorage.setItem("email",this.state.email)
            }
            else
                alert(res.msg)
        })
    }

    render() {
        console.log(this.state)
        console.log(this.props.history)
        return (
            <div>
                <DarkNavbar />
                <div className="container-fluid Login-Dash">
                    <div className=" row Login-main-div" >
                        <div className="col-lg-6 col-12 Login-main-inner1" >
                            <img src={Back} style={{height:"100%",width:"100%"}}></img>
                        </div>
                        <div className="col-lg-6 col-12 Login-main-inner2">
                            <form onSubmit={this.formSubmit}>
                                {/* <div className="Login-text1 mb-4 mt-4" >WELCOME USER!</div> */}
                                <div> 
                                    <input type="password" className="Login-input" name="password" onChange={this.handleChange}  placeholder="New Password" />
                                </div>
                                <div>
                                    <input type="password" className="Login-input" onChange={this.handleChange} name="cnfpassword" placeholder="Confirm Password" />
                                </div>
                                <div>
                                    <button type="submit" className="Login-button" onClick={this.formSubmit}>LOG IN</button>
                                </div>
                            </form>
                            
                            {/* <div className="Login-text2"> <a href="/user/ForgotPass" className="text-dark"> Forgotten Password?</a></div>
                            <div className="Login-text3">Don't have an account? <span className="Login-signup-button" > <a href="/user/signup" className="text-dark" > Sign Up!</a></span> </div> */}
                        </div>
                    </div>
                </div>
                <div className="container-fluid Login-Dash" style={{padding:"0rem"}}>
                        <Footer />
                    </div>
            </div>
        )
    }
}
