import React, { Component } from 'react'
import '../Stylesheets/MsignUp.scss'
import PerformRequest from '../../../PerformRequest'
import Footer from '../../../Footer'


class MsignUp extends Component {

    constructor(props) {
        super(props)
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            password: '',
            dob: '',
            address: '',
            gender: ''
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
        let path = "/auth/merchant"
        let method = "POST"
        let body = this.state
        let response = PerformRequest(path, method, body)
        response.then(res => {
            if (res.err === false){
                console.log(res.merchantRecord._id)
                alert("Successfully Signed Up!")
                this.props.history.push({
                    pathname: '/merchant/login',
                    state: {merch_id:res.merchantRecord._id}
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
                <div className="MsignUp-main-div" >
                    <div className="MsignUp-main-inner1" >
                    </div>
                    <div className="MsignUp-main-inner2" >
                        <div className="MsignUp-text1 mb-4 mt-4" >
                            REGISTER HERE TO LIST A
                            <br />
                            COMFORTABLE STUDENT ACCOMODATION
                        </div>
                        <div className="MsignUp-main-inner2-sub1" >

                            <div>
                                <input type="text" onChange={this.handleChange} className="MsignUp-input" name="firstName" placeholder="First Name" />
                                <input type="text" onChange={this.handleChange} className="MsignUp-input" name="lastName" placeholder="Last Name" />
                            </div>

                            <div>
                                <input type="text" onChange={this.handleChange} className="MsignUp-input" name="email" placeholder="E-mail" />
                                <input type="text" onChange={this.handleChange} className="MsignUp-input" name="phoneNumber" placeholder="Mobile Number" />
                            </div>

                            <div>
                                <input type="password" onChange={this.handleChange} className="MsignUp-input" name="password" placeholder="Password" />
                                <input type="date" onChange={this.handleChange} className="MsignUp-input" name="dob" placeholder="Date of Birth" />
                            </div>

                            <div>
                                <input type="text" onChange={this.handleChange} className="MsignUp-input" name="address" placeholder="Address" />
                                <input type="text" onChange={this.handleChange} className="MsignUp-input" name="gender" placeholder="Gender" />
                            </div>

                        </div>
                        <div> <button type="submit" className="MsignUp-button" onClick={this.handleAPI} >CREATE ACCOUNT</button></div>
                        <div className="MsignUp-footer-text" >
                            <div className="MsignUp-footer-text-1" >
                                <input type="checkbox" className="MsignUp-checkbox" />
                            </div>
                            <div className="MsignUp-footer-text-2">
                                I have read and agree to the terms and conditions.
                            </div>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}

export default MsignUp