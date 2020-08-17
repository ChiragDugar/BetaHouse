import React, { Component } from 'react'
import '../Components/ComingSoon.scss'
import Logo1 from '../Assets/white logo@2x.png'
import Footer from './Footer'



export default class ComingSoon extends Component {
    render() {
        return (
            <div className="Cs-MainDiv">
                <div className="Cs-MainDiv1">
                    <img  src={Logo1} alt="Logo" className="Cs-Logo"/>
                    <p className="Cs-Text1">LAUNCHING SOON...</p>
                    <p className="Cs-Text2">Stay tuned!</p>
                </div>
                <div className="Cs-footer">
                    <Footer/>
                </div>
            </div>

            
        )
    }
}

