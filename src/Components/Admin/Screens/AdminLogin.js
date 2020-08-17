import React, { Component } from 'react'
import DarkNavbar from '../../Navbars/adminNavbar'
import performRequest from '../../PerformRequest'
import Footer from '../../Footer'



export default class AdminLogin extends Component {

    constructor(props) {
        super(props)
        this.state = {
            method: '',
            password: '',
            methodValue: '',

        }
    }

    handleChange = (e) => {
        let lhs = e.target.name
        let rhs = e.target.value
        this.setState({ [lhs]: rhs })
        console.log(this.state)
    }

    handleMethod = (e) => {
        let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        console.log(e)
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
        console.log(this.state)
    }

    handleAPI = () => {
        console.log(this.state)
        let path = "/auth/admin/login"
        let method = "POST"
        let body = this.state
        let response = performRequest(path, method, body)
        response.then(res => {
            if(res.err === false)
            {
                console.log(res.amdinFound[0]._id)
                alert(res.msg)
                this.props.history.push({
                    pathname:"/admin/details",
                    state:{
                        adminId : res.amdinFound[0]._id
                    }
                })
            }
            else{
                console.log(res)
            }
        })
    }

    render() {
        return (
            <div>
                <div>
                <DarkNavbar />
                <div className="container-fluid">
                    <div className=" row Login-main-div" >
                        <div className="col-lg-6 col-12 Login-main-inner1" >
                        </div>
                        <div className="col-lg-6 col-12 Login-main-inner2" >
                            <div className="Login-text1 mb-4 mt-4" >WELCOME ADMIN!</div>
                            <div> <input type="text" className="Login-input" name="email" onBlur={ this.handleMethod }  placeholder="E-mail / Phone Number" /> </div>
                            <div> <input type="password" className="Login-input" onBlur={ this.handleChange }  name="password" placeholder="Password" /> </div>
                            <div> <button className="Login-button" onClick={this.handleAPI} >LOG IN</button></div>
                            <div className="Login-text2"> <a href="/" className="text-dark"> Forgotten Password?</a></div>
                            <div className="Login-text3">Don't have an account? <span className="Login-signup-button" > <a href="/user/signup" className="text-dark" > Sign Up!</a></span> </div>
                        </div>
                    </div>
                </div>
                
            </div>
            <Footer/>
            </div>
        )
    }
}
