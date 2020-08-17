import React, { Component } from 'react'
import AnshulJain from '../../../../Assets/AnshulJain.png'
import Sofia from '../../../../Assets/Sofia.png'
import Abhishek from '../../../../Assets/Abhishek.png'
import Paul from '../../../../Assets/Paul.png'
import Comments from '../../../../Assets/pexels-photo-1454360.png'


export default class Home5 extends Component {
    render() {
        return (
            <div className='Home5-mainDiv'>
                <div className='row Home5-row'>
                    <div className='col-12 col-lg-7 Home5-upper-card' style={{ margin: "auto" }}>
                        <div className='row Home5-row'>
                            <div className='col-12 col-lg-6 '>
                                <div className='Home5-card'>
                                    <div className='container'>
                                        <div className='row Home5-row'>
                                            <div className='col-9'>
                                                <p className='Home5-rname Home5-para'>Sofia Mathew</p>
                                                <p className='Home5-rplace Home5-para'>Chennai</p>
                                            </div>
                                            <div className='Home5-col-3 col-3'>
                                                <img src={Sofia} alt="Anshul" className='Home5-rpic'></img>
                                            </div>
                                        </div>
                                        <div className='row Home5-row'>
                                            <div className='col-lg-12'>
                                                <p className='Home5-review Home5-para'>Great experience booking with BETA house. I initially had a few concerns which their assistant was very easily able to solve.</p>
                                            </div>
                                        </div>
                                        <div className='row Home5-row'>
                                            <div className='Home5-col-12 col-12'>
                                                <button className='Home5-button'>
                                                    <p className='Home5-btext Home5-para'>Read more ></p>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-12 col-lg-6'>
                                <div className='Home5-card'>
                                    <div className='container'>
                                        <div className='row Home5-row'>
                                            <div className='col-9'>
                                                <p className='Home5-rname Home5-para'>Simran Hari</p>
                                                <p className='Home5-rplace Home5-para'>Chennai</p>
                                            </div>
                                            <div className='Home5-col-3 col-3'>
                                                <img src={AnshulJain} alt="Anshul" className='Home5-rpic'></img>
                                            </div>
                                        </div>
                                        <div className='row Home5-row'>
                                            <div className='col-lg-12'>
                                                <p className='Home5-review Home5-para'>Beta house has the best properties listed and it is great that all of them are listed in one place. </p>
                                            </div>
                                        </div>
                                        <div className='row Home5-row'>
                                            <div className='col-12'>
                                                <button className='Home5-button'>
                                                    <p className='Home5-btext Home5-para'>Read more ></p>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-12 col-lg-6 '>
                                <div className='Home5-card2'>
                                    <div className='container'>
                                        <div className='row Home5-row'>
                                            <div className='col-9'>
                                                <p className='Home5-rname'>Paul Peter</p>
                                                <p className='Home5-rplace'>Chennai</p>
                                            </div>
                                            <div className='Home5-col-3 col-3'>
                                                <img src={Paul} alt="Anshul" className='Home5-rpic'></img>
                                            </div>
                                        </div>
                                        <div className='row Home5-row'>
                                            <div className='col-lg-12'>
                                                <p className='Home5-review'>Finding the right student accommodation is extremely crucial especially when you're studying abroad. </p>
                                            </div>
                                        </div>
                                        <div className='row Home5-row'>
                                            <div className='col-12'>
                                                <button className='Home5-button'>
                                                    <p className='Home5-btext'>Read more ></p>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-12 col-lg-6 '>
                                <div className='Home5-card2'>
                                    <div className='container'>
                                        <div className='row Home5-row'>
                                            <div className='col-9'>
                                                <p className='Home5-rname'>Paul Peter</p>
                                                <p className='Home5-rplace'>Chennai</p>
                                            </div>
                                            <div className='Home5-col-3 col-3'>
                                                <img src={Paul} alt="Anshul" className='Home5-rpic'></img>
                                            </div>
                                        </div>
                                        <div className='row Home5-row'>
                                            <div className='col-lg-12'>
                                                <p className='Home5-review'>Finding the right student accommodation is extremely crucial especially when you're studying abroad. </p>
                                            </div>
                                        </div>
                                        <div className='row Home5-row'>
                                            <div className='col-12'>
                                                <button className='Home5-button'>
                                                    <p className='Home5-btext'>Read more ></p>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-12 col-lg-5 Home5-card3' style={{ padding: "0rem" }}>
                        <img src={Comments} style={{ width: "100%", height: "100%", display: "block" }}></img>
                        <div className="container Home5-Overlay">
                            {/* <p className='Home5-invert'>"</p> */}
                            <p className="Home5-cardtext">Here’s what our users had to say about us...</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
