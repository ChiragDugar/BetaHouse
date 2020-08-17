import React, { Component } from 'react'
import OffersModal from './OffersModal';
import PerformRequest from '../../../PerformRequest'
import DatePicker from 'react-date-picker';

export default class overviewRightPane extends Component {
    constructor(props) {
        super(props)
        this.state = {
            propertyName: this.props.data.propertyName,
            roomType: this.props.data.roomType,
            fromDate: new Date(this.props.data.fromDate),
            toDate: new Date(this.props.data.toDate),
            perPersonCostPerMonth: this.props.data.perPersonCostPerMonth,
            taxAmount: this.props.data.taxAmount,
            totalCost: this.props.data.totalCost,
            selectedRoomType: this.props.data.selectedRoomType,
            basePrice: this.props.data.basePrice,
            showModal: false,
            propertyId: this.props.data.propertyId,
            availableOffers: [],
            showData: false,
            formData: this.props.formData,
            errorMsg: "",
            displayError: false,
            fromDatePicker: new Date(),
            toDatePicker: new Date(),
        }
        var test = new Date(this.state.fromDate).toString()
        this.setState({ fromDatePicker: test })
    }

    componentDidMount() {
        this.setState({
            fromDatePicker: new Date(this.state.fromDate).toString()
        })

    }

    componentWillReceiveProps(props) {
        console.log(props);
        this.setState({
            formData: this.props.formData
        },()=>{
            this.setState({
                formData: this.props.formData
            })
        })
    }



    handleSubmit = () => {

        var fromValue = this.state.fromDate.toISOString().split('T')[0]
        let toValue = this.state.toDate.toISOString().split('T')[0]
        let body = {
            amount: this.state.showData === true ? this.state.finalPricing : this.state.totalCost
        }
        const requiredFields = ["firstName", "lastName", "email", "contactNumber", "dateOfBirth", "nationality", "country", "city", "postalCode", "gender", "address", "whereDidYouHearAboutUs"]
        for (let i = 0; i < requiredFields.length; i++) {
            if (this.props.formData[requiredFields[i]] === "") {
                alert(requiredFields[i] + " is missing in the traveller details form.");
                return;
            }
        }
        fetch("https://backend.betahouse.co.in/generate/order", {
            headers: {
                'Content-Type': 'application/json',
            },
            method: "POST",
            body: JSON.stringify(body)
        })
            .then(response => response.json())
            .then(data => {
                this.setState({
                    orderId: data.order.id,
                    amount: data.order.amount
                })
                let bookingBody = {
                    checkInDate: fromValue,
                    checkOutDate: toValue,
                    selectedRoomType: this.state.selectedRoomType,
                    bedCount: 1,
                    studentId: localStorage.getItem("studentId"),
                    razorpayOrderId: this.state.orderId,
                    couponId: this.state.couponId,
                    propertyId: this.state.propertyId,
                    firstName: this.state.formData.firstName,
                    lastName: this.state.formData.lastName,
                    email: this.state.formData.email,
                    contactNumber: this.state.formData.codeNumber + this.state.formData.contactNumber,
                    dateOfBirth: this.state.formData.dateOfBirth,
                    nationality: this.state.formData.nationality,
                    country: this.state.formData.country,
                    city: this.state.formData.city,
                    postalCode: this.state.formData.postalCode,
                    gender: this.state.formData.gender,
                    address: this.state.formData.address,
                    whereDidYouHearAboutUs: this.state.formData.whereDidYouHearAboutUs,
                }
                fetch("https://backend.betahouse.co.in/booking", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'x-auth-token': localStorage.getItem("x-auth-token")
                    },
                    body: JSON.stringify(bookingBody)
                })
                    .then(book => book.json())
                    .then(response => {
                        if (response.err) {
                            if (response.msg === "Invalid token") {
                                alert("Please Login to proceed with the booking")
                                this.props.history.push({
                                    pathname: '/user/login',
                                    state: {
                                        studentId: localStorage.getItem("studentId"),
                                        selectedRoomType: this.state.selectedRoomType,
                                        fromDate: this.state.fromDate,
                                        toDate: this.state.toDate,
                                        totalCost: this.state.totalCost,
                                        taxAmount: this.state.taxAmount,
                                        perPersonCostPerMonth: this.state.perPersonCostPerMonth,
                                        roomTypeName: this.state.roomType,
                                        propertyName: this.state.propertyName,
                                        basePrice: this.state.basePrice,
                                        isLoggedIn: false,
                                        propertyId: this.state.propertyId,
                                        // firstName: this.state.formData.firstName,
                                        // lastName: this.state.formData.lastName,
                                        // email: this.state.formData.email,
                                        // contactNumber: this.state.formData.contactNumber,
                                        // dateOfBirth: this.state.formData.dateOfBirth,
                                        // nationality: this.state.formData.nationality,
                                        // country: this.state.formData.country,
                                        // city: this.state.formData.city,
                                        // postalCode: this.state.formData.postalCode,
                                        // gender: this.state.formData.gender,
                                        // address: this.state.formData.address,
                                        // whereDidYouHearAboutUs: this.state.formData.whereDidYouHearAboutUs
                                        formData: this.state.formData
                                    }
                                })
                            }
                            else {

                                alert(response.msg)
                            }
                        }
                        else {
                            document.getElementById("razorForm").submit();
                        }
                    })
                    .catch(err => {
                        alert(err);
                    })
            })
            .catch(err => {
                alert(err);
            })
    }

    onChangeFromDate = date => this.setState({ fromDate: date })

    onChangeToDate = date => this.setState({ toDate: date })

    handleModal = (e) => {
        this.setState({
            showModal: true
        }, () => {
            let body = {
                "propertyId": this.state.propertyId
            }
            PerformRequest("/list/view", "POST", body)
                .then(res => {
                    this.setState({
                        availableOffers: res.data
                    })
                })
                .catch(err => {
                    console.log(err);
                })
        })
    }
    applyCoupon = (id, couponCode, amount) => {
        let body = {
            couponId: id,
            totalCost: this.state.basePrice
        }
        PerformRequest("/coupon/apply", "POST", body)
            .then(res => {

                if (res.offerDetails.err === true) {
                    this.setState({
                        errorMsg: res.offerDetails.msg,
                        displayError: true,
                        taxAmount: this.state.taxAmount,
                        afterDiscountCost: this.state.totalCost,
                        showData: false,
                        showModal: true,
                        errorCouponId: id
                    })
                }
                else if (res.offerDetails.err === false) {
                    this.setState({
                        showData: true,
                        couponCode: couponCode,
                        afterDiscountCost: res.offerDetails.afterDiscountCost,
                        discountedAmount: res.offerDetails.discountedAmount,
                        showModal: false,
                        couponId: id,
                        taxAmount: res.offerDetails.taxAmount,
                        finalPricing: res.offerDetails.finalPricing,
                        errorCouponId: null,
                        displayError: false,
                        errorMsg: ""
                    })
                }
            })
            .catch(err => {
                console.log(err);
            })
    }
    removeOffer = () => {
        this.setState({
            showData: false,
            couponCode: ""
        })
    }
    handleInputSubmit = (code) => {
        this.setState({ showModal: false })
    }

    crossButton = () => {
        this.setState({ showModal: false })
    }
    render() {
        const { fromDate } = this.state;
        const minDateForToDate = new Date(fromDate.getFullYear(), fromDate.getMonth() + 1, fromDate.getDate());
        // new Date(new Date(fromDate).getFullYear(), new Date().getMonth(fromDate) + 1, new Date().getDate());
        return (
            <div>
                <div className="col-lg-9 col-12 px-2 py-3 overviewRightPane-container m-auto">
                    <div className="ml-3 py-3">
                        <div className="overviewRightPane-heading-container">
                            <h4 className="overviewRightPane-heading">
                                SHARED ROOM <span className="overviewRightPane-subheading">( at {this.state.propertyName} )</span>
                            </h4>
                        </div>


                        <div className="HostelDetails-line m-auto"></div>
                        <div className="overviewRightPane-roomType-container pb-4">
                            <h4 className="overviewRightPane-roomType-heading">{this.state.roomType} </h4>
                        </div>
                        <div className="overviewRightPane-detail-container">
                            <h5 className="overviewRightPane-detail-heading d-inline-block">CHECK IN DATE :
                                <span className="overviewRightPane-detial-info float-right">
                                    {/* {this.state.fromDate.split('-')[2] + '-' + this.state.fromDate.split('-')[1] + '-' + this.state.fromDate.split('-')[0]} */}
                                    <DatePicker
                                        onChange={this.onChangeFromDate}
                                        value={this.state.fromDate}
                                        format="dd-MM-y"
                                        minDate={this.state.fromDate}
                                    />
                                </span>

                            </h5>
                        </div>
                        <div className="overviewRightPane-detail-container">
                            <h5 className="overviewRightPane-detail-heading d-inline-block">CHECK OUT DATE :
                            <span className="overviewRightPane-detial-info float-right">
                                    {/* {this.state.toDate.split('-')[2] + '-' + this.state.toDate.split('-')[1] + '-' + this.state.toDate.split('-')[0]}  */}
                                    <DatePicker
                                        onChange={this.onChangeToDate}
                                        value={this.state.toDate}
                                        format="dd-MM-y"
                                        minDate={minDateForToDate}
                                    />
                                </span>
                            </h5>
                        </div>
                        <div className="overviewRightPane-detail-container">
                            <h5 className="overviewRightPane-detail-heading d-inline-block">price per month: <span className="overviewRightPane-detial-info d-inline-block float-right"> {this.state.perPersonCostPerMonth} </span></h5>
                        </div>
                        <div className="overviewRightPane-detail-container">
                            <h5 className="overviewRightPane-detail-heading d-inline-block pb-4">booking price: <span className="overviewRightPane-detial-info d-inline-block float-right"> {this.state.basePrice} </span></h5>
                        </div>
                        <div className="HostelDetails-line m-auto"></div>
                        <div className="overviewRightPane-detail-container py-3">
                            <h5 className="overviewRightPane-detail-heading d-inline-block">offers: <span onClick={this.handleModal} className="overviewRightPane-offers-modalbox">APPLY NOW</span>
                                <OffersModal
                                    showModal={this.state.showModal}
                                    availableOffers={this.state.availableOffers}
                                    applyCoupon={this.applyCoupon}
                                    handleInputSubmit={this.handleInputSubmit}
                                    crossButton={this.crossButton}
                                    errorMsg={this.state.errorMsg}
                                    displayError={this.state.displayError}
                                    errorCouponId={this.state.errorCouponId}
                                />
                                <span className="overviewRightPane-detial-info d-inline-block float-right"> {this.state.couponCode ? this.state.couponCode : "No offers applied"} </span></h5>
                        </div>
                        <div className="overviewRightPane-totalCost-container"
                            style={{
                                display: this.state.showData === true ? 'flex' : 'none'
                            }}
                        >
                            <h5 className="overviewRightPane-detail-heading"> discount: <span style={{ color: 'red' }} className="overviewRightPane-detial-info-bold float-right"> -{this.state.discountedAmount} <span onClick={this.removeOffer} className="cross-button">x</span></span></h5>
                        </div>
                        <div className="HostelDetails-line m-auto"></div>
                        <div className="overviewRightPane-totalCost-container py-3"
                            style={{ display: this.state.showData ? 'flex' : 'none' }}
                        >
                            <h5 className="overviewRightPane-detail-heading"> discounted price: <span className="overviewRightPane-detial-info-bold float-right"> {this.state.afterDiscountCost} </span>
                            </h5>
                        </div>
                        <div className="overviewRightPane-detail-container py-3">
                            <h5 className="overviewRightPane-detail-heading d-inline-block">Tax : <span className="overviewRightPane-detial-info d-inline-block float-right"> {this.state.taxAmount} </span></h5>
                        </div>
                        <div
                            // style ={{
                            //     display: this.state.showData == true ? 'flex' : 'none'
                            // }}
                            className="overviewRightPane-totalCost-container">
                            <h5 className="overviewRightPane-detail-heading"> Total Payable: <span className="overviewRightPane-detial-info-bold float-right">{this.state.showData ? this.state.finalPricing : this.state.totalCost}</span></h5>
                        </div>
                        <div className="row Overview-row1 py-3">
                            <button className="Overview-b py-2 px-3 col-lg-6" onClick={this.props.handleModal} >ENQUIRE NOW</button>
                            <button className="Overview-b py-2 px-3 col-lg-6" onClick={this.handleSubmit}>PAY NOW</button>
                        </div>

                        <form
                            id="razorForm"
                            action="https://api.razorpay.com/v1/checkout/embedded" method="POST"
                        >
                            <input type="hidden" name="key_id" value="rzp_live_Pcx6R3nIyDIdDM" />
                            <input type="hidden" name="order_id" value={this.state.orderId} />
                            <input type="hidden" name="name" value="BetaHouse" />
                            <input type="hidden" name="description" value="Accommodation Booking Platform" />
                            <input type="hidden" name="image" value="https://cdn.razorpay.com/logos/BUVwvgaqVByGp2_large.png" />
                            <input type="hidden" name="prefill[name]" value={this.state.formData.firstName + " " + this.state.formData.lastName} />
                            <input type="hidden" name="prefill[contact]" value={this.state.formData.contactNumber} />
                            <input type="hidden" name="prefill[email]" value={this.state.formData.email} />
                            <input type="hidden" name="notes[shipping address]" value={this.state.formData.address} />
                            <input type="hidden" name="callback_url" value={
                                this.state.showData === true ? `https://backend.betahouse.co.in/payment/verification?amount=${this.state.finalPricing}&order_id=${this.state.orderId}` :
                                    `https://backend.betahouse.co.in/payment/verification?amount=${this.state.totalCost}&order_id=${this.state.orderId}`
                            } />
                            <input type="hidden" name="cancel_url" value="https://backend.betahouse.co.in/user/overview" />
                            <button style={{ display: 'none' }}>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
