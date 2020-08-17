import React, { Component } from 'react'
import Socials from '../Assets/SM.png'

export default class Footer extends Component {
    render() {
        return (
            <div >
                <footer class="page-footer " style={{ background: "black", color: "white", fontFamily: "Raleway" }}>
                    <div class="container-fluid " style={{ textAlign: "center" }}>
                        <div class="row">
                            <div className="col-md-6">
                                <div className="row">
                                    <div class=" mx-auto Footer-col" style={{ width: "50%" }}>
                                        <h5 class="font-weight-bold text-uppercase mt-3 mb-4 ">Resources</h5>

                                        <ul class="list-unstyled">
                                            <li style={{ padding: "0.25rem" }}>
                                                <a href="/#why-book-with-betahouse" style={{ color: "white" }}>Why Book with Us</a>
                                            </li>
                                            <li style={{ padding: "0.25rem" }}>
                                                <a href="#!" style={{ color: "white" }}>Blog</a>
                                            </li>
                                            <li style={{ padding: "0.25rem" }}>
                                                <a href="/user/careers" style={{ color: "white" }}>Career</a>
                                            </li>
                                        </ul>

                                    </div>
                                    {/* <hr class="clearfix w-100 d-md-none"></hr> */}
                                    <div class=" mx-auto Footer-col" style={{ width: "50%" }}>

                                        <h5 class="font-weight-bold text-uppercase mt-3 mb-4">HELP</h5>

                                        <ul class="list-unstyled">
                                            <li style={{ padding: "0.25rem" }}>
                                                <a href="/user/contactus" style={{ color: "white" }}>Contact Us</a>
                                            </li>
                                            <li style={{ padding: "0.25rem" }}>
                                                <a href="#!" style={{ color: "white" }}>SiteMap</a>
                                            </li>
                                            <li style={{ padding: "0.25rem" }}>
                                                <a href="#!" style={{ color: "white" }}>How to Book</a>
                                            </li>
                                            <li style={{ padding: "0.25rem" }}>
                                                <a href="/user/termsandconditions" style={{ color: "white" }}>Terms and Conditions</a>
                                            </li>
                                        </ul>

                                    </div>

                                    <hr class="clearfix w-100 d-md-none"></hr>
                                </div>

                            </div>

                            <div className="col-md-6">
                                <div className="row">
                                    <div class="mx-auto Footer-col" style={{ width: "50%" }}>
                                        <h5 class="font-weight-bold text-uppercase mt-3 mb-4">Quick Links</h5>

                                        <ul class="list-unstyled">
                                            <li style={{ padding: "0.25rem" }}>
                                                <a href="/merchant/login" style={{ color: "white" }}>Partner Login</a>
                                            </li>
                                            <li style={{ padding: "0.25rem" }}>
                                                <a href="/user/login" style={{ color: "white" }}>User Login</a>
                                            </li>
                                            <li style={{ padding: "0.25rem" }}>
                                                <a href="/user/contactus" style={{ color: "white" }}>Write to Us</a>
                                            </li>
                                            {/* <li style={{padding:"0.25rem"}}>
                                        <a href="#!" style={{color:"white"}}>Link 4</a>
                                    </li> */}
                                        </ul>

                                    </div>
                                    {/* <hr class="clearfix w-100 d-md-none"></hr> */}
                                    <div class=" mx-auto Footer-col" style={{ width: "50%" }}>
                                        <h5 class="font-weight-bold text-uppercase mt-3 mb-4">#Follow</h5>

                                        <ul class="list-unstyled">
                                            <li style={{ padding: "0.25rem" }}>
                                                <img src={Socials}></img>
                                            </li>
                                            <li style={{ padding: "0.25rem" }}>
                                                <p style={{ color: "white" }}>See the best student housing across cities,<br></br> talk to us, and interact with the community</p>
                                            </li>
                                        </ul>

                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>
                </footer>
            </div>
        )
    }
}
