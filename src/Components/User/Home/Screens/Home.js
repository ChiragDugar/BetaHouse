import React, { Component } from 'react'
import Home1 from '../Components/Home1'
import Home2 from '../Components/Home2'
import Home3 from '../Components/Home3'
import Home4 from '../Components/Home4'
import Home5 from '../Components/Home5'
import Footer from '../../../Footer'
import '../StyleSheets/Home1.scss'
import '../StyleSheets/Home2.scss'
import '../StyleSheets/Home3.scss'
import '../StyleSheets/Home4.scss'
import '../StyleSheets/Home5.scss'
import '../StyleSheets/Home6.scss'
import '../StyleSheets/Footer.scss'
import '../StyleSheets/Datepicker.scss'

export default class Home extends Component {
    render() {
        return (
            <div>
                <Home1 history={this.props.history} studentId={this.props.location.state === undefined ? '' : this.props.location.state.studentId} />
                <Home4 history={this.props.history} />
                <Home3 />
                <Home2 />
                <Home5 />
                {/* <Home6 /> */}
                <Footer />
            </div>
        )
    }
}
