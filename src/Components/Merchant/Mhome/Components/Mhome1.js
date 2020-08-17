import React, { Component } from 'react'
import Logo from '../../../../Assets/Asset 1.png'
import Navbar from '../../../Navbars/transparentMerchantNavbar'



export default class Mhome1 extends Component {
    render() {
        return (
            <div className="Mhome1-nav-container">
                <Navbar history = {this.props.history}/>
                <div className="Mhome1-container">
                    <div className="row Mhome1-titles">
                        <div className="col-7 ">
                            <div className="row Mhome1-title-1">
                                <div className="col">
                                    PARTNER WITH US
                                </div>
                            </div>
                            <div className="row Mhome1-title-2">
                                <div className="col">
                                    List your property on Betahouse!
                                </div>
                            </div>
                        </div>
                        <div className="col-5">
                            <form action="" className="Mhome1-form-container" onClick={()=>{this.props.history.push('/merchant/signup')}}>
                                <div className="row">
                                    <div className="col text-center Mhome1-form-title">
                                        SIGN UP NOW!
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col text-center">
                                        <input type="text" className="Mhome1-form-input-text" placeholder="Name" disabled={true}/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col text-center">
                                        <input type="text" className="Mhome1-form-input-text" placeholder="E-mail" disabled={true} />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col text-center">
                                        <input type="text" className="Mhome1-form-input-text" placeholder="Phone Number" disabled={true} />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col text-center">
                                        <input type="text" className="Mhome1-form-input-text" placeholder="Country" disabled={true} />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col text-center">
                                        <button className="Mhome1-form-button">SUBMIT</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
