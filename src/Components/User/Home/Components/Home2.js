import React from 'react'
import Asset1 from '../../../../Assets/Asset 21.png'
import Asset2 from '../../../../Assets/Asset 24.png'
import Asset3 from '../../../../Assets/Asset 20.png'
import Asset4 from '../../../../Assets/Asset 23.png'
import Asset5 from '../../../../Assets/Asset 19.png'
import Asset6 from '../../../../Assets/Asset 22.png'


export default function Home2() {
    return (
        <div>
            <div id="why-book-with-betahouse" className="Home2-container text-white">
                <div className="Home2-subcontainer m-auto">
                    <div className="row m-auto Home2-heading-container p-3">
                        <h4 className="Home2-heading m-auto text-uppercase p-4">
                            Why book with Beta house?
                        </h4>
                    </div>
                    <div className="m-auto text-center pt-4">
                        <div className="row pt-2">
                            <div className="col m-auto ">
                                <div className="px-5">
                                    <img src={Asset1} alt="Asset1" />
                                </div>
                                <h4 className="Home2-subHeading">No Commision charges</h4>
                                <p className="Home2-info px-5">
                                    You read it right! We don't charge our users a commision on top of the accommodation rate!
                                </p>
                            </div>
                            <div className="col m-auto">
                                <div className="px-5">
                                    <img src={Asset4} alt="Asset4" />
                                </div>
                                <h4 className="Home2-subHeading">100 % Secure payment</h4>
                                <p className="Home2-info px-5">
                                    Incase of an incomplete transaction we promise a complete refund of funds.
                                </p>
                            </div>

                            <div className="col m-auto">
                                <div className="px-5">
                                    <img src={Asset3} alt="Asset3" />
                                </div>
                                <h4 className="Home2-subHeading">Instant Bookings</h4>
                                <p className="Home2-info px-5">
                                    Simple and quick booking process to increase convenience.
                                </p>
                            </div>
                        </div>
                        <div className="row mt-4">

                            <div className="col m-auto">
                                <div className="px-5">
                                    <img src={Asset2} alt="Asset2" />
                                </div>
                                <h4 className="Home2-subHeading">Comfortable Stays</h4>
                                <p className="Home2-info px-5">
                                    We want our users to feel at home at their Student accommodation and Co-living accommodations!
                                </p>
                            </div>
                            <div className="col m-auto">
                                <div className="px-5">
                                    <img src={Asset5} alt="Asset5" />
                                </div>
                                <h4 className="Home2-subHeading">Verified Properties</h4>
                                <p className="Home2-info px-5">
                                    Every student accommodation partner or co-living partner goes through a rigorous quality test. Rest assured all our accommodation partners meet the basic quality norms.
                                </p>
                            </div>
                            <div className="col m-auto">
                                <div className="px-5">
                                    <img src={Asset6} alt="Asset6" />
                                </div>
                                <h4 className="Home2-subHeading">100 % User Safety</h4>
                                <p className="Home2-info px-5">
                                    Our top priority is to ensure the living environment is safe for our users alike.
                                    Hence we ensure every accomodation partner meets the basic safety norms set by us!
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
