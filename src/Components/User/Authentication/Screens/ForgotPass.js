import React, { Component } from 'react'
import '../Stylesheets/Login.scss'
import DarkNavbar from '../../../Navbars/darkNavbar'
import PerformRequest from '../../../PerformRequest'
import Footer from '../../../Footer'

export default class ForgotPass extends Component {

    constructor(props) {
        super(props)
        this.state = {
            email:'',
            type: 'STUDENT'
            // phone:''
        }
    }

    formSubmit=e=>{
        e.preventDefault()
        console.log(this.state)
        this.handleAPI()
    }

    handleAPI = () => {
        let path = "/auth/student/forgotpassword"
        let method = "POST"
        let body = this.state
        let response = PerformRequest(path, method, body)
        response.then(res => {
            if (res.err === false) {
                alert("Check for OTP")
                if (this.props && this.props.location && this.props.location.state && this.props.location.state.isLoggedIn === false) {
                    this.props.history.push({
                        pathname: '/user/OtpVerify',
                        state: {
                            email:this.state.email,
                            // phone:this.state.phone
                        }
                    })
                }
                else {
                    this.props.history.push({
                        pathname: '/user/OtpVerify',
                        state: {
                            email:this.state.email,
                            // phone:this.state.phone
                        }
                    })
                }
                // localStorage.setItem("email",this.state.email)
            }
            else
                alert(res.msg)
        })
    }

    handleMethod = (e) => {
        let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (e.target.value.match(regexEmail)) {
            this.setState({
                method: 'email',
                email: e.target.value
            })
        }
        else {
           alert("Enter correct mail")
        }
    }

    render() {
        return (
            <div>
                <DarkNavbar />
                <div className="container-fluid">
                    <div className=" row Login-main-div" >
                        <div className="col-lg-6 col-12 Login-main-inner1" >
                        </div>
                        <div className="col-lg-6 col-12 Login-main-inner2">
                            <form onSubmit={this.formSubmit}>
                                {/* <div className="Login-text1 mb-4 mt-4" >WELCOME USER!</div> */}
                                <div> 
                                    <input type="text" className="Login-input" name="email" onBlur={this.handleMethod} placeholder="E-mail" />
                                </div>
                                {/* <div>
                                    <input type="password" className="Login-input" onChange={this.handleChange} name="password" placeholder="Password" />
                                </div> */}
                                <div>
                                    <button type="submit" className="Login-button" onClick={this.formSubmit}>Submit</button>
                                </div>
                            </form>
                            
                            {/* <div className="Login-text2"> <a href="/" className="text-dark"> Forgotten Password?</a></div> */}
                            {/* <div className="Login-text3">Don't have an account? <span className="Login-signup-button" > <a href="/user/signup" className="text-dark" > Sign Up!</a></span> </div> */}
                        </div>
                    </div>
                </div>
                <Footer/>
                
            </div>
        )
    }
}
