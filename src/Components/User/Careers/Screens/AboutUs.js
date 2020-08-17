import React, { Component } from 'react'
import Navbar from '../../../Navbars/darkNavbar'
import aboutUsImage from '../../../../Assets/people-gathered-inside-house-sitting-on-sofa-1054974.png'
import Footer from '../../../Footer'
import instaBlack from '../../../../Assets/insta-black.png'
import fbBlack from '../../../../Assets/fb-black.png'
import twitterBlack from '../../../../Assets/twitter-black.png'
import '../Stylesheets/AboutUs.scss'

class Careers extends Component {
    render() {

        return (
            <div style={{ fontFamily: 'Raleway' }} >
                <Navbar history = { this.props.history } />
                <div style={{ display: 'flex', margin: '3rem' }} className="Aboutus-head-div">
                    <div style={{ flex: 1, letterSpacing: 2.4, fontSize: '2rem' }} >
                        <div style={{ fontFamily: 'Crimson Text' }} className="Aboutus-heading"  >
                            ABOUT US
                        </div>
                        <div style={{ marginTop: '2rem', letterSpacing: 1.27, fontSize: '1.1rem' }} >
                            <b>We’re building the future of living</b><br></br>
                        At BetaHouse, we’re on a mission to change the way people live in cities. We believe it is the combination of culture, people and technology that makes cities such a vital place to stay and work. It’s a future where everybody will need to help and make use their time which points towards a conscious and sustainable way of living.<br></br><br></br>
                            <b>It’s about comfort</b> <br></br>
                        Property managers provide clean facilities and provide staff to fix eveyday issues. Most of them also provide facilities such as fast Wi-Fi, laundry, stocked kitchens, workspaces, communal areas, gym and a swimming pool. Such amenities are generally too expensive, but are included in your living fee.<br></br><br></br>
                            <b>It’s about help</b> <br></br>
                        We are living in the ‘age of loneliness’. We all need to live lives of meaning and substance. We all deserve to feel on top of the world and have a peace of mind. That comes with having someone who’s always got our back. We’re helping people access such accommodations which they can call home.<br></br><br></br>
                            <b>It’s about living together</b> <br></br>
                        It is help and hospitality that helps build the relationships of trust between people. Relationships are the backbone of every community and the community gives meaning to the place we call home. We are offering community based accommodation for students and working professionals.
                        </div>
                        <div style={{ marginTop: '3rem' }} className="Aboutus-images">
                            <a href="#"><img src={twitterBlack} style={{ marginRight: '1.1rem' }} width="4%" /></a>
                            <a href="#"><img src={instaBlack} style={{ marginRight: '.8rem' }} width="4%" /></a>
                            <a href="#"> <img src={fbBlack} width="1.8%" /> </a>
                        </div>
                        <div style={{ fontSize: '1rem', letterSpacing: 1.2, marginTop: '0.5rem' }} >
                            For anything else, mail us at help@betahouse.co.in
                        </div>
                    </div>
                    <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }} >
                        <img src={aboutUsImage} className="AboutUs-Img" />
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}

export default Careers

