import React, { Component } from 'react'
import HostelDetails from '../Components/HostelDetails.js'
import '../Stylesheets/HostelDetails.scss'
import '../Stylesheets/Feature.scss'
import Navbar from '../../../Navbars/darkNavbar'
import Footer from '../../../Footer.js'

export default class ListingDetails extends Component {
    render() {
        return (
            <div>
                <Navbar history={this.props.history} />
                <div>
                    <HostelDetails history={this.props.history} studentId={this.props.location.state !== undefined ? this.props.location.state.studentId : ""} />
                </div>
                <Footer />
            </div>
        )
    }
}
