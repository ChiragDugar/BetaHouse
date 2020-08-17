import React, { Component } from 'react'
import '../Stylesheets/Login.scss'
import DarkNavbar from '../../../Navbars/darkNavbar'
import PerformRequest from '../../../PerformRequest'
import Footer from '../../../Footer'
import Back from '../../../../Assets/LoginImage.png'


export default class NewPass extends Component {

    constructor(props) {
        super(props)
        this.state = {
            userTypedOtp: '',
            otpId: this.props.history.location.state.otpId,
            firstName: this.props.history.location.state.firstName,
            lastName: this.props.history.location.state.lastName,
            email: this.props.history.location.state.email,
            phoneNumber: this.props.history.location.state.phoneNumber,
            password: this.props.history.location.state.password,
            dob: this.props.history.location.state.dob,
            address: this.props.history.location.state.address,
            gender: this.props.history.location.state.gender,
            studentId: this.props.history.location.state.studentId
        }
    }

    formSubmit = e => {
        e.preventDefault()
        console.log(this.state)
        this.handleAPI()
    }
    regenerate = e => {
        e.preventDefault()
        console.log(this.state)
        this.reHandleAPI()
    }

    reHandleAPI = () => {
        let path = "/auth/student/generate/otp"
        let method = "POST"
        let body = {
            studentId: this.state.studentId,
            studentPhoneNumber: this.state.phoneNumber,
            firstName: this.state.firstName
        }
        let response = PerformRequest(path, method, body)
        response.then(res => {
            if (res.err === false) {
                if (this.props && this.props.location && this.props.location.state && this.props.location.state.isLoggedIn === false && res.allow === true) {
                    alert("Otp sent");
                }
                else {
                    alert("There is some error");
                }
            }
            // if(res.allow==true){
            //     this.props.history.push({
            //         pathname:'/user/NewPass'
            //     })
            // }
            else {
                alert(res.msg)
            }
        })
            .catch(err => {
                console.log(err);
            })
    }

    handleAPI = () => {
        let path = "/auth/student/otp/verification"
        let method = "POST"
        let body = this.state
        let response = PerformRequest(path, method, body)
        response.then(res => {
            console.log(res);
            if (res.err === false) {
                if (this.props && this.props.location && this.props.location.state && this.props.location.state.isLoggedIn === false && res.allow === true) {
                    this.props.history.push({
                        pathname: '/user/login',
                        state: {

                        }
                    })
                }
                else {
                    this.props.history.push({
                        pathname: '/user/login',
                        state: {


                        }
                    })
                }
                // if(res.allow==true){
                //     this.props.history.push({
                //         pathname:'/user/NewPass'
                //     })
                // }
            }
            else
                alert(res.msg)
        })
            .catch(err => {
                alert(err);
            })
    }

    handleChange = (e) => {
        let lhs = e.target.name
        let rhs = e.target.value
        this.setState({ [lhs]: rhs })
    }

    render() {
        console.log(this.state);
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
                                    <input type="text" className="Login-input" name="userTypedOtp" onChange={this.handleChange} placeholder="Enter OTP" />
                                </div>
                                {/* <div>
                                    <input type="password" className="Login-input" onChange={this.handleChange} name="password" placeholder="Password" />
                                </div> */}
                                <div>
                                    <button type="submit" className="Login-button" onClick={this.formSubmit}>VERIFY</button>
                                </div>
                                <div>
                                    <button className="Login-button" onClick={this.regenerate}>GENERATE NEW OTP</button>
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
