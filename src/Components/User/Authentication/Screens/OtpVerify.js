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
            firstName: this.props.firstName,
            lastName: this.props.lastName,
            email: this.props.location.state.email,
            phoneNumber: this.props.phoneNumber,
            password: this.props.password,
            dob: this.props.dob,
            address: this.props.address,
            gender: this.props.gender,
            type: "STUDENT"
        }
    }

    formSubmit=e=>{
        e.preventDefault()
        console.log(this.state)
        this.handleAPI()
    }

    handleAPI = () => {
        let path =  "/auth/student/validateforgotpassword"
        let method = "POST"
        let body = {
            email: this.state.email,
            uniqueCode: this.state.uniqueCode,
            type: "STUDENT"
        }
        console.log(body);
        let response = PerformRequest(path, method, body)
        response.then(res => {
            console.log(res);
            if (res.err === false) {
                if (this.props && this.props.location && this.props.location.state && this.props.location.state.isLoggedIn === false && res.allow===true) {
                    this.props.history.push({
                        pathname:'/user/NewPass',
                        state: {
                            email:this.state.email,
                            uniqueCode:this.state.uniqueCode,
                            student:res.user
                        }
                    })
                }
                else {
                    this.props.history.push({
                        pathname:'/user/NewPass',
                        state: {
                            email:this.state.email,
                            uniqueCode:this.state.uniqueCode,
                            student:res.user
                        }
                    })
                }
                localStorage.setItem("studentId",res.student);
                // if(res.allow==true){
                //     this.props.history.push({
                //         pathname:'/user/NewPass'
                //     })
                // }
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

    render() {
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
                                    <input type="text" className="Login-input" name="uniqueCode" onChange={this.handleChange} placeholder="Enter OTP" />
                                </div>
                                {/* <div>
                                    <input type="password" className="Login-input" onChange={this.handleChange} name="password" placeholder="Password" />
                                </div> */}
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
