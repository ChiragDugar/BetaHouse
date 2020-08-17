import React, { Component } from 'react'
import Navbar from '../../../Navbars/darkNavbar'
import aboutUsImage from '../../../../Assets/people-gathered-inside-house-sitting-on-sofa-1054974.png'
import Footer from '../../../Footer'
import instaBlack from '../../../../Assets/insta-black.png'
import fbBlack from '../../../../Assets/fb-black.png'
import twitterBlack from '../../../../Assets/twitter-black.png'
import '../Stylesheets/Contact.scss'

class Careers extends Component {
    render() {
        return (
            <div style={{ fontFamily: 'Raleway' }} >
                <Navbar history = { this.props.history } />
                <div style={{ display: 'flex', margin: '3rem' }} className="Contact-head-div" >
                    <div style={{ flex: 1, letterSpacing: 2.4, fontSize: '2rem' }} className="Contact-head-inner-div" >
                        <div style={{ fontFamily: 'Crimson Text' }} className="Contact-heading"  >
                            CONTACT US
                        </div>
                        <div style={{ fontFamily: 'Raelway', fontSize: '1rem' }}>
                            Lets get to you a little better
                        </div>
                        <div style={{ marginTop: '2rem', letterSpacing: 1.27, fontSize: '1.1rem' }} >
                            <div className="container">
                                <div className="row">
                                    <div className='col-12 col-lg-6 Contact-input'>
                                        <input type='text' placeholder='Name' className='Contact-text1'></input>
                                    </div>
                                    <div className='col-12 col-lg-6 Contact-input'>
                                        <input type='text' placeholder='Phone Number' className='Contact-text1'></input>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className='col-12 col-lg-6 Contact-input'>
                                        <input type='text' placeholder='Name' className='Contact-text1'></input>
                                    </div>
                                    <div className='col-12 col-lg-6 Contact-input'>
                                        <input type='text' placeholder='Phone Number' className='Contact-text1'></input>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className='col-12 col-lg-6 Contact-input'>
                                        <input type='text' placeholder='University' className='Contact-text3'></input>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className='col-12 col-lg-3 Contact-input'>
                                        <button className='Contact-submit'><p className='Contact-btext'>SUBMIT</p></button>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div style={{ marginTop: '3rem' }} className="Contact-images" >
                            <a href="#"><img src={twitterBlack} style={{ marginRight: '1.1rem' }} width="4%" /></a>
                            <a href="#"><img src={instaBlack} style={{ marginRight: '.8rem' }} width="4%" /></a>
                            <a href="#"> <img src={fbBlack} width="1.8%" /> </a>
                        </div>
                        <div style={{ fontSize: '1rem', letterSpacing: 1.2, marginTop: '0.5rem' }} >
                            For anything else, mail us at help@betahouse.co.in
                        </div>
                    </div>
                    <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }} className="Contact-Img" >
                        <img src={aboutUsImage} className="AboutUs-Img" />
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}

export default Careers

