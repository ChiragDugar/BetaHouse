import React, { Component } from 'react'
import '../Stylesheets/RoomBox.scss'
import Offer from './Offer'
import AmenityCarousel from './AmenityCarousel';
import '../Stylesheets/SoldOutDesign.scss';

export default class RoomBox extends Component {
    constructor(props) {
        super(props)
        this.state = {
            roomTypes: this.props.roomTypes,
            fromDate: this.props.fromDate,
            toDate: this.props.toDate
        }
    }
    componentDidMount() {
        this.setState({
            roomTypes: this.props.roomTypes
        })
    }
    render() {
        // console.log("*3333333##########@@@@@@@@@@@@")
        // console.log(this.props);
        // console.log("*4444444##########@@@@@@@@@@@@")
        return (
            <div
                className={this.props.roomTypes.isAvailable ? "" : "sold-out-room__main"}
            >
                <div
                    className={this.props.roomTypes.isAvailable ? "RoomBox-BoxMain" : "sold-out RoomBox-BoxMain"}
                >
                    <p className="RoomBox-p1">{this.props.roomTypes.roomTypeName}</p>
                    <hr></hr>
                    <AmenityCarousel roomTypes={this.state.roomTypes} />
                    {/* <p className="RoomBox-p2">
                        <img src={Bathtub} alt="Single Room"/>
                        <small className="RoomBox-small">1 Single Bed</small>
                        <img src={Door} alt="Bathroom" className="RoomBox-img2"/>
                        <small className="RoomBox-small">Shared Bathroom</small>
                    </p> */}
                    <p className="RoomBox-small1">
                        {this.props.roomTypes.description}
                    </p>
                    {/* <div className="RoomBox-btn-noBG text-uppercase ml-4">
                        READ MORE>
                    </div>   */}
                    <Offer features={this.props.features} additionalFeatures={this.props.additionalFeatures} minimumBookingDuration={this.props.roomTypes.minimumBookingDuration} roomTypes={this.state.roomTypes} fromDate={this.state.fromDate} toDate={this.state.toDate} history={this.props.history} studentId={this.props.studentId} />
                </div>
            </div>
        )
    }
}
