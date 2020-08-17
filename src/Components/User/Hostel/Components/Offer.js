import React, { Component } from 'react'
import '../Stylesheets/Offer.scss'
import ReactModal from 'react-modal'
import Option from './CheckBox'
import PerformRequest from '../../../PerformRequest'

export default class Offer extends Component {
    constructor(props) {
        super(props);
        console.log("OFFER", props)
        const duration = (new Date(this.props.toDate).getTime() - new Date(this.props.fromDate).getTime()) / (1000 * 60 * 60 * 24 * 30)
        this.state = {
            roomTypes: this.props.roomTypes,
            fromDate: this.props.fromDate,
            toDate: this.props.toDate,
            duration: duration,
            // showModal:false
        }
        // this.handleOpenModal = this.handleOpenModal.bind(this);
        // this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    // handleOpenModal () {
    //     this.setState({ showModal: true });
    // }

    // handleCloseModal () {
    //     this.setState({ showModal: false });
    // }
    handleClick = () => {
        if (this.state.duration < (this.props.minimumBookingDuration / 30)) {
            alert("Minimum booking days not met. Choose dates again!");
            return;
        }
        let path = "/overview/details"
        let method = "POST"
        let body = {
            checkInDate: this.state.fromDate,
            checkOutDate: this.state.toDate,
            selectedRoomType: this.state.roomTypes._id,
            bedCount: 1
        }
        let response = PerformRequest(path, method, body)
        response.then(res => {
            console.log("CHECK", res);
            if (res.overViewData.err === false) {
                this.props.history.push({
                    pathname: '/user/overview',
                    state: {
                        studentId: this.props.studentId,
                        selectedRoomType: this.state.roomTypes._id,
                        fromDate: res.checkInDate,
                        toDate: res.checkOutDate,
                        totalCost: res.totalCost,
                        taxAmount: res.taxAmount,
                        perPersonCostPerMonth: res.overViewData.data[0].perPersonCostPerMonth,
                        roomTypeName: res.overViewData.data[0].roomTypeName,
                        propertyName: res.overViewData.data[0].propertyId.propertyName,
                        propertyAddress: res.overViewData.data[0].propertyId.address,
                        basePrice: res.basePrice,
                        propertyId: res.overViewData.data[0].propertyId._id,
                        features: this.props.features,
                        additionalFeatures: this.props.additionalFeatures
                    }
                })
            }
            else
                alert(res.msg)
        })
            .catch(err => {
                console.log(err)
            })
    }
    render() {
        console.log(this.props.roomTypes)
        return (
            <div className="each-roomtype">
                <div className="row Offer-row1">
                    <div className="col-md-2 Offer-col">
                        <p className="Offer-ttext">DURATION</p>
                    </div>
                    <div className="col-md-2 Offer-col">
                        <p className="Offer-ttext">MOVE IN</p>
                    </div>
                    <div className="col-md-2 Offer-col">
                        <p className="Offer-ttext">MOVE OUT</p>
                    </div>
                    <div className="col-md-2 Offer-col">
                        <p className="Offer-ttext">PRICE</p>
                    </div>
                    <div className="col-md-2 Offer-col">
                        <p className="Offer-ttext">TOTAL</p>
                    </div>
                    <div className="col-md-2 Offer-col1">
                        <p className="Offer-ttext1" onClick={this.handleClick}>BOOK NOW</p>
                    </div>
                </div>
                <div>
                    {/* <ReactModal isOpen={this.state.showModal} contentLabel="Minimal Modal Example">
                        <Option roomTypes={this.state.roomTypes} history = {this.props.history} studentId={this.props.studentId} roomTypes={this.props.roomTypes}/>
                        <button onClick={this.handleCloseModal}>Close Modal</button><br></br><br></br>
                    </ReactModal> */}
                </div>
                <div className="row Offer-row2">
                    <div className="col-md-2 Offer-col2">
                        <p className="Offer-ttext2">{Math.round(this.state.duration * 10) / 10} months</p>
                    </div>
                    <div className="col-md-2 Offer-col2">
                        <p className="Offer-ttext2">
                            {this.state.fromDate.split('-')[2] + '-' + this.state.fromDate.split('-')[1] + '-' + this.state.fromDate.split('-')[0]}
                        </p>
                    </div>
                    <div className="col-md-2 Offer-col2">
                        <p className="Offer-ttext2">
                            {this.state.toDate.split('-')[2] + '-' + this.state.toDate.split('-')[1] + '-' + this.state.toDate.split('-')[0]}
                        </p>
                    </div>
                    <div className="col-md-2 Offer-col2">
                        <p className="Offer-ttext2">₹{this.state.roomTypes.perPersonCostPerMonth}</p>
                    </div>
                    <div className="col-md-2 Offer-col2">
                        <p className="Offer-ttext2">₹{Math.round(this.state.duration * this.state.roomTypes.perPersonCostPerMonth)}</p>
                    </div>
                    <div className="col-md-2 Offer-col2">
                        <p className="Offer-ttext2"></p>
                    </div>
                </div>
                {/* <div className="row Offer-row3">
                    <div className="col-md-2 Offer-col3">
                        <p className="Offer-ttext3">OFFER 1</p>
                    </div>
                    <div className="col-md-10 Offer-col3">
                        <p className="Offer-ttext4">$100 Amazon Vouchers 'UNILODGERS Exclusive'T&C Apply!</p>
                    </div>
                </div>
                <div className="row Offer-row4">
                    <div className="col-md-2 Offer-col3">
                        <p className="Offer-ttext3">OFFER 2</p>
                    </div>
                    <div className="col-md-10 Offer-col3">
                        <p className="Offer-ttext4">$100 Amazon Vouchers on Refer a Friend 'UNILODGERS Exclusive<br></br>'T&C Apply!</p>
                    </div>
                </div> */}
            </div>
        )
    }
}
