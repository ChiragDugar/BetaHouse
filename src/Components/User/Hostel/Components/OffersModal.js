import React from 'react'
import "../Stylesheets/OffersModal.scss"

class OfferModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // openModal: this.props.showModal,
            typedCode: ""
        }
    }
    handleModal = (e) => {
    }
    handleChange = (e) => {
        this.setState({
            typedCode: e.target.value
        })
    }
    render() {
        return (
            <div className="OffersModal-popup"
                style={{
                    display: this.props.showModal == true ? 'flex' : 'none'
                }}
            >
                <div className="OffersModal-content"
                    style={{
                        display: this.props.showModal == true ? 'flex' : 'none'
                    }}
                >
                    <div className="OfferModal-content-inner">
                        {/* Parent div for the popup content */}
                        <div className="OffersModal-content-input-field">
                            {/* Input box where user can apply offers */}
                            {/*  
                            <div>
                                <input onChange={this.handleChange} className="Login-input" placeholder="Enter coupon code here" type="text" />
                            </div>
                            <div className="row Overview-row1" style={{
                                marginTop: 0
                            }}>
                                <button className="Overview-b py-2 px-3"
                                    onClick={() => { this.props.handleInputSubmit(this.state.typedCode) }}
                                >APPLY</button>
                            </div>
                            */}
                        </div>
                        <div className="OfferModal-span-text">
                            <span>Available Offers</span>
                        </div>
                        <div
                            style={{
                                overflowY: this.props && this.props.availableOffers &&
                                    this.props.availableOffers.length > 4 ? 'scroll' : 'hidden'
                            }}
                        >
                            {
                                this.props && this.props.availableOffers && this.props.availableOffers.length > 0 ? this.props.availableOffers.map((offer) => {
                                    return (
                                        <div key={offer._id} className="OffersModal-offer-item">
                                            <div className="OffersModal-offer-item-coupon-code">
                                                <span className="OffersModal-offer-item-coupon-code-text-left">{offer.couponCode}</span>
                                                <span className="OffersModal-offer-item-coupon-code-text"
                                                    onClick={() => { this.props.applyCoupon(offer._id, offer.couponCode, offer.offerAmount) }}
                                                >APPLY</span>
                                            </div>
                                            <div className="HostelDetails-line m-auto offer-modal-line"></div>
                                            <div className="OffersModal-offer-item-coupon-description">
                                                <span className="OffersModal-offer-item-coupon-description-text">{offer.description}</span>
                                            </div>
                                            <span className="OffersModal-offer-error-message">
                                                {
                                                    offer._id === this.props.errorCouponId ? this.props.errorMsg : null
                                                }
                                            </span>
                                        </div>
                                    )
                                })
                                    : (
                                        <div className="OffersModal-offer-item">
                                            <span className="OffersModal-offer-item-coupon-description-text"> No offers available on this property</span>
                                        </div>
                                    )
                            }
                        </div>
                    </div>
                    <div>
                        <span style={{ cursor: 'pointer' }} onClick={() => { this.props.crossButton() }} >x</span>
                    </div>
                </div>
            </div>
        )
    }
}
export default OfferModal;