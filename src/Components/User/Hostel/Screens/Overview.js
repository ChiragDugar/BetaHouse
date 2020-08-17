import React, { Component } from 'react'
import DarkNavbar from '../../../Navbars/darkNavbar'
import Footer from '../../../../../src/Components/Footer'
import '../Stylesheets/Overview.scss'
import OverviewLeftPane from '../Components/overviewLeftPane'
import OverviewRightPane from '../Components/overviewRightPane'
import Modal from 'react-modal'
import performRequest from '../../../PerformRequest'
// import performRequest from '../../../PerformRequest'
import Cross from '../../../../../src/Assets/Enquiry-cross.png'


export default class Overview extends Component {

    state = {
        firstName: this.props && this.props.location && this.props.location.state && this.props.location.state.formData && this.props.location.state.formData.firstName ? this.props.location.state.formData.firstName : '',
        lastName: this.props && this.props.location && this.props.location.state && this.props.location.state.formData && this.props.location.state.formData.lastName ? this.props.location.state.formData.lastName : '',
        email: this.props && this.props.location && this.props.location.state && this.props.location.state.formData && this.props.location.state.formData.email ? this.props.location.state.formData.email : '',
        contactNumber: this.props && this.props.location && this.props.location.state && this.props.location.state.formData && this.props.location.state.formData.contactNumber ? this.props.location.state.formData.contactNumber : '',
        dateOfBirth: this.props && this.props.location && this.props.location.state && this.props.location.state.formData && this.props.location.state.formData.dateOfBirth ? this.props.location.state.formData.dateOfBirth : '',
        nationality: this.props && this.props.location && this.props.location.state && this.props.location.state.formData && this.props.location.state.formData.nationality ? this.props.location.state.formData.nationality : '',
        country: this.props && this.props.location && this.props.location.state && this.props.location.state.formData && this.props.location.state.formData.country ? this.props.location.state.formData.country : '',
        city: this.props && this.props.location && this.props.location.state && this.props.location.state.formData && this.props.location.state.formData.city ? this.props.location.state.formData.city : '',
        postalCode: this.props && this.props.location && this.props.location.state && this.props.location.state.formData && this.props.location.state.formData.postalCode ? this.props.location.state.formData.postalCode : '',
        gender: this.props && this.props.location && this.props.location.state && this.props.location.state.formData && this.props.location.state.formData.gender ? this.props.location.state.formData.gender : '',
        address: this.props && this.props.location && this.props.location.state && this.props.location.state.formData && this.props.location.state.formData.address ? this.props.location.state.formData.address : '',
        whereDidYouHearAboutUs: this.props && this.props.location && this.props.location.state && this.props.location.state.formData && this.props.location.state.formData.whereDidYouHearAboutUs ? this.props.location.state.formData.whereDidYouHearAboutUs : '',
        codeNumber: this.props && this.props.location && this.props.location.state && this.props.location.state.formData && this.props.location.state.formData.codeNumber ? this.props.location.state.formData.codeNumber : '91',
        showModal: false,
        formName: '',
        formEmail: '',
        formNumber: '',
        formMessage: '',
    }

    enquireNow = () => {
        let path = "/property/inquirenow"
        let method = "POST"
        let body = {
            name: this.state.formName,
            number: this.state.formNumber,
            email: this.state.formEmail,
            message: this.state.formMessage,
            propertyId: this.props.history.location.state.propertyId,
            roomTypeId: this.props.history.location.state.selectedRoomType
        }
        let response = performRequest(path, method, body)
        response.then(res => {
            alert(res.msg)
            this.setState({
                showModal: false
            })
        })
    }

    handleModal = () => {
        this.setState({
            showModal: true
        })
    }
    closeModal = () => {
        this.setState({
            showModal: false
        })
    }

    handleForm = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        }, () => console.log("!", this.state))

    }

    render() {
        console.log("ASD",this.state);
        return (
            <div>
                <DarkNavbar history={ this.props.history } />
                <div className="mt-5 ml-5">
                    <div className="row p-0 m-0">
                        <div className=" col-lg-6 col-12">
                            <OverviewLeftPane data={this.props.location.state} handleForm={this.handleForm} set={this.state} />
                        </div>
                        <div className="col-lg-6 col-12">
                            <OverviewRightPane data={this.props.location.state} history={this.props.history} formData={this.state.whereDidYouHearAboutUs !== "" ? this.state : ''} showModal={this.state.showModal} handleModal={this.handleModal} />
                        </div>
                    </div>
                </div>
                <Modal
                    isOpen={this.state.showModal}
                    shouldCloseOnOverlayClick={true}
                >
                    <div className='Home6-mainDiv'>
                        <span onClick={this.closeModal} style={{ float: "right", fontSize: "2rem",cursor:"pointer" }}><img src={Cross} style={{height:"2rem",width:"2rem"}}></img></span>
                        <div className='container'>
                            <div className='row'>
                                <div className='col-12 md-6'>
                                    <p className='Home6-p1 Home6-p'>Get in touch with us!</p>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-12 md-6'>
                                    <p className='Home6-p2 Home6-p'>For any queries - Fill in your information <br /> to get in touch with the Betahouse team</p>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-12 col-lg-5'>
                                    <input type='text' placeholder='Name' name="formName" className='Home6-text1 Home6-input' onChange={this.handleForm} required></input>
                                </div>
                                <div className='col-12 col-lg-5'>
                                    <input type='text' placeholder='Phone Number' name="formNumber" onChange={this.handleForm} className='Home6-text1 Home6-input' required></input>
                                </div>
                                <div className='col-2'>
                                </div>
                            </div>

                            <div className='row'>
                                <div className='col-12 col-lg-5'>
                                    <input type='text' placeholder='E-mail' name="formEmail" className='Home6-text2 Home6-input' onChange={this.handleForm} required></input>
                                </div>
                                <div className='col-12 col-lg-5'>
                                    <input type='text' placeholder='Message' name="formMessage" className='Home6-text2 Home6-input' onChange={this.handleForm}></input>
                                </div>
                                <div className='col-2'>
                                </div>
                            </div>
                            <div className='row'>
                                {/* <div className='col-12 col-lg-5'>
                                        <input type='text' placeholder='University' className='Home6-text3 Home6-input'></input>
                                    </div> */}
                                <div className='col-12 col-lg-3'>
                                    <button className='Home6-submit' onClick={this.enquireNow}><p className='Home6-btext'>SUBMIT</p></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>
                <div>
                    <Footer />
                </div>
            </div>
        )
    }
}

