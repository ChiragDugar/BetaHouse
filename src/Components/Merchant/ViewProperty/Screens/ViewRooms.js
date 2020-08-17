import React, { Component } from 'react'
import { Accordion, AccordionItem } from 'react-light-accordion';
import DarkNavbar from '../../../Navbars/darkMerchantNavbar'
import Footer from "../../../Footer";
import OffersModal from '../Components/OffersMerchantModal'
import performRequest from '../../../PerformRequest';
import Content from '../Components/Content'
import '../StyleSheets/ViewRooms.scss'


export default class ViewRooms extends Component {
    constructor(props) {
        super(props)
        this.state = {
            roomTypes: null,
            propertyImages: this.props.location.state.images,
            disabled1: true,
            disabled2: true,
            value: true,
            propertyName: this.props.location.state.propertyName,
            description: this.props.location.state.description,
            address: this.props.location.state.address,
            longitude: this.props.location.state.longitude,
            latitude: this.props.location.state.latitude,
            files1: null,
            imageUrls1: [],
            propertyId: this.props.location.state.propertyId,
            propertyFeature: this.props.location.state.features,
            roomFeatureList: [],
            featureList: [],
            couponData: [],
            showModal: false,
            couponCode: [],
            couponType: [],
            minimumBookingAmount: [],
            offerAmount: [],
            enabled: [],
            propertyCityList: []
        }
        this.handleToggleCoupon = this.handleToggleCoupon.bind(this)
    }

    componentDidMount() {
        console.log(this.props)
        let path = "/property/view/roomtype"
        let method = "POST"
        let body = {
            propertyId: this.props.location.state.propertyId,
            fromDate: "2022-01-01",
            toDate: "2022-01-11"
        }
        let response = performRequest(path, method, body)
        response.then(res => {
            console.log(res)
            if (res.err === false) {
                this.setState({
                    roomTypes: res.roomTypes,
                    property: this.props.location.state,
                    roomFeature: res.roomTypes.features
                }, () => {
                    console.log(res.roomTypes)
                })
            }
            else {
                alert(res.msg)
            }
        })
        let response2 = performRequest('/admin/misc/getroomfeatures', 'POST', {})
        response2.then(res => {
            // console.log(res)
            if (res.err === false) {
                this.setState({
                    roomFeatureList: res.featuresList
                })
            }
        })
        let response1 = performRequest('/admin/misc/getfeatures', 'POST', {})
        response1.then(res => {
            // console.log(res)
            if (res.err === false) {
                res.featuresList.map((item) => {
                    if (!this.state.propertyFeature.includes(item)) {
                        this.setState({
                            featureList: [...this.state.featureList, item]
                        })
                    }
                })
            }
        })
        let response3 = performRequest('/list/view', 'POST', { propertyId: this.props.location.state.propertyId })
        response3.then(res => {
            // console.log(res)
            if (res.err === false) {
                if (res.data !== undefined) {
                    res.data.map((item) => {
                        this.setState({
                            couponCode: [...this.state.couponCode, item.couponCode],
                            couponType: [...this.state.couponType, item.couponType],
                            minimumBookingAmount: [...this.state.minimumBookingAmount, item.minimumBookingAmount],
                            offerAmount: [...this.state.offerAmount, item.offerAmount],
                            enabled: [...this.state.enabled, item.enabled]
                        })
                    })
                    this.setState({
                        couponData: res.data,
                    })
                }
            }
        })
        let response4 = performRequest('/admin/misc/getcitieslist', 'POST', {})
        response4.then((res) => {
            // console.log(res)
            res.map((item) => {
                let body = {
                    name: item.cityName + ", " + item.countryName,
                    id: item._id
                }
                this.setState({
                    propertyCityList: [...this.state.propertyCityList, body]
                })
            })
        })
        let response5 = performRequest('/admin/misc/getunilist', 'POST', {})
        response5.then((res) => {
            if (res.err === false) {
                this.setState({
                    propertyUniversityList: res.universityList
                })
            }
        })
    }


    getLocalities = (id) => {
        let body = {
            cityId: id
        }
        performRequest('/admin/misc/getlocalitiesforcity', 'POST', body)
            .then((res) => {
                console.log(res)
                if (res.err === false)
                    this.setState({
                        showLocation: true,
                        propertyLocalitiesList: res.localities,
                        propertyLocalities: []
                    })
                else {
                    alert('Invalid City Choice')
                }
            })
    }

    handleClick = () => {
        this.setState({
            disabled1: !this.state.disabled1,
            value: !this.state.value
        })
    }

    handleRoomEditClick = () => {
        this.setState({
            disabled2: !this.state.disabled2,
        })
    }

    onChangeFile1 = (e) => {
        let obj = e.target.files;
        let total = Object.keys(obj);
        this.setState({
            files1: obj
        })

    }

    handleChange = (e) => {
        let lhs = e.target.name
        console.log(lhs, e.target.value)
        this.setState({
            [lhs]: e.target.value
        })
    }

    handleClick1 = () => {
        let path = "/property/edit"
        let method = "POST"
        let body = {
            propertyId: this.props.location.state.propertyId,
            address: this.state.address,
            description: this.state.description,
            propertyName: this.state.propertyName,
            latitude: this.state.latitude,
            longitude: this.state.longitude,
        }
        const response = performRequest(path, method, body)
        response.then(res => {
            console.log(res)
            if (res.err === false) {
                alert(res.msg)
                this.setState({
                    disabled1: !this.state.disabled1,
                    value: !this.state.value,
                    property: res.property
                })
            }
            else {
                alert(res.msg)
            }
        })
        let data = {
            propertyId: this.props.location.state.propertyId,
            features: this.state.propertyFeature
        }
        let response1 = performRequest("/property/updatefeatures", "POST", data)
        response1.then((res) => {
            if (res.err === false) {
                alert(res.msg)
            }
        })
    }


    handleAPI = () => {
        let path = "https://backend.betahouse.co.in/property/addimages"
        // let valid = this.handleValidate()
        let files = this.state.files1;
        // let response = PerformRequest(path, method, body)
        if (files) {
            console.log("check")
            let data = new FormData();
            for (let i = 0; i < files.length; i++) {
                // console.log(files[i]);
                data.append('propertyImages', files[i]);
            }
            data.append('propertyId', this.props.location.state.propertyId)
            fetch(path, {
                method: "POST",
                body: data,
                mode: 'cors',
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "access-control-allow-headers": "*",
                }
            })
                .then(data => data.json())
                .then(res => {
                    if (!res.err) {
                        alert("Successfully Added!")
                        console.log(res)
                        this.setState({
                            propertyImages: res.property.propertyImages
                        })
                        // this.props.history.push({
                        //     pathname: '/merchant/dashboard/addRoom',
                        //     state: {
                        //         propertyId: res.property._id
                        //     }
                        // })
                    }
                    else
                        alert(res.msg)
                })
                .catch(e => {
                    alert(e.message);
                })
        }
    }


    handleDeleteImage = () => {
        let path = "/property/deleteimages"
        let method = "POST"
        let body = {
            propertyId: this.state.propertyId,
            imageUrls: this.state.imageUrls1
        }
        const response = performRequest(path, method, body)
        response.then((res) => {
            console.log(res)
            alert(res.msg)
            if (res.err === false) {
                this.setState({
                    propertyImages: res.property.propertyImages
                })
            }
        })
    }


    handleImageClick1 = (url, index) => {
        if (this.state.imageUrls1.includes(url)) {
            let data = []
            let imageUrls1 = this.state.imageUrls1.filter((item) => {
                if (item !== url) {
                    data.push(item)
                }
            })
            console.log(data)
            this.setState({ imageUrls1: data }, () => {
                console.log(this.state.imageUrls1)
            })
            console.log(imageUrls1)
            document.getElementById(index).style.backgroundColor = "white"
        }
        else {
            this.setState({
                imageUrls1: [...this.state.imageUrls1, url]
            }, () => {
                document.getElementById(index).style.backgroundColor = "grey"
            })

        }
    }


    handlePropertyFeature = (e) => {
        let lhs = e.target.name
        let rhs = e.target.value
        let arr = []
        this.state.featureList.filter((item) => {
            if (rhs !== item) {
                arr.push(item)
            }
        })
        if (!this.state.propertyFeature.includes(rhs) && rhs !== "") {
            this.setState({
                [lhs]: [...this.state.propertyFeature, rhs],
                featureList: arr
            })
        }
    }

    handleFeatureRemove = (index) => {
        let propertyFeature = this.state.propertyFeature.splice(index, 1)
        this.setState(propertyFeature)
        if (!this.state.featureList.includes(propertyFeature)) {
            this.setState({
                featureList: [...this.state.featureList, propertyFeature[0]]
            }, () => {
                console.log(this.state.featureList)
            })
        }
    }

    handleAddRoom = () => {
        this.props.history.push({
            pathname: '/merchant/dashboard/addRoom',
            state: {
                propertyId: this.state.propertyId,
                counter: 1
            }
        })
    }

    handleAddOffer = () => {
        this.setState({
            showModal: true
        })
    }
    crossButton = () => {
        // this.state.showModal = false
        // window.location.reload();
        // console.log(this.state.showModal)
        console.log('reach');
        this.setState({ showModal: false }, () => {
            this.setState({ showModal: false })
        })
    }

    handleCouponSubmit = () => {
        let token = localStorage.getItem('merchantId')
        let body = {
            couponCode: this.state.couponCode,
            couponType: this.state.couponType,
            minimumBookingAmount: this.state.minimumBookingAmount,
            offerAmount: this.state.offerAmount,
            propertyId: this.state.propertyId,
            merchantId: token
        }
        performRequest('/coupon/create', 'POST', body)
            .then((res) => {
                console.log(res)
                if (res.err === false) {
                    this.setState({
                        couponData: [...this.state.couponData, res.couponDetails],
                        couponCode: [...this.state.couponCode, res.couponDetails.couponCode],
                        couponType: [...this.state.couponType, res.couponDetails.couponType],
                        minimumBookingAmount: [...this.state.minimumBookingAmount, res.couponDetails.minimumBookingAmount],
                        offerAmount: [...this.state.offerAmount, res.couponDetails.offerAmount],
                        enabled: [...this.state.enabled, res.couponDetails.enabled]
                    })
                }
            })
    }

    handleToggleCoupon = (index) => {
        let body = {
            couponId: this.state.couponData[index]._id,
            status: !this.state.couponData[index].enabled
        }
        console.log(body)
        performRequest('/code/toggle', 'POST', body)
            .then((res) => {
                this.updateCoupons()
                alert(res.msg)

            })
    }
    updateCoupons = () => {
        let response = performRequest('/list/view', 'POST', { propertyId: this.props.location.state.propertyId })
        response.then(res => {
            if (res.err === false) {
                console.log(res)
                res.data.map((item) => {
                    this.setState({
                        couponCode: [...this.state.couponCode, item.couponCode],
                        couponType: [...this.state.couponType, item.couponType],
                        minimumBookingAmount: [...this.state.minimumBookingAmount, item.minimumBookingAmount],
                        offerAmount: [...this.state.offerAmount, item.offerAmount],
                        couponData: res.data,
                        enabled: [...this.state.enabled, item.enabled]
                    })
                })
            }
        })
        window.location.reload();
    }

    render() {
        // console.log(this.state.roomImages)
        return (
            <div>
                <DarkNavbar history={this.props.history} />
                <div >
                    {
                        this.state.property !== undefined ? (
                            <div className="ViewRooms-row mt-2 mb-5 ml-0 mr-0">
                                <div className="col-lg-6 col-md-12">
                                    <div className="ViewRoom-heading text-center bg-dark text-white px-3 w-25 mx-auto py-2 my-3 d-inline-block">Property Details</div>
                                    <div className="ViewRoom-buttonContainer  text-center float-right">
                                        {this.state.disabled1 ? (
                                            <div className="float-right px-3 py-2 text-center border border-dark text-white mr-5 my-2 ViewProp-btn mt-3" onClick={this.handleClick}>
                                                <span>
                                                    Edit
                                                </span>
                                            </div>
                                        ) : (
                                                <div>
                                                    <button className="bg-dark px-3 py-2 text-center border border-dark text-white  mt-3" onClick={this.handleClick1}>Done</button>
                                                    <button className="bg-grey text-black px-3 py-2 border border-grey  mt-3" onClick={this.handleClick}>Cancel</button>
                                                </div>
                                            )}
                                    </div>
                                    <div className="ViewRoom-subContainer text-center">
                                        Property Name <br />
                                        <input type="text" name="propertyName" id="propertyName" disabled={this.state.disabled1} value={this.state.value ? this.state.property.propertyName : this.state.propertyName} onChange={this.handleChange} className="text-center w-75" />
                                    </div>
                                    <div className="ViewRoom-subContainer text-center">
                                        {/* Description: {this.props.location.state.description} */}
                                        Description <br />
                                        <input type="text" name="description" id="description" disabled={this.state.disabled1} value={this.state.value ? this.state.property.description : this.state.description} onChange={this.handleChange} className="text-center w-75" />

                                    </div>
                                    <div className="ViewRoom-subContainer text-center">
                                        Address <br />
                                        {/* Address : {this.props.location.state.address} */}
                                        <input type="text" name="address" id="address" disabled={this.state.disabled1} value={this.state.value ? this.state.property.address : this.state.address} onChange={this.handleChange} className="text-center w-75" />

                                    </div>
                                    <div className="ViewRoom-subContainer text-center ">
                                        Feature <br />
                                        {!this.state.disabled1 ? (
                                            <div className="row ml-0 mr-0 AP1-row1 w-75 mx-auto">
                                                <select name="propertyFeature" id="feature" className="col-lg-6 col-md-6 col-sm-12 h-25" value={this.state.propertyFeature[this.state.propertyFeature.length - 1]} onChange={this.handlePropertyFeature}>
                                                    <option className="text-center" value="">Choose Features</option>
                                                    {this.state.featureList.map(item =>
                                                        <option className="text-center" value={item}>{item}</option>
                                                    )}
                                                </select>
                                                <div className="AP1-subHeading-Italics text-left col-lg-6 col-md-6 col-sm-12">
                                                    <ul>
                                                        {this.state.propertyFeature.length > 0 ? (
                                                            this.state.propertyFeature.map((item, index) =>
                                                                <li>{item}<span className="px-3 AP1-featureCancel" onClick={() => this.handleFeatureRemove(index)}>X</span></li>
                                                            )
                                                        ) : (
                                                                <div className="font-weight-bold text-muted ">
                                                                    No Features selected
                                                                </div>
                                                            )}
                                                    </ul>
                                                </div>
                                            </div>
                                        ) : (
                                                <input type="text" name="feature" id="propertyFeature" disabled value={this.state.property.feature !== undefined ? this.state.property.feature.length : "Click on Edit to check "} className="text-center w-75" />
                                            )
                                        }
                                    </div>
                                    <div className="ViewRoom-subContainer text-center">
                                        Latitude
                                            <br />
                                        <input type="number" name="latitude" id="latitude" disabled={this.state.disabled1} value={this.state.value ? this.state.property.latitude : this.state.latitude} onChange={this.handleChange} className="text-center w-75" />
                                    </div>
                                    <div className="ViewRoom-subContainer text-center">
                                        Longitude
                                        <br />
                                        <input type="text" name="longitude" id="longitude" disabled={this.state.disabled1} value={this.state.value ? this.state.property.longitude : this.state.longitude} onChange={this.handleChange} className="text-center w-75" />
                                    </div>

                                    {!this.state.disabled1 ? (
                                        <div className="text-center">
                                            <br />
                                            <div className="ViewRoom-subContainer">
                                                Add Images
                                                <br />
                                                <input type="file" id="propertyImages" onChange={this.onChangeFile1} className="AP1-subHeading" multiple />
                                                <button className="px-2 py-1 bg-dark text-white border-none text-uppercase" onClick={this.handleAPI}>Add Images</button>
                                            </div>
                                        </div>
                                    ) : (
                                            <div className="text-center font-weight-bold my-3">
                                                <div className="bg-light w-75 m-auto p-2">
                                                    Click on "Edit" to show more of your happy place.
                                            </div>
                                            </div>
                                        )}
                                    {!this.state.disabled1 ? (
                                        <div className="text-center my-2">
                                            <div className="ViewRoom-subContainer">
                                                Delete Images - Click images that you want to delete.
                                                <br></br>
                                                <div className="">
                                                    {this.state.propertyImages.map((item, index) => {
                                                        if (!this.state.propertyImages.includes(this.state.imageUrls1)) {
                                                            return (
                                                                <div className=" w-25 d-inline-block ViewRoom-Image-Container p-3" id={index} onClick={() => this.handleImageClick1(item, index)}>
                                                                    <div className="float-right ViewRoom-Image-btn" >X</div>
                                                                    <img src={item} alt="propertyImages" className="img-thumbnail" />
                                                                </div>
                                                            )
                                                        }
                                                        else {
                                                            return (
                                                                <div></div>
                                                            )
                                                        }
                                                    }
                                                    )}
                                                    <button className="px-2 py-1 bg-dark text-white border-none text-uppercase" onClick={this.handleDeleteImage}>Delete Images</button>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                            <div className="text-center font-weight-bold my-3">
                                                <div className="bg-light w-75 m-auto p-2">
                                                    Delete Images. We let you undo the mistakes!
                                                </div>
                                            </div>
                                        )}
                                    <div className="ViewRoom-heading text-center bg-dark text-white px-3 w-25 mx-auto py-2 my-3 d-inline-block">Coupon Details</div>
                                    <div className="float-right px-3 py-2 text-center border border-dark text-white mr-5 my-2 ViewProp-btn" onClick={this.handleAddOffer}>
                                        <span>
                                            Add Coupon
                                        </span>
                                        <OffersModal
                                            showModal={this.state.showModal}
                                            crossButton={this.crossButton}
                                            handleChange={this.handleChange}
                                            handleSubmit={this.handleCouponSubmit}
                                        />
                                    </div>
                                    <div className="couponContainer my-4">
                                        {this.state.couponData.length ? (
                                            this.state.couponData.map((item, index) =>
                                                <div className="my-2">
                                                    <div className="h5 d-inline-block">Coupon No. {index + 1}</div>
                                                    <div className="font-weight-bold d-inline-block float-right" style={{ cursor: 'pointer' }} onClick={() => { this.handleToggleCoupon(index) }}>
                                                        {!this.state.enabled[index] ?
                                                            (
                                                                <div className="text-success">
                                                                    Enable
                                                                </div>
                                                            ) : (
                                                                <div className="text-danger">X</div>
                                                            )
                                                        }
                                                    </div>
                                                    <div className="ViewRoom-subContainer text-center">
                                                        Coupon Code <br />
                                                        <input type="text" name="couponCode" id="couponCode" disabled={this.state.disabled1} value={this.state.value ? this.state.couponData.couponCode : item.couponCode} onChange={this.handleChange} className="text-center w-75" />
                                                    </div>
                                                    <div className="ViewRoom-subContainer text-center">
                                                        Coupon Type <br />
                                                        <input type="text" name="couponType" id="couponType" disabled={this.state.disabled1} value={this.state.value ? this.state.couponData.couponType : item.couponType} onChange={this.handleChange} className="text-center w-75" />
                                                    </div>
                                                    <div className="ViewRoom-subContainer text-center">
                                                        Minimum Booking Amount <br />
                                                        <input type="text" name="minimumBookingAmount" id="minimumBookingAmount" disabled={this.state.disabled1}
                                                            value={this.state.value ? this.state.couponData.minimumBookingAmount : item.minimumBookingAmount}
                                                            onChange={this.handleChange} className="text-center w-75"
                                                        />
                                                    </div>
                                                    <div className="ViewRoom-subContainer text-center">
                                                        Offer Amount <br />
                                                        <input type="text" name="offerAmount" id="offerAmount" disabled={this.state.disabled1}
                                                            value={this.state.value ? this.state.couponData.offerAmount : item.offerAmount} onChange={this.handleChange}
                                                            className="text-center w-75" />
                                                    </div>
                                                    <hr />
                                                </div>
                                            )
                                        ) : (
                                                <div className="text-center py-2 bg-light font-weight-bold ">
                                                    No couponCode to view!
                                                </div>
                                            )}
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-12 col-sm-12">
                                    <div className="ViewRoom-heading text-center bg-dark text-white px-3 w-25 mx-auto py-2 my-3 d-inline-block">Room Details</div>

                                    <div className="ViewRoom-buttonContainer text-center float-right">
                                        {this.state.disabled2 ? (
                                            <div>
                                                <button className="bg-dark text-white px-3 py-2 border border-dark mt-3" onClick={this.handleAddRoom}>Add Room</button>
                                                <button className="bg-light px-3 py-2 border border-grey mt-3" onClick={this.handleRoomEditClick}>Edit</button>

                                            </div>

                                        ) : (
                                                <div>
                                                    <button className="bg-dark text-white px-3 py-2 border border-dark mt-3" onClick={this.handleRoomSubmit}>Done</button>
                                                    <button className="bg-grey text-black px-3 py-2 border border-grey mt-3" onClick={this.handleRoomEditClick}>Cancel</button>
                                                </div>
                                            )}
                                    </div>
                                    <div>
                                        {this.state.roomTypes !== null ? (
                                            this.state.roomTypes.map((item, index) =>
                                                <div>
                                                    <Accordion atomic={true}>
                                                        <AccordionItem title={item.roomTypeName}>
                                                            <Content item={item} index={index} featureList={this.state.roomFeatureList} />
                                                        </AccordionItem>
                                                    </Accordion>
                                                </div>

                                            )
                                        ) : (
                                                <div>
                                                    No Rooms Available
                                                    <br />
                                                    <button className="bg-dark text-white px-3 py-2 mx-auto w-25">Add Room</button>
                                                    {/* <div className="fixed-bottom">
                                                <Footer />
                                            </div> */}
                                                </div>
                                            )}
                                    </div>
                                </div>
                            </div>
                        ) : (
                                <div>
                                    <div className="m-auto">Loading</div>
                                    {/* <div className="fixed-bottom">
                                            <Footer />
                                        </div> */}
                                </div>
                            )
                    }
                </div>
                <div style={{ position: 'relative', bottom: 0, width: "100%" }}>
                    <Footer />
                </div>

            </div>
        )
    }
}
