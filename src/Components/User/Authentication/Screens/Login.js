import React, { Component } from 'react'
import '../Stylesheets/Login.scss'
import DarkNavbar from '../../../Navbars/darkNavbar'
import PerformRequest from '../../../PerformRequest'
import Footer from '../../../Footer'
import Back from '../../../../Assets/LoginImage.png'


class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            method: '',
            methodValue: '',
            password: ''
        }
    }

    componentDidMount() {
        const urlParams = new URLSearchParams(window.location.search);
        console.log(urlParams);
        if (urlParams.has('err')) {
            alert(urlParams.get('msg'));
        }
        console.log(this.props.location.state)
    }

    formSubmit = e => {
        e.preventDefault();
        console.log("Submitted")
        this.handleAPI()
    }

    handleAPI = () => {
        let path = "/auth/student/login"
        let method = "POST"
        let body = this.state
        let response = PerformRequest(path, method, body)
        response.then(res => {
            if (res.err === false) {
                alert("Successfully Logged In!")
                if (this.props && this.props.location && this.props.location.state && this.props.location.state.isLoggedIn === false) {
                    this.props.history.push({
                        pathname: '/user/overview',
                        state: {
                            studentId: res.studentId,
                            selectedRoomType: this.props.location.state.selectedRoomType,
                            fromDate: this.props.location.state.fromDate,
                            toDate: this.props.location.state.toDate,
                            totalCost: this.props.location.state.totalCost,
                            taxAmount: this.props.location.state.taxAmount,
                            perPersonCostPerMonth: this.props.location.state.perPersonCostPerMonth,
                            roomTypeName: this.props.location.state.roomType,
                            propertyName: this.props.location.state.propertyName,
                            basePrice: this.props.location.state.basePrice,
                            isLoggedIn: true,
                            propertyId: this.props.location.state.propertyId,
                            // firstName: this.props.location.state.firstName,
                            // lastName: this.props.location.state.lastName,
                            // email: this.props.location.state.email,
                            // contactNumber: (this.props.location.state.codeNumber + ' ' + this.props.location.state.contactNumber),
                            // dateOfBirth: this.props.location.state.dateOfBirth,
                            // nationality: this.props.location.state.nationality,
                            // country: this.props.location.state.country,
                            // city: this.props.location.state.city,
                            // postalCode: this.props.location.state.postalCode,
                            // gender: this.props.location.state.gender,
                            // address: this.props.location.state.address,
                            // whereDidYouHearAboutUs: this.props.location.state.whereDidYouHearAboutUs
                            formData: this.props.location.state.formData
                        }
                    })
                    window.location.reload()
                }
                else {
                    this.props.history.push({
                        pathname: '/',
                        state: {
                            studentId: res.studentId
                        }
                    })
                }
                localStorage.setItem("studentId", res.studentId);
                localStorage.setItem("studentName", res.studentName);
                localStorage.setItem("studentFirstName", res.studentDetails.firstName)
                localStorage.setItem("studentLastName", res.studentDetails.lastName)
                localStorage.setItem("studentEmail", res.studentDetails.email)
                localStorage.setItem("studentPhoneNumber", res.studentDetails.phoneNumber)
                var dob = res.studentDetails.dob;
                dob = dob.split('T')[0]
                localStorage.setItem("studentDob", dob)
                localStorage.setItem("studentAddress", res.studentDetails.address)
                localStorage.setItem("studentGender", res.studentDetails.gender)
                localStorage.setItem("x-auth-token", res.token);
                // console.log(res.studentDetails, "####");
            }
            else
                alert(res.msg)
        })
    }

    handleChange = (e) => {
        let lhs = e.target.name
        let rhs = e.target.value
        this.setState({ [lhs]: rhs })
    }


    handleSignUp = () => {
        if (this.props && this.props.location && this.props.location.state && this.props.location.state.isLoggedIn === false) {
            this.props.history.push({
                pathname: '/user/signup',
                state: {
                    studentId: localStorage.getItem("studentId"),
                    selectedRoomType: this.props.location.state.selectedRoomType,
                    fromDate: this.props.location.state.fromDate,
                    toDate: this.props.location.state.toDate,
                    totalCost: this.props.location.state.totalCost,
                    taxAmount: this.props.location.state.taxAmount,
                    perPersonCostPerMonth: this.props.location.state.perPersonCostPerMonth,
                    roomTypeName: this.props.location.state.roomType,
                    propertyName: this.props.location.state.propertyName,
                    basePrice: this.props.location.state.basePrice,
                    isLoggedIn: false,
                    propertyId: this.props.location.state.propertyId,
                    formData: this.props.location.state.formData
                }
            })
            window.location.reload()
        }
        else {
            this.props.history.push({
                pathname: '/user/signup',
            })
        }
    }

    handleMethod = (e) => {
        let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (e.target.value.match(regexEmail)) {
            this.setState({
                method: 'email',
                methodValue: e.target.value
            })
        }
        else {
            this.setState({
                method: 'phoneNumber',
                methodValue: e.target.value
            })
        }
    }

    handleGoogleLogin = () => {
        window.open("https://backend.betahouse.co.in/auth/google/google", "_self");
    }

    handleFacebookLogin = () => {
        window.open("https://backend.betahouse.co.in/auth/facebook/facebook", "_self");
    }

    handleForgotPassPage = () => {
        this.props.history.push({
            pathname: '/user/ForgotPass'
        })
    }

    render() {
        return (
            <div>

                <div className="container-fluid Login-Dash" style={{ pading: "0rem" }}>

                    <DarkNavbar />
                    <div className="Login-main">
                        <div className="Login-main-left">
                            <img className="Login-main-left-image" src={Back} />
                        </div>
                        <div className="Login-main-right">
                            <div className="Mlogin-text1 mb-4 mt-4" >WELCOME USER!</div>
                            <form autoComplete="off" className="Login-form" onSubmit={this.formSubmit}>
                                <div style={{marginBottom: '0.5rem'}}>
                                    <input name="email" onChange={this.handleChange} type="text" placeholder="E-Mail / Phone Number" className="Login-main-input" onBlur={this.handleMethod} />
                                </div>
                                <div>
                                    <input name="password" onChange={this.handleChange} type="password" placeholder="Password" className="Login-main-input" />
                                </div>
                                <div className="Login-main-button">
                                    <button className="Login-main-btn-display" onClick={this.formSubmit}>LOG IN</button>
                                </div>
                            </form>
                            <div className="Login-forget-password">
                                <p onClick={this.handleForgotPassPage} 
                                className="F-hover" style={{
                                    cursor: 'pointer',
                                    fontSize: '1.1rem',
                                    letterSpacing: '0.1rem'
                                }}>Forgot Password ?</p>
                            </div>
                            <div className="Login-create-account">
                                <p 
                                style ={{
                                        fontSize: '1.1rem',
                                        letterSpacing: '0.1rem',
                                        marginRight: '10px'
                                    }}
                                >Don't have an account?</p>
                                <p
                                    style={{
                                        fontSize: '1.1rem',
                                        letterSpacing: '0.1rem',
                                        cursor: 'pointer',
                                    }}
                                ><strong onClick={this.handleSignUp}
                                style={{
                                    cursor: 'pointer',
                                    fontSize: '1.1rem',
                                    letterSpacing: '0.2rem',
                                }}
                                >Register Now!</strong></p>
                            </div>
                            <button className="loginBtn loginBtn--facebook"
                                onClick={() => this.handleFacebookLogin()}>
                                Login with Facebook
                            </button>

                            <button className="loginBtn loginBtn--google"
                                onClick={() => this.handleGoogleLogin()}>
                                Login with Google
                            </button>
                        </div>
                    </div>
                    <div className="container-fluid Login-Dash" style={{ padding: "0rem" }}>
                        <Footer />
                    </div>
                </div>
            </div>
        )
    }
}

export default Login

/*
                    <div className=" row Login-main-div" >
                        <div className="col-lg-6 col-12 Login-main-inner1" style={{padding:"0rem"}}>
                            <img src={Back} style={{height:"100%",width:"100%"}}></img>
                        </div>
                        <div className="col-lg-6 col-12 Login-main-inner2">
                            <form onSubmit={this.formSubmit}>
                                <div>
                                    <input type="text" className="Login-input" name="email" onBlur={this.handleMethod} placeholder="E-mail / Phone Number" />
                                </div>
                                <div>
                                    <input type="password" className="Login-input" onChange={this.handleChange} name="password" placeholder="Password" />
                                </div>
                                <div>
                                    <button type="submit" className="Login-button" onClick={this.formSubmit}>LOG IN</button>
                                </div>
                            </form>

                            <div className="Login-text2"> <a href="/user/ForgotPass" className="text-dark"> Forgotten Password?</a></div>
                            <div className="Login-text3">Don't have an account? <span className="Login-signup-button" > <a className="text-dark" onClick={this.handleSignUp} > Sign Up!</a></span> </div>
                            <button className="loginBtn loginBtn--facebook"
                                onClick={() => this.handleFacebookLogin()}>
                                Login with Facebook
                            </button>

                            <button className="loginBtn loginBtn--google"
                                onClick={() => this.handleGoogleLogin()}>
                                Login with Google
                            </button>

                        </div>
                    </div>
*/
