import React, { Component } from 'react'
import Mhome2Logo from '../../../../Assets/Asset 1@2x.png'
import Logo from '../../../../Assets/BetaHouseFinalLogo-25.png'

export default class Mhome2 extends Component {
    render() {
        return (
            <div className="Mhome2-container">
                <div className="row">
                    <div className="col-5 Mhome2-logo-container">
                    </div>
                    <div className="col-7">
                        <div className="row Mhome2-about-container">
                            <div className="row">
                                <div className="Mhome2-title1">ABOUT US</div>
                            </div>
                            <div className="row">
                                <div className="Mhome2-about">
                                    Betahouse is a trusted  global brand for comfortable accommodations for students and working professionals alike,
                                    with our wide range of student accommodations and co-living properties.
                                    We believe in providing comfort to our users when they are away from their homes.
                                </div>
                            </div>
                        </div>
                        <div className="row Mhome2-choose-container">
                            <div className="row">
                                <div className="Mhome2-title2">WHY CHOOSE US?</div>
                            </div>
                            <div className="row Mhome2-choose">
                                <div className="row Mhome2-choose-row1">
                                    <div className="col-4 Mhome2-choose-text ">Create listings and publish them on our website</div>
                                    <div className="col-4 Mhome2-choose-text Mhome2-choose-mid-col">Have a personal dashboard to track your booking.</div>
                                    <div className="col-4 Mhome2-choose-text">Welcome your tenant and get paid monthly.</div>
                                </div>
                                <div className="row">
                                    <div className="col-4 Mhome2-choose-text">100% control over your rental property management.</div>
                                    <div className="col-4 Mhome2-choose-text Mhome2-choose-mid-col">Receive feedback from tenants.</div>
                                    <div className="col-4 Mhome2-choose-text">Make use of our marketing analytics tools to evaluate your listing.</div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
