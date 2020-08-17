import React from 'react'
import Asset1 from '../../../../Assets/Asset 29.png'
import Asset2 from '../../../../Assets/Asset 28.png'
import Asset3 from '../../../../Assets/Asset 27.png'
export default function Mhome3() {
    return (
        <div className="M-Home3-container pt-4">
            <div className="row">
                <div className="col-12 M-Home3-main-heading text-uppercase text-center">
                    Rent your place in 3 simple steps
                </div>
            </div>
            <div className="row M-Home3-content-container m-auto container">
                <div className="col-4 text-center">
                    <div className="text-center p-4">
                        <img src={Asset1} alt="Logo1"/>
                    </div>
                    <div className="M-Home3-heading-container">
                        <h4 className="M-Home3-heading">Create your listing</h4>
                    </div>
                    <div className="M-Home3-content-container">
                        <p className="M-Home3-content text-center">
                            Increase your reach<br/> and be seen by <br/>students all over the<br/> world
                        </p>
                    </div>
                </div>
                <div className="col-4 text-center">
                    <div className="text-center p-3">
                        <img src={Asset2} alt="Logo2" />
                    </div>
                    <div className="M-Home3-heading-container">
                        <h4 className="M-Home3-heading">Receive bookings</h4>
                    </div>
                    <div className="M-Home3-content-container">
                        <p className="M-Home3-content text-center">
                            Accept student offers <br/>and reserve <br/>accommodation.
                        </p>
                    </div>
                </div>
                <div className="col-4">
                    <div className="text-center">
                        <img src={Asset3} alt="Logo3" className="py-3" />
                    </div>
                    <div className="M-Home3-heading-container">
                        <h4 className="M-Home3-heading  text-center">Earn money every month</h4>
                    </div>
                    <div className="M-Home3-content-container">
                        <p className="M-Home3-content text-center">
                            Once a booking is <br/>confirmed, the money <br/>is all yours!.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
