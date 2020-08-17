import React from 'react'
import '../StyleSheets/OffersModal.scss'

class OfferMerchantModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        console.log("CHECK PROPS" + this.props);
        return (
            <div className="OffersMerchantModal-popup"
                style={{
                    display: this.props.showModal === true ? 'flex' : 'none'
                }}
            >
                <div className="OffersMerchantModal-content"
                    style={{
                        display: this.props.showModal === true ? 'flex' : 'none'
                    }}
                >
                    <div className="text-muted">
                        {/* Parent div for the popup content */}
                        <div className="h4">Make an offer people cant deny!</div>
                        <div className="">
                            {/* Input box where user can apply offers */}
                            <div className="text-center">
                                <div className="py-2">
                                    <input type="text" name="couponCode" id="couponCode"  placeholder="Coupon Code"
                                    onChange={this.props.handleChange} className="w-100 p-2" />
                                </div>
                                <div className="py-2">
                                    <input type="text" name="couponType" id="couponType"  placeholder="Coupon Type"
                                    onChange={this.props.handleChange} className="w-100 p-2" />
                                </div>
                                <div className="py-2">
                                    <input type="text" name="minimumBookingAmount" id="minimumBookingAmount"  placeholder="Minimum Booking Amount"
                                    onChange={this.props.handleChange} className="w-100 p-2" />
                                </div>
                                <div className="py-2">
                                    <input type="text" name="offerAmount" id="offerAmount"  placeholder="Offer Amount"
                                    onChange={this.props.handleChange} className="w-100 p-2" />
                                </div>
                            </div>
                            <div className="my-2 mx-auto">
                                <div className="bg-dark py-2 px-3 text-white text-center d-inline-block  border border-dark col-6" onClick ={()=>{this.props.handleSubmit()}}>Submit</div>
                                <div className="bg-danger py-2 px-3 text-white text-center d-inline-block  border border-danger col-6" onClick={()=>{this.props.crossButton()}}>Close</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default OfferMerchantModal;  