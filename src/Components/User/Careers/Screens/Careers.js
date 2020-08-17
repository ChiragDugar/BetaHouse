import React, { Component } from 'react'
import Navbar from '../../../Navbars/darkNavbar'
import aboutUsImage from '../../../../Assets/careers.png'
import Footer from '../../../Footer'
import instaBlack from '../../../../Assets/insta-black.png'
import fbBlack from '../../../../Assets/fb-black.png'
import twitterBlack from '../../../../Assets/twitter-black.png'
import '../Stylesheets/Careers.scss'

class Careers extends Component {
    render() {
        return (
            <div style={{ fontFamily: 'Raleway' }} >
                <Navbar history = { this.props.history } />
                <div style={{ display: 'flex', margin: '3rem' }} className="Careers-head-div" >
                    <div style={{ flex: 1, letterSpacing: 2.4, fontSize: '2rem' }} >
                        <div style={{ fontFamily: 'Crimson Text' }} className="Careers-heading"  >
                            COME BUILD THE FUTURE WITH US
                        </div>
                        <div style={{ marginTop: '2rem', letterSpacing: 1.27, fontSize: '1.1rem' }} >
                            Our mission is to be world's most customer-centric company. By saying that, we want to ensure every user of our portal, be it for Student Accommodations or for Co-Living spaces, should be assured of quality and comfort!
                            <br /> <br />
                            This being the vision, we are looking for a bunch of smart minds to work towards achieving this mission! Want to be part of the world's next big student housing / Co-living booking portal? Reach out to us today!
                            <br /><br />
                            Email us at --> <a href="mailto:careers@betahouse.co.in">careers@betahouse.co.in</a>
                        </div>
                        <div style={{ marginTop: '3rem' }} className="Careers-images" >
                            <a href="#"><img src={twitterBlack} style={{ marginRight: '1.1rem' }} width="4%" /></a>
                            <a href="#"><img src={instaBlack} style={{ marginRight: '.8rem' }} width="4%" /></a>
                            <a href="#"> <img src={fbBlack} width="1.8%" /> </a>
                        </div>
                        <div style={{ fontSize: '1rem', letterSpacing: 1.2, marginTop: '0.5rem' }} >
                            For anything else, mail us at help@betahouse.co.in
                        </div>
                    </div>
                    <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                        <img src={aboutUsImage} className="Careers-main-image" />
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}

export default Careers
