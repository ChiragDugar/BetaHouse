import React, { Component } from 'react'
import DarkNavbar from '../../../Navbars/darkMerchantNavbar'
import Footer from '../../../Footer'
import '../Stylesheets/AddView.scss'
import Doodle from '../../../../Assets/undraw_social_friends_nsbv.svg'


export default class AddView extends Component {

    constructor(props) {
        super(props)
        this.state = {
            merch_id: "5e4972640e6dfa2aa4265a75"
        }
    }
    componentDidMount() {
        let merchantId = localStorage.getItem('merchantId')
        if (merchantId === null) {
            this.props.history.push('/merchant/login')
        }
        else {
            this.setState({
                merch_id: merchantId
            })
        }
    }
    handleClick1 = () => {
        // console.log(this.props.location)
        this.props.history.push({
            pathname: '/merchant/dashboard/addProperty',
            state: { merch_id: this.state.merch_id }
        })
    }
    handleClick2 = () => {
        this.props.history.push({
            pathname: '/merchant/dashboard/viewProperty',
            state: { merch_id: this.state.merch_id }
        })
    }
    handleClick3 = () => {
        this.props.history.push('/merchant/analytics')
    }
    render() {
        return (
            <div>
                <DarkNavbar history={this.props.history} />
                {/* <div className="row AddView-row1">
                </div> */}
                <div className="row AddView-container ml-0 mr-0">
                    <div className="col-lg-6 col-md-12 py-5 px-5">
                        <div className="display-3 AddView-heading">Welcome to the Dashboard!</div>
                        <div className="text-muted h4">Here you can, Add a new property, View your existing property & Check analytics for your property. Happy Homes!</div>
                        <div className="AddView-ImageContainer d-none d-lg-block d-md-block text-center pt-3 mt-4">
                            <img src={Doodle} alt="Doodle" width="60%" className="img-fluid"/>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-12 text-center AddView-right-contaniner">
                        <div>
                            <div className="AddView-subContainer1 row ml-0 mr-0">
                                <button className="AddView-btn px-3 py-2 h2" onClick={this.handleClick1}>ADD PROPERTY</button>
                            </div>
                            <div className="AddView-subContainer2 row ml-0 mr-0">
                                <button className="AddView-btn px-3 py-2 h2" onClick={this.handleClick2}>VIEW PROPERTY</button>
                            </div>
                            <div className="AddView-subContainer3 row ml-0 mr-0">
                                <button className="AddView-btn px-3 py-2 h2" onClick={this.handleClick3}>ANALYTICS</button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="">
                    <Footer/>
                </div> */}
            </div>
        )
    }
}
