import React, { Component } from 'react'
import HostelListingCarousel from '../../../User/Hostel/Components/HostelListingCarousel'
import '../StyleSheets/ViewPropCard.scss'


export default class HostelListingCard extends Component {
    handleNameClick = (propertyId) => {
        console.log(this.props);
        this.props.history.push({
            "pathname": "/merchant/dashboard/viewRoom",
            state: {
                images: this.props.images,
                propertyName: this.props.propertyName,
                description: this.props.description,
                address: this.props.address,
                propertyId: this.props.propertyId,
                features: this.props.features,
                merch_id: this.props.merch_id,
                latitude:this.props.latitude,
                longitude:this.props.longitude,
            }
        })
    }
    render() {
        // console.log(this.props)
        return (
            <div className="row">
                <div>
                    <div className="col-lg-6 col-sm-12 Hostel-listing-card-carousel d-inline-block">
                        <HostelListingCarousel images={this.props.images} />
                    </div>

                    <div className="col-lg-6 col-sm-12 Hostel-listing-card-content d-inline-block float-right">
                        <div className="row">
                            <div
                                onClick={() => this.handleNameClick(this.props.propertyId)}
                                className="col-lg-10 Hostel-listing-card-title">
                                {this.props.propertyName}
                                <div className="ViewPropCard-footer h6 text-muted">ID: {this.props.propertyId}</div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-10 Hostel-listing-card-room-types text-muted ViewProp-card-rates ">
                                <span className="font-weight-bold">Features </span>
    
                                {this.props.features.map((item,index,arr) =>{
                                    console.log(this.props.features[0])
                                        return <span key= {index}>{item}</span>
                                })}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col ViewProp-card-rates"> <span className="text-muted font-weight-bold">Address </span> <span className="text-muted">{this.props.address}  </span> </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
