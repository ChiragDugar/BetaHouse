import React, { Component } from 'react'
import PerformRequest from '../../../PerformRequest'
import DarkNavbar from '../../../Navbars/darkMerchantNavbar'
// import '../Stylesheets/AR1.scss'
import '../StyleSheets/AR1.scss'
import Footer from '../../../Footer'
import Loader from 'react-loader-spinner';

export default class AR1 extends Component {
    constructor(props) {
        super(props)
        this.state = {
            roomTypeName: '',
            description: '',
            bedCount: '',
            noOfRooms: '',
            perPersonCostPerMonth: '',
            availableForSharing: "Available For Sharing",
            propertyId: null,
            files: null,
            roomFeature: [],
            featureList: [],
            counter: 0, 
            showLoader:true
        }
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount() {
        console.log(this.props)
        if (this.props.location.state !== undefined || this.props.location !== undefined) {
            this.setState({
                propertyId: this.props.location.state.propertyId,
            })
            if (this.props.location.state.counter !== undefined) {
                this.setState({
                    counter: this.props.location.state.counter
                })
            }
        }
        else {
            this.props.history.push('/merchant/dashboard/addProperty1')
        }
        let response = PerformRequest('/admin/misc/getfeatures', 'POST', {})
        response.then(res => {
            console.log(res)
            if (res.err === false) {
                this.setState({
                    featureList: res.featuresList
                })
            }
        })
    }
    // handleAPI = () => {
    //     console.log((this.state))
    //     let path = "/property/addroomtype"
    //     let method = "POST"
    //     let body = this.state
    //     let response = PerformRequest(path, method, body)
    //     response.then(res => {
    //         console.log(res)
    //         if (res.err === false) {
    //             alert("Successfully Added!")
    //             this.props.history.push("/merchant/dashboard")
    //         }
    //         else
    //             alert(res.msg)                                                                          
    //     })

    // }
    onChangeFile = (e) => {
        let obj = e.target.files;
        let total = Object.keys(obj);
        if (total.length >= 5) {
            this.setState({
                files: obj
            })
        }
        else {
            alert("Please select more images");
        }

    }
    handleValidate = () => {
        let state = this.state
        if (state.roomTypeName === "" || state.availableForSharing === "" || state.bedCount === "" || state.description === "" || state.noOfRooms === "" || state.perPersonCostPerMonth === "" || state.propertyId === "") {
            return false
        }
        else {
            return true
        }
    }
    handleAPI = () => {
        console.log("Check 2")
        let path = "https://backend.betahouse.co.in/property/addroomtype"
        let valid = this.handleValidate()

        if (valid) {
            let files = this.state.files;
            // let response = PerformRequest(path, method, body)
            if (files) {
                this.setState({
                    showLoader:!this.state.showLoader
                })
                console.log("check")
                let data = new FormData();
                for (let i = 0; i < files.length; i++) {
                    // console.log(files[i]);
                    data.append('propertyImages', files[i]);
                }
                data.append('roomTypeName', this.state.roomTypeName)
                data.append('description', this.state.description)
                data.append('bedCount', this.state.bedCount)
                data.append('noOfRooms', this.state.noOfRooms)
                data.append('perPersonCostPerMonth', this.state.perPersonCostPerMonth)
                data.append('availableForSharing', this.state.availableForSharing)
                data.append('propertyId', this.state.propertyId);
                data.append('features', this.state.roomFeature)
                console.log(data)
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
                        console.log(res)
                        if (!res.err) {
                            alert("Successfully Added!")
                            if (this.state.counter === 0) {
                                this.props.history.push('/merchant/dashboard')
                            }
                            else if (this.state.counter === 1) {
                                this.props.history.push({
                                    pathname: '/merchant/dashboard/viewRoom',
                                    state: {
                                        propertyId: this.state.propertyId,
                                        propertyName: res.property.propertyName,
                                        description: res.property.description,
                                        address: res.property.address,
                                        latitude: res.property.location[0],
                                        longitude: res.property.location[1],
                                        propertyImages: res.property.propertyImages,
                                        features: res.property.features

                                    }
                                })
                            }
                        }
                        else
                            alert(res.msg)
                    })
                    .catch(e => {
                        alert(e.message);
                    })
                // }
                // response
            }
            else {
                alert('Looks like you missed out something')
            }
        }
    }
    handleChange = (e) => {
        let lhs = e.target.name
        let rhs = e.target.value
        this.setState({ [lhs]: rhs }, () => {
            console.log(this.state)
        })
    }
    handleRoomFeature = (e) => {
        let lhs = e.target.name
        let rhs = e.target.value
        let arr = []
        this.state.featureList.filter((item) => {
            if (rhs !== item) {
                arr.push(item)
            }
        })
        console.log(arr)
        if (!this.state.roomFeature.includes(rhs) && rhs != "") {
            this.setState({
                [lhs]: [...this.state.roomFeature, rhs],
                featureList: arr
            })
        }
    }
    handleFeatureRemove = (index) => {
        let roomFeature = this.state.roomFeature.splice(index, 1)
        this.setState(roomFeature)
        if (!this.state.featureList.includes(roomFeature)) {
            this.setState({
                featureList: [...this.state.featureList, roomFeature[0]]
            }, () => {
                console.log(this.state.featureList)
            })
        }
    }
    render() {
        return (
            <div>
                <DarkNavbar history={this.props.history} />
                {this.state.showLoader?(
                    <div className="row AR1-row1">
                        <div className="col-md-6 AR1-col1">
                        </div>
                        <div className="col-md-6 AR1-col2">
                            <p className="AR1-p1">Help us make your <br></br>listing experience better!</p>
                            <p className="AR1-p2">ADD ROOM</p>
                            <div>
                                <div className="AR1-form1">
                                    <input type="text" name="roomTypeName" placeholder="Complex/House Name" className="AP1-tf" onChange={this.handleChange}></input>
                                    <input type="text" name="description" placeholder="Description" className="AP1-tf" onChange={this.handleChange}></input>
                                    <input type="text" name="bedCount" placeholder="Bed Count" className="AP1-tf" onChange={this.handleChange}></input>
                                    <input type="text" name="noOfRooms" placeholder="Number of Rooms" className="AP1-tf" onChange={this.handleChange}></input>
                                    <input type="text" name="perPersonCostPerMonth" placeholder="Per Person Cost Per Month" className="AP1-tf" onChange={this.handleChange}></input>

                                    {/* <input type="text" name="availableForSharing" placeholder="Available for Sharing" className="AP1-tf" onChange={this.handleChange}></input> */}
                                    <select name="availableForSharing" value={this.state.availableForSharing} id="availableForSharing" className="AP1-tf"
                                        onChange={this.handleChange}>
                                        <option value="" >Available For Sharing</option>
                                        <option value={true}>True</option>
                                        <option value={false}>False</option>
                                    </select>
                                    <div className="row AP1-row1" style={{ width: "60%" }}>
                                        <select name="roomFeature" id="feature" className="AP1-select col-lg-6 col-md-12" value={this.state.roomFeature[this.state.roomFeature.length - 1]} onChange={this.handleRoomFeature}>
                                            <option className="text-center" value="">Choose Features</option>
                                            {this.state.featureList.map(item =>
                                                <option className="text-center" value={item}>{item}</option>
                                            )}
                                        </select>
                                        <div className="AP1-subHeading-Italics text-left col-lg-6 col-md-12">
                                            <ul>
                                                {this.state.roomFeature.length > 0 ? (
                                                    this.state.roomFeature.map((item, index) =>
                                                        <li>{item}<span className="px-3 AP1-featureCancel" onClick={() => this.handleFeatureRemove(index)}>X</span></li>
                                                    )
                                                ) : (
                                                        null
                                                    )}
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="text-uppercase p-2 AP1-subHeading text-left">
                                        SHOW US YOUR HAPPY PLACE <span className="AP1-subHeading-Italics">(Attach at least 5 images)</span>
                                    </div>
                                    <input type="file" id="propertyImages" onChange={this.onChangeFile} className="AP1-subHeading" multiple />
                                    <button className="AP1-b1 text-uppercase px-3 py-2 mt-3" onClick={this.handleAPI}><span>Submit</span></button>
                                </div>

                            </div>
                        </div>
                    </div>
                    ):(
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            padding: "4rem"
                        }}
                    >
                            <Loader
                                type="Oval"
                                color="#A9A9A9"
                                height={50}
                                width={50}
                            />
                    </div>
                )}
                <Footer />
            </div>
        )
    }
}
