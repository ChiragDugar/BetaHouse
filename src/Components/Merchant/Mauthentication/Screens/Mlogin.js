import React, { Component } from 'react'
import '../Stylesheets/Mlogin.scss'
import PerformRequest from '../../../PerformRequest'
import Footer from '../../../Footer'
import Navbar from '../../../Navbars/transparentUserNavbar'


class Mlogin extends Component {

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: ''
        }
    }

    componentDidMount(){
        console.log(localStorage.getItem('merchantId'))
        if(localStorage.getItem('merchantId')!==null){
            this.props.history.push('/merchant/dashboard')
        }
    }

    handleAPI = (e) => {
        e.preventDefault()
        let path = "/auth/merchant/login"
        let method = "POST"
        let body = this.state
        let response = PerformRequest(path, method, body)
        response.then(res => {
            if (res.err === false){
                console.log(res)
                alert("Successfully Signed Up!")
                localStorage.setItem("merchantId", res.details[0]._id);
                localStorage.setItem("merchantName",  res.details[0].firstName);
                localStorage.setItem("x-auth-token", res.token);
                this.props.history.push({
                    pathname: '/merchant/dashboard',
                    state: {merch_id:res.details[0]._id}
                })
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
                <div className="Mlogin-main-div" >
                    <div className="Mlogin-main-inner1" >
                    </div>
                    <form className="Mlogin-main-inner2" onSubmit={this.handleAPI}>
                        <div className="Mlogin-text1 mb-4 mt-4" >WELCOME MERCHANT!</div>
                        <div> <input type="text" className="Mlogin-input" onChange={this.handleChange} name="email" placeholder="E-mail" /> </div>
                        <div> <input type="password" className="Mlogin-input" onChange={this.handleChange} name="password" placeholder="Password" /> </div>
                        <div> <button type="submit" className="Mlogin-button" onClick={this.handleAPI}>LOG IN</button></div>
                        <div className="Login-forget-password" style={{marginTop: '1rem'}}>
                                <p onClick={this.handleForgotPassPage} 
                                className="F-hover" style={{
                                    cursor: 'pointer',
                                    fontSize: '1.1rem',
                                    letterSpacing: '0.1rem'
                                }}>Forgot Password ?</p>
                            </div>
                            <div  className="Login-create-account">
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
                    </form>
                </div>
                <Footer/>
            </div>
        )
    }
}

export default Mlogin