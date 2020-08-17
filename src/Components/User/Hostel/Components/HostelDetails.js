import React, { Component } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
// import { Carousel } from 'react-responsive-carousel';
import 'react-tabs/style/react-tabs.css';
import Feature from './Feature'
import Safety from './Safety'
import SocialSpace from '../../../../Assets/Grand-Felda-House-Wembley-London-Social-Space-Unilodgers.png'
import CinemaRoom from '../../../../Assets/Grand-Felda-House-Wembley-London-Cinema-Room-Unilodgers.png'
import BigTopLounge from '../../../../Assets/Grand-Felda-House-Wembley-London-Big-Top-Lounge-Unilodgers.png'
import TypeIcon from '../../../../Assets/Asset 40.png'
import LocationIcon from '../../../../Assets/Asset 41.png'
import HeartIcon from '../../../../Assets/Asset 50.png'
import ShareIcon from '../../../../Assets/Asset 53.png'
import Rooms from './Rooms'
import Distance from './Distance'
import performRequest from '../../../PerformRequest';
import HostelDetailsCarousel from './HostelDetailsCarousel';
import Modal from 'react-modal';
import PerformRequest from '../../../PerformRequest'
import Cross from '../../../../../src/Assets/Enquiry-cross.png'
import { EmailShareButton, FacebookShareButton, LinkedinShareButton, PinterestShareButton, PocketShareButton, RedditShareButton, TelegramShareButton, TwitterShareButton, WhatsappShareButton, TwitterIcon, WhatsappIcon, EmailIcon, FacebookIcon } from "react-share";

export default class HostelDetails extends Component {
    constructor(props) {
        super(props);
        // var propId = props.history.location.pathname.split("/")
        // let path = "/property/view/propertydirect"
        // let method = "POST"
        // let testDate = new Date()
        // let todayDate = new Date(testDate.getFullYear(), testDate.getMonth() + 1, testDate.getDate());
        // let body = {
        //     toDate: testDate.toISOString().split('T')[0],
        //     fromDate: todayDate.toISOString().split('T')[0],
        //     propertyId: propId[propId.length - 1]
        // }
        // let response = PerformRequest(path, method, body)
        // response
        //     .then(res => {
        //         pageData = {
        //             images: res.properties[0].propertyImages,
        //             propertyName: res.properties[0].propertyName,
        //             description: res.properties[0].description,
        //             address: res.properties[0].address,
        //             propertyId: res.properties[0].propertyId,
        //             features: res.properties[0].features,
        //             minimumCost: res.properties[0].minimumCost,
        //             fromDate: testDate.toISOString().split('T')[0],
        //             toDate: todayDate.toISOString().split('T')[0],
        //             offers: res.properties[0].offers,
        //             studentId: res.properties[0].studentId,
        //             roomTypeNames: res.properties[0].roomTypeNames,
        //             isAvailable: res.properties[0].isAvailable
        //         }
        //     })
        // const { images, propertyName, description, address, propertyId, features, minimumCost, fromDate, toDate, offers, studentId } = this.props.history.location.state;
        // this.state = { images, propertyName, description, address, propertyId, features, minimumCost, fromDate, toDate, offers, studentId };
    }


    // state = {
    //     images: [],
    //     propertyName: "",
    //     description: "",
    //     address: "",
    //     propertyId: "",
    //     features: [],
    //     minimumCost: "",
    //     fromDate: "",
    //     toDate: "",
    //     offers: [],
    //     studentId: ""
    // }


    componentDidMount() {
        window.scrollTo(0, 0);
        var body1;
        let testDate = new Date();
        let todayDate = new Date(testDate.getFullYear(), testDate.getMonth(), testDate.getDate());
        let oneMonthFromToday = new Date(testDate.getFullYear(), testDate.getMonth() + 1, testDate.getDate());
        const formattedTodayDate = todayDate.getFullYear() + "-" + (todayDate.getMonth() + 1) + "-" + todayDate.getDate();
        const formattedOneMonthFromToday = oneMonthFromToday.getFullYear() + "-" + (oneMonthFromToday.getMonth() + 1) + "-" + oneMonthFromToday.getDate();
        if (this.props.history.location.search === "") {
            var breakRoute = this.props.history.location.pathname.split("?")
            var propId = breakRoute[0].split("/")
            body1 = {
                toDate: breakRoute.length > 2 ? breakRoute[2] : formattedOneMonthFromToday,
                fromDate: breakRoute.length > 1 ? breakRoute[1] : formattedTodayDate,
                propertyId: propId[propId.length - 1]
            }
            propId = body1.propertyId;
        }
        else {
            var breakRoute = this.props.history.location.search.split("?")
            var urlString = this.props.history.location.pathname.split("/")
            var propId = urlString[urlString.length - 1]
            body1 = {
                toDate: breakRoute.length > 2 ? breakRoute[2] : formattedOneMonthFromToday,
                fromDate: breakRoute.length > 1 ? breakRoute[1] : formattedTodayDate,
                propertyId: propId
            }
            propId = body1.propertyId;
        }
        let path1 = "/property/view/propertydirect"
        let method1 = "POST"

        let response1 = PerformRequest(path1, method1, body1)

        response1.then(res => {
            if (res.err === false) {
                this.setState({
                    images: res.properties[0].propertyImages,
                    propertyName: res.properties[0].propertyName,
                    description: res.properties[0].description,
                    address: res.properties[0].address,
                    propertyId: propId,
                    features: res.properties[0].features,
                    minimumCost: res.properties[0].minimumCost,
                    fromDate: body1.fromDate,
                    toDate: body1.toDate,
                    offers: res.properties[0].offers,
                    studentId: res.properties[0].studentId,
                    roomTypeNames: res.properties[0].roomTypeNames,
                    isAvailable: res.properties[0].isAvailable,
                    propertyLat: res.properties[0].location[1],
                    propertyLong: res.properties[0].location[0],
                    additionalFeatures: res.properties[0].additionalFeatures
                })

                let path = "/property/view/roomtype"
                let method = "POST"
                let body = {
                    propertyId: this.state.propertyId,
                    fromDate: this.state.fromDate,
                    toDate: this.state.toDate
                }
                let response = performRequest(path, method, body);
                response.then(res => {
                    if (res.err == false) {
                        this.setState({
                            roomTypes: res.roomTypes
                        })
                    }
                })
                if (this.state.images.length > 0) {
                    this.setState({
                        img1: this.state.images[0],
                        img2: this.state.images[1],
                        img3: this.state.images[2]
                    })
                }
            }
            else {
                alert(res.msg);
            }
        })







    }

    state = {
        modalOpen: false,
        shareModal: false,
        images: [],
        propertyName: "",
        description: "",
        address: "",
        propertyId: "",
        features: [],
        minimumCost: "",
        fromDate: "",
        toDate: "",
        offers: [],
        studentId: "",
        showModal: false,
        formName: '',
        formEmail: '',
        formNumber: '',
        formMessage: '',
        propertyLat: "",
        propertyLong: "",
        additionalFeatures: []
    }
    handleModal = () => {
        this.setState({
            showModal: true
        })
    }
    closeModal = () => {
        this.setState({
            showModal: false
        })
    }

    handleForm = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })

    }

    EnquireNow = () => {
        let path = "/property/inquirenow"
        let method = "POST"
        let body = {
            name: this.state.formName,
            number: this.state.formNumber,
            email: this.state.formEmail,
            message: this.state.formMessage,
            propertyId: this.state.propertyId,
            roomTypeId: null
        }
        let response = performRequest(path, method, body)
        response.then(res => {
            alert(res.msg)
            this.setState({
                showModal: false
            })
        })
    }

    handleImageClick = () => {
        this.setState({ modalOpen: true })
    }

    handleShareModal = () => {
        this.setState({ shareModal: !this.state.shareModal })
    }

    handleViewRoomsClick = () => {
        document.querySelector('.hostel-room-details-tab').click();
    }
    render() {


        const customStyles = {
            content: {
                top: '50%',
                left: '50%',
                right: 'auto',
                bottom: 'auto',
                marginRight: '-50%',
                transform: 'translate(-50%, -50%)',
                backgroundColor: 'transparent',
                border: 'none',
            }
        };

        const customStyles1 = {
            content: {
                // top: '50%',
                // left: '50%',
                // right: 'auto',
                // bottom: 'auto',
                // marginRight: '-50%',
                // transform: 'translate(-50%, -50%)',
                // backgroundColor: 'transparent',
                border: 'none',
                position: 'absolute',
                right: '0',
                backgroundColor: 'yellow',
                width: '10rem',
                height: '10rem',
            }
        };



        if (this.state && this.state.images && this.state.images.length > 0) {

            return (
                <div>
                    <div className="HostelDetails-Main1 ml-5 mt-4" style={{ overflow: "hidden" }}>

                        {/* {this.state.images.length > 0 ? (
                            <Carousel showIndicators={false} showThumbs={false} showStatus={false} infiniteLoop={true} width={'100%'}>
                                {this.state.images.map((el, i) => {
                                    return (
                                        <div
                                            style={{
                                                // width: "80%",
                                                height: "80vh",
                                                backgroundColor: "white",
                                                textAlign: "center",
                                                verticalAlign: "center"
                                                // backgroundImage: `url("https://betahouse-images-storage.s3.ap-south-1.amazonaws.com/1583256514587.jpeg")`
                                            }}
                                            key={i} >
                                            <img style={{
                                                // width: '',
                                                // height: '20rem'
                                                // maxWidth: '100%',
                                                maxWidth: '100%',
                                                // width: 'auto',
                                                height: "auto",
                                                objectFit: "cover"
                                            }} src={el} />
                                        </div>
                                        // <div>
                                        //     <div
                                        //         style={{
                                        //             backgroundImage: 'url("https://betahouse-images-storage.s3.ap-south-1.amazonaws.com/1583256514587.jpeg")',
                                        //             'height': "500px",
                                        //             width: "100%",
                                        //             'background-repeat': 'no-repeat',
                                        //             'background-size': 'cover'
                                        //         }}
                                        //     >
                                        //     </div>
                                        //     something
                                        // </div>
                                    )
                                })}
                            </Carousel>
                        )
                            : (
                                <div>
                                    <p style={{
                                        padding: "0 1.5rem",
                                        fontFamily: "Raleway",
                                        fontStyle: "italic"
                                    }}>No Property Images uploaded</p>
                                </div>
                            )} */}
                        {/* <div className="px-5 mb-5 HostelDetails-images-wrapper-row"> */}

                        {/* <div className="ml-5 mt-5">
                        <div className="row px-5 mb-5">
                            <div className="col">
                                <img src={this.state.img1} alt="Social Space" height="180vh" width="auto" onClick={this.handleImageClick} style={{ cursor: 'pointer' }} />
                            </div>
                            <div className="col">
                                <div className="row">
                                    <div className="col">
                                        <img src={this.state.img2} alt="Big Top Lounge" height="90vh" width="auto" onClick={this.handleImageClick} style={{ cursor: 'pointer' }} />
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col">
                                        <img src={this.state.img3} alt="Cinema Room" height="90vh" width="auto" onClick={this.handleImageClick} style={{ cursor: 'pointer' }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}


                        <div className="HostelDetails-Main">
                            {/* <div className="hostel-details__container">
                                <div className="hostel-details__container-left">
                                    <div>
                                        <img src={this.state.images[0]}></img>
                                    </div>
                                </div>
                                <div className="hostel-details__container-right">
                                    <div className="hostel-details__container-right__top">
                                        <img src={this.state.images[1]}></img>
                                    </div>
                                    <div className="hostel-details__container-right__bottom">
                                        <img src={this.state.images[2]}></img>
                                    </div>
                                </div>
                            </div> */}
                            <div className="row mb-5 ml-5 mt-5">
                                <div className="HostelDetails-BigPic" className="col" style={{ flex: 1.5 }}>
                                    {this.state.images.length > 0 ? (
                                        <img className="HostelDetails-BigPic" src={this.state.images[0]} alt="Social Space" width="100%" style={{
                                            height: "60vh",
                                            cursor: 'pointer'
                                        }}
                                            onClick={this.handleImageClick}
                                        />
                                    ) : (
                                            <img src={SocialSpace} alt="Social Space" width="100%" style={{
                                                height: "60vh",
                                                cursor: 'pointer'
                                            }}
                                                onClick={this.handleImageClick}
                                            />

                                        )}
                                </div>
                                <div className="col" lg={4} >
                                    <div className="row ">
                                        <div className="col" style={{ paddingLeft: "0rem" }}>
                                            {this.state.images.length > 1 ? (
                                                <img className="HostelDetails-SmallPic" src={this.state.images[1]} alt="Social Space" width="90%" style={{
                                                    height: "29vh",
                                                    width: "30rem",
                                                    cursor: 'pointer'
                                                }}
                                                    onClick={this.handleImageClick}
                                                />

                                            ) : (
                                                    <img src={BigTopLounge} alt="BigTopLounge" width="90%" style={{
                                                        height: "29vh",
                                                        width: "30rem",
                                                        cursor: 'pointer'
                                                    }}
                                                        onClick={this.handleImageClick}
                                                    />
                                                )}
                                        </div>
                                        <div className="row mt-3 ">
                                            <div className="col">
                                                {this.state.images.length > 2 ? (
                                                    <img className="HostelDetails-SmallPic" src={this.state.images[2]} alt="Social Space" width="90%" style={{
                                                        height: "29vh",
                                                        width: "30rem",
                                                        cursor: 'pointer'
                                                    }}
                                                        onClick={this.handleImageClick}
                                                    />
                                                ) : (
                                                        <img src={CinemaRoom} alt="Cinema Room" width="90%" style={{
                                                            height: "29vh",
                                                            width: "30rem",
                                                            cursor: 'pointer'
                                                        }}
                                                            onClick={this.handleImageClick}
                                                        />
                                                    )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>




                            <Modal
                                isOpen={this.state.modalOpen}
                                style={customStyles}
                                shouldCloseOnOverlayClick={true}
                            >
                                <div style={{ zIndex: 2, position: 'fixed', top: '4rem', right: 20, cursor: 'pointer', fontSize: 30, fontWeight: 'bold' }} onClick={() => this.setState({ modalOpen: false })} >
                                    <i className="fas fa-times"></i>
                                </div>
                                <HostelDetailsCarousel images={this.state.images} />
                            </Modal>
                            {/* </div> */}
                            <div className="row mt-5 ml-4 HostelDetails-content-wrapper-row">
                                <div className="col-lg-6 col-12 mt-4">
                                    <div className="HostelDetails-heading-container">
                                        <h4 className="HostelDetails-heading">{this.state.propertyName}</h4>
                                    </div>
                                    <Tabs >
                                        <TabList className="text-uppercase mb-0 HostelDetails-Tablist">
                                            <Tab className="HostelDetails-Tab pb-0 mb-0 col-lg-2 col-12">Overview</Tab>
                                            <Tab className="HostelDetails-Tab pb-0 mb-0 col-lg-2 col-12">Features</Tab>
                                            <Tab id=""
                                                className="HostelDetails-Tab pb-0 mb-0 col-lg-2 col-12 hostel-room-details-tab">Rooms</Tab>
                                            <Tab className="HostelDetails-Tab pb-0 mb-0 col-lg-2 col-12">Location</Tab>
                                        </TabList>
                                        <div className="HostelDetails-line m-auto"></div>
                                        <TabPanel className="mt-4">
                                            <div className="HostelDetails-sub-container">
                                                <div className="HostelDetails-type-container row">
                                                    <div className="col-2 text-center">
                                                        <img src={TypeIcon} alt="Type" />
                                                    </div>
                                                    <div className="col-10">
                                                        {/* <div className="HostelDetails-type1 d-inline-block pr-2 text-left">
                                                    Private Room
                                                </div>
                                                <div className="HostelDetails-type1 d-inline-block px-2 text-left">
                                                    Studio Flat
                                                </div>
                                                <div className="HostelDetails-type d-inline-block px-2 text-left">
                                                    Shared Room
                                                </div> */}
                                                        {
                                                            this.state.features.map((el, i, arr) => {
                                                                if (i === arr.length - 1) {
                                                                    return (<div key={i} className="HostelDetails-type d-inline-block px-2 text-left">
                                                                        <span>{el}</span>
                                                                    </div>)
                                                                }
                                                                else {
                                                                    return (<div key={i} className="HostelDetails-type d-inline-block px-2 text-left">
                                                                        <span>{el} | </span>
                                                                    </div>)
                                                                }
                                                            })
                                                        }
                                                    </div>
                                                </div>
                                                <div className="HostelDetails-address-container mt-3  row">
                                                    <div className="text-center col-2">
                                                        <img src={LocationIcon} alt="Location" />
                                                    </div>
                                                    <h4 className="HostelDetails-address col-10">
                                                        {this.state.address}
                                                    </h4>
                                                </div>
                                            </div>
                                            <div className="HostelDetails-property-container mt-4 mb-5">
                                                <h4 className="HostelDetails-property-heading text-uppercase">
                                                    About this property
                                        </h4>
                                                <p className="HostelDetails-property-content mb-0">
                                                    {/* Grand Felda House Wembley is a brand new student accommodation located on Empire Way,
                                            London and is well- connected to Central London. Save your travelling time by opting
                                            for this student accommodation as it’s located close to many London universities.
                                            Get ready for the... */}
                                                    {this.state.description}
                                                </p>
                                                {/* <div className="HostelDetails-btn-noBG text-uppercase">
                                            READ MORE>
                                        </div> */}
                                            </div>
                                            <div className="HostelDetails-line m-auto"></div>
                                            <div className="mt-5 mb-4">
                                                <Feature features={this.state.features} additionalFeatures={this.state.additionalFeatures} />
                                            </div>
                                            <div className="HostelDetails-line m-auto"></div>
                                        </TabPanel>

                                        <TabPanel>
                                            <div>
                                                <Feature features={this.state.features} additionalFeatures={this.state.additionalFeatures} />
                                            </div>
                                        </TabPanel>

                                        <TabPanel>
                                            {/* id="hostel-room-details-tab" */}
                                            <div>
                                                <Rooms features={this.state.features} additionalFeatures={this.state.additionalFeatures}s roomTypes={this.state.roomTypes} fromDate={this.state.fromDate} toDate={this.state.toDate} studentId={this.props.studentId} history={this.props.history} />
                                            </div>
                                        </TabPanel>

                                        <TabPanel>
                                            <div>
                                                <Distance propertyLong={this.state.propertyLong} propertyLat={this.state.propertyLat} address={this.state.address} />
                                            </div>
                                        </TabPanel>

                                    </Tabs>
                                </div>
                                <div className="col-lg-6 col-12 mb-4 mt-4">
                                    <div className="HostelDetails-Summary-container m-auto">
                                        <div className="text-white px-5 py-3 HostelDetails-Summary-heading-container">
                                            <div className="row">
                                                <h4 className="HostelDetails-Summary-heading col-10">
                                                    Rooms from Rs.{this.state.minimumCost} per month
                                            </h4>
                                                {/* <div className="col-1">
                                                <img src={HeartIcon} alt="Like Button" />
                                            </div> */}
                                                <div className="col-1" style={{ cursor: 'pointer', position: 'relative' }} >
                                                    <img src={ShareIcon} alt="Share Button" onClick={this.handleShareModal} />
                                                    {/* <Modal
                                                    isOpen={this.state.shareModal}
                                                    style={customStyles1}
                                                    shouldCloseOnOverlayClick={true}
                                                > */}
                                                    {this.state.shareModal === true ?
                                                        <div style={{ display: 'flex', flexDirection: 'column', position: 'absolute', top: '2rem' }} >
                                                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'grey', border: '0.3rem solid #2D2D2D' }} >

                                                                <WhatsappShareButton
                                                                    url={"betahouse.co.in" + this.props.history.location.pathname + this.props.history.location.search}
                                                                >
                                                                    <WhatsappIcon size={40}
                                                                    />
                                                                </WhatsappShareButton>
                                                                <EmailShareButton
                                                                    url={"betahouse.co.in" + this.props.history.location.pathname + this.props.history.location.search}
                                                                // title={"title"}
                                                                >
                                                                    <EmailIcon size={40}
                                                                    />
                                                                </EmailShareButton>
                                                                <TwitterShareButton
                                                                    url={"betahouse.co.in" + this.props.history.location.pathname + this.props.history.location.search}
                                                                // title={this.props.history.location.pathname}
                                                                >
                                                                    <TwitterIcon size={40}
                                                                    />
                                                                </TwitterShareButton>
                                                                <FacebookShareButton
                                                                    // title={this.props.history.location.pathname}
                                                                    url={"betahouse.co.in" + this.props.history.location.pathname + this.props.history.location.search}
                                                                >
                                                                    <FacebookIcon size={40}
                                                                    />
                                                                </FacebookShareButton>

                                                            </div>
                                                        </div> : <div></div>}
                                                    {/* </Modal> */}
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="HostelDetails-Offers-content-container" style={{ width: "70%", margin: "auto" }}>
                                        <div className="HostelDetails-Offers-container px-4 py-2">
                                            <div className="text-uppercase HostelDetails-Offers-heading mb-2">
                                                Exclusive Offers
                                        </div>
                                            {/* <div className="HostelDetails-Offers">
                                            <div className="HostelDetails-Offers-subheading text-uppercase">Offer 1</div>
                                            <div className="HostelDetails-Offers-info">
                                                £100 Amazon Vouchers *UNILODGERS Exclusive*T&C apply!
                                            </div>
                                        </div>
                                        <div className="HostelDetails-Offers">
                                            <div className="HostelDetails-Offers-subheading text-uppercase">Offer 2</div>
                                            <div className="HostelDetails-Offers-info">
                                                £50 Amazon Voucher on Refer a Friend *UNILODGERS Exclusive *T&C apply!
                                            </div>
                                        </div> */}
                                            {this.state.offers.map((el, i) => {
                                                if (el.couponType === "FLAT") {
                                                    return (<div className="HostelDetails-Offers">
                                                        <div className="HostelDetails-Offers-subheading text-uppercase">Offer {i + 1}</div>
                                                        <div className="HostelDetails-Offers-info">
                                                            FLAT ₹{el.offerAmount} on minimum booking of ₹{el.minimumBookingAmount}
                                                        </div>
                                                    </div>
                                                    )
                                                }
                                                else {
                                                    return (<div className="HostelDetails-Offers">
                                                        <div className="HostelDetails-Offers-subheading text-uppercase">Offer {i + 1}</div>
                                                        <div className="HostelDetails-Offers-info">
                                                            {el.offerAmount}% on minimum booking of ₹{el.minimumBookingAmount}
                                                        </div>
                                                    </div>
                                                    )
                                                }
                                            })}
                                            {this.state.offers.length === 0 ?
                                                (<div className="HostelDetails-btn-noBG text-uppercase mt-2" style={{ textDecoration: 'none' }} >
                                                    No offers at the moment.
                                                </div>) : (<div className="HostelDetails-btn-noBG mt-2">

                                                </div>)
                                            }
                                        </div>
                                        <div className="HostelDetails-Offers-sub-container px-4 py-3" >
                                            <div className="HostelDetails-Offers-sub-container-info1">
                                                Book now, pay later and Cancel for free!
                                        </div>
                                            <div className="HostelDetails-btn-noBG text-uppercase mt-2" style={{ textDecoration: 'none' }} >
                                                This feature is not available yet.
                                        </div>
                                            <div className="container">
                                                <div className="row">
                                                    <div className="col-lg-6">
                                                        <div className="HostelDetails-btn-BG text-white text-uppercase text-center px-3 py-2 mt-3"
                                                            onClick={() => this.handleViewRoomsClick()}
                                                        >
                                                            View Rooms
                                                    </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div className="HostelDetails-btn-BG text-white text-uppercase text-center px-3 py-2 mt-3"
                                                            onClick={() => this.handleModal()}
                                                        >
                                                            Enquire Now
                                                    </div>
                                                    </div>

                                                </div>

                                            </div>


                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Modal
                        isOpen={this.state.showModal}
                        shouldCloseOnOverlayClick={true}
                    >
                        <div className='Home6-mainDiv'>
                            <span onClick={this.closeModal} style={{ float: "right", fontSize: "2rem", cursor: "pointer" }}><img src={Cross} style={{ height: "2rem", width: "2rem" }}></img></span>
                            <div className='container'>
                                <div className='row'>
                                    <div className='col-12 md-6'>
                                        <p className='Home6-p1 Home6-p'>Get in touch with us!</p>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-12 md-6'>
                                        <p className='Home6-p2 Home6-p'>For any queries - Fill in your information <br /> to get in touch with the Betahouse team</p>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-12 col-lg-5'>
                                        <input type='text' placeholder='Name' name="formName" className='Home6-text1 Home6-input' onChange={this.handleForm} required></input>
                                    </div>
                                    <div className='col-12 col-lg-5'>
                                        <input type='text' placeholder='Phone Number' name="formNumber" onChange={this.handleForm} className='Home6-text1 Home6-input' required></input>
                                    </div>
                                    <div className='col-2'>
                                    </div>
                                </div>

                                <div className='row'>
                                    <div className='col-12 col-lg-5'>
                                        <input type='text' placeholder='E-mail' name="formEmail" className='Home6-text2 Home6-input' onChange={this.handleForm} required></input>
                                    </div>
                                    <div className='col-12 col-lg-5'>
                                        <input type='text' placeholder='Message' name="formMessage" className='Home6-text2 Home6-input' onChange={this.handleForm}></input>
                                    </div>
                                    <div className='col-2'>
                                    </div>
                                </div>
                                <div className='row'>
                                    {/* <div className='col-12 col-lg-5'>
                                        <input type='text' placeholder='University' className='Home6-text3 Home6-input'></input>
                                    </div> */}
                                    <div className='col-12 col-lg-3'>
                                        <button className='Home6-submit' onClick={this.EnquireNow}><p className='Home6-btext'>SUBMIT</p></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Modal>
                </div >
            )
        }
        else {
            return (
                <div>
                    Loading
                </div>
            )
        }
    }
}
