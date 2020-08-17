import React, { Component } from 'react'
import DarkNavbar from '../../../Navbars/darkMerchantNavbar'
import Box1 from '../Component/Box1'
import Box2 from '../Component/Box2'
import Box3 from '../Component/Box3'
import Box4 from '../Component/Box4'
import LineChart from '../Component/lineChart'
import Table from '../Component/table'
import Footer from '../../../Footer'
// import Comparison from '../Component/comparison'

export default class Stat extends Component {
    // constructor(props) {
    //     super(props)
    // }

    render() {
        return (
            <div className="Stat-container">
                <DarkNavbar history={this.props.history} />
                <div className="row ml-0 mr-0">
                    <div className="col-lg-3 col-md-6 col-sm-12">
                        <Box1 />
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-12">
                        <Box2 />
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-12">
                        <Box3 />
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-12">
                        <Box4 />
                    </div>
                    <div className="bg-white col-lg-7 col-sm-12 border border-white border-rounded">
                        <LineChart />
                    </div>
                    <div className="bg-white col-lg-5 col-sm-12 border border-white border-rounded">
                        <Table />
                    </div>
                    {/* <div className="col-12 mt-3">
                        <Comparison/>
                    </div> */}
                </div>
                <Footer />
            </div>
        )
    }
}
