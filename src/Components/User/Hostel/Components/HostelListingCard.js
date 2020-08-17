import React, { Component } from 'react'
import HeartIcon from '../../../../Assets/Asset 31.png'
import HostelListingCarousel from './HostelListingCarousel'
import '../Stylesheets/SoldOutDesign.scss';

export default class HostelListingCard extends Component {

    handleNameClick = (propertyId) => {
        this.props.history.push({
            "pathname": "/user/listing/detail/" + this.props.propertyId + "?" + this.props.fromDate + "?" + this.props.toDate,
            state: {
                images: this.props.images,
                propertyName: this.props.propertyName,
                description: this.props.description,
                address: this.props.address,
                propertyId: this.props.propertyId,
                features: this.props.features,
                minimumCost: this.props.minimumCost,
                fromDate: this.props.fromDate,
                toDate: this.props.toDate,
                offers: this.props.offers,
                studentId: this.props.studentId,
                roomTypeNames: this.props.roomTypeNames,
                isAvailable: this.props.isAvailable
            }
        })
    }
    render() {
        return (
            <div>
                <div className={this.props.isAvailable ? "row" : "sold-out__main row"}>
                    {/* <div className="row sold-out__main"> */}
                    <div className={this.props.isAvailable ? "col-lg-6 Hostel-listing-card-carousel" :
                        "col-lg-6 Hostel-listing-card-carousel sold-out"}>
                        <HostelListingCarousel images={this.props.images} />
                    </div>

                    <div
                        onClick={() => this.handleNameClick(this.props.propertyId, this.props.fromDate, this.props.toDate)}
                        className={this.props.isAvailable ? "col-lg-6 Hostel-listing-card-content" :
                            "col-lg-6 Hostel-listing-card-content sold-out"}>
                        <div className="row">
                            <div
                                // onClick={() => this.handleNameClick(this.props.propertyId, this.props.fromDate, this.props.toDate)}
                                className="col-lg-10 Hostel-listing-card-title">
                                {this.props.propertyName}
                            </div>
                            {/* <div className="col-lg-2 Hostel-listing-card-heart-wrapper">
                                <img src={HeartIcon} alt="Like" className="hostel-listing-card-heart-image" />
                            </div> */}
                        </div>
                        <div className="row">
                            <div className="col-lg-10 Hostel-listing-card-room-types">
                                {this.props.roomTypeNames.map((el, i, arr) => {
                                    if (i === arr.length - 1)
                                        return <span key={i}>{el.roomTypeName}</span>
                                    if (i > 4)
                                        return <span key={i}></span>
                                    else
                                        return <span key={i}>{el.roomTypeName} | </span>
                                })}
                                {/* {console.log(this.props.roomTypeNames)} */}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col Hostel-listing-card-rates">Rooms from <span
                                style={{ fontFamily: "Neuton" }}
                            >₹{this.props.minimumCost}</span> Per month <i
                                style={{
                                    fontSize: "0.9rem"
                                }}
                                className="fas fa-arrow-right"></i></div>
                        </div>
                        {/* <div className="row">
                            <div className="col Hostel-listing-card-offers">Offer 1: Upto £200 Amazon Vouchers..</div>
                        </div>
                        <div className="row">
                            <div className="col Hostel-listing-card-offers">Offer 2: £50 Amazon Voucher on Refer..</div>
                        </div> */}
                        {this.props.offers.map((el, i) => {
                            // console.log(`Inside offers`);
                            // console.log(el);
                            if (el.couponType === "FLAT") {
                                return (<div className="row" key={i}>
                                    <div className="col Hostel-listing-card-offers">Offer {i + 1}: FLAT ₹{el.offerAmount} on minimum booking of ₹{el.minimumBookingAmount}</div>
                                </div>);
                            }
                            else {
                                return (<div className="row" key={i}>
                                    <div className="col Hostel-listing-card-offers">Offer {i + 1}: {el.offerAmount}% on minimum booking of ₹{el.minimumBookingAmount}</div>
                                </div>);
                            }
                        })}
                    </div>
                </div>
            </div >
        )
    }
}
