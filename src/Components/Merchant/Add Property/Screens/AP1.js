import React, { Component } from 'react'
import PerformRequest from '../../../PerformRequest'
import DarkNavbar from '../../../Navbars/darkMerchantNavbar'
import '../Stylesheets/AP1.scss'
import Loader from 'react-loader-spinner';
import Footer from '../../../Footer'

export default class AP1 extends Component {
    constructor(props) {
        super(props)
        this.state = {
            propertyName: '',
            address: '',
            latitude: '',
            longitude: '',
            description: '',
            merchantId: '',
            files: [],
            featureList: [],
            propertyFeature: [],
            showLocation: false,
            propertyCity: "",
            propertyCityList: [],
            propertyLocalitiesList: [],
            propertyLocalities: [],
            propertyUniversityList: [],
            propertyUniversity: [],
            propertyType: "",
            showLoader: true,
            leadImage :null
        }
    }

    componentDidMount = () => {
        let token = localStorage.getItem('merchantId')
        if (token !== undefined) {
            this.setState({
                merchantId: token
            })
        }
        else {
            this.props.history.push('/merchant/login')
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
        let response1 = PerformRequest('/admin/misc/getcitieslist', 'POST', {})
        response1.then((res) => {
            console.log(res)
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
        let response3 = PerformRequest('/admin/misc/getunilist', 'POST', {})
        response3.then((res) => {
            if (res.err === false) {
                this.setState({
                    propertyUniversityList: res.universityList
                })
            }
        })
    }

    handleValidate = () => {
        let state = this.state
        if (state.propertyName === "" || state.address === "" || state.description === "" || state.latitude === "" || state.longitude === "") {
            return false
        }
        else {
            return true
        }
    }

    handlePropertyCity = (e) => {
        let lhs = e.target.name
        let rhs = e.target.value
        if (rhs !== "") {
            this.getLocalities(rhs)
            this.setState({
                [lhs]: rhs,
            }, () => {
                console.log(this.state.propertyCity)
            })
        }
    }

    getLocalities = (id) => {
        let body = {
            cityId: id
        }
        PerformRequest('/admin/misc/getlocalitiesforcity', 'POST', body)
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

    handlePropertyLocalities = (e) => {
        let lhs = e.target.name
        let rhs = e.target.value
        let arr = []
        this.state.propertyLocalitiesList.filter((item) => {
            if (rhs !== item) {
                arr.push(item)
            }
        })

        if (!this.state.propertyLocalities.includes(rhs) && rhs !== "") {
            this.setState({
                [lhs]: [...this.state.propertyLocalities, rhs],
                propertyLocalitiesList: arr
            })
        }
    }

    handlePropertyLocalitiesRemove = (index) => {
        let propertyLocalities = this.state.propertyLocalities.splice(index, 1)
        this.setState(propertyLocalities)
        if (!this.state.featureList.includes(propertyLocalities)) {
            this.setState({
                propertyLocalitiesList: [...this.state.propertyLocalitiesList, propertyLocalities[0]]
            }, () => {
                console.log(this.state.propertyLocalitiesList)
            })
        }
    }

    handleUniversity = (e) => {
        let lhs = e.target.name
        let rhs = e.target.value
        let arr = []
        this.state.propertyUniversityList.filter((item) => {
            if (rhs !== item) {
                arr.push(item)
            }
        })

        if (!this.state.propertyUniversity.includes(rhs) && rhs !== "") {
            this.setState({
                [lhs]: [...this.state.propertyUniversity, rhs],
                propertyUniversityList: arr
            })
        }
    }

    handleUniversityRemove = (index) => {
        let propertyUniversity = this.state.propertyUniversity.splice(index, 1)
        this.setState(propertyUniversity)
        if (!this.state.featureList.includes(propertyUniversity)) {
            this.setState({
                propertyUniversityList: [...this.state.propertyUniversityList, propertyUniversity[0]]
            })
        }
    }

    handleAPI = () => {
        console.log(this.state)
        let path = "https://backend.betahouse.co.in/property/add"
        let valid = this.handleValidate()
        if (valid) {
            let files = this.state.files;
            let leadImage = this.state.leadImage;
            // let response = PerformRequest(path, method, body)
            if (files && leadImage) {
                this.setState({
                    showLoader:!this.state.showLoader
                })
                console.log("check")
                let data = new FormData();
                data.append('propertyImages',leadImage[0])
                for (let i = 0; i < files.length; i++) {
                    // console.log(files[i]);
                    data.append('propertyImages', files[i]);
                }
                data.append('propertyName', this.state.propertyName)
                data.append('propertyType', this.state.propertyType)
                data.append('address', this.state.address)
                data.append('latitude', this.state.latitude)
                data.append('longitude', this.state.longitude)
                data.append('description', this.state.description)
                data.append('merchantId', this.state.merchantId);
                data.append('features', this.state.propertyFeature)
                data.append('city', this.state.propertyCity)
                data.append('localities', JSON.stringify(this.state.propertyLocalities))
                data.append('universities', JSON.stringify(this.state.propertyUniversity))
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
                            console.log(res)
                            this.props.history.push({
                                pathname: '/merchant/dashboard/addRoom',
                                state: {
                                    propertyId: res.property._id
                                }
                            })
                        }
                        else
                            alert(res.msg)
                    })
                    .catch(e => {
                        alert(e.message);
                    })
            }
        //     // response
        }
        else {
            alert('Looks like you missed out something')
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
        console.log(arr)
        if (!this.state.propertyFeature.includes(rhs) && rhs !== "") {
            this.setState({
                [lhs]: [...this.state.propertyFeature, rhs],
                featureList: arr
            })
        }
    }
    handleChange = (e) => {
        let lhs = e.target.name
        let rhs = e.target.value
        this.setState({ [lhs]: rhs }, () => { console.log(this.state, lhs, rhs) })
    }

    onChangeFile = (e) => {
        let obj = e.target.files;
        let total = Object.keys(obj);
        if (total.length >= 5) {
            this.setState({
                files: obj
            },()=>{
                console.log(this.state.files)
            })
        }
        else {
            alert("Please select more images");
        }
    }

    onChangeLeadFile = (e) => {
        let obj = e.target.files;
        let lead = Object.keys(obj);
        if (lead.length >= 1) {
            this.setState({
                leadImage:obj
            })
        }
        else {
            alert("Please select a Thumbnail");
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

    handlePropertyType = (el) => {
        if (el.target.value !== "") {
            this.setState({
                propertyType: el.target.value
            })
        }
    }


    render() {
        return (
            <div style={{ overflowX: 'None' }}>
                <DarkNavbar history={this.props.history} />
                {this.state.showLoader ? (


                    <div className="row AP1-row1 text-muted mr-0 ml-0">
                        <div className="col-lg-6 col-md-6 d-none d-lg-block d-md-block AP1-col1">
                        </div>
                        <div className="col-lg-6 col-md-6 AP1-col2">
                            <p className="AP1-p1">Help us make your <br></br>listing experience better!</p>
                            <p className="AP1-p2">PROPERTY UPLOAD</p>
                            <div className="AP1-form1">
                                <input type="text" name="propertyName" placeholder="Complex/House Name" className="AP1-tf" onChange={this.handleChange}></input>
                                <select name="propertyType" id="type" className="AP1-tf text-muted" value={this.state.propertyType} onChange={this.handlePropertyType}>
                                    <option value="">Choose a type of property</option>
                                    <option value="coLiving">Co-Living</option>
                                    <option value="studentAccom">Student Accomodation</option>
                                </select>
                                <input type="text" name="address" placeholder="Address" className="AP1-tf " onChange={this.handleChange}></input>
                                <input type="text" name="description" placeholder="Description" className="AP1-tf" onChange={this.handleChange}></input>
                                <input type="number" name="latitude" placeholder="Latitude" className="AP1-tf" onChange={this.handleChange}></input>
                                <input type="number" name="longitude" placeholder="Longitude" className="AP1-tf" onChange={this.handleChange}></input>
                                <div className="row AP1-row1 text-muted" style={{ width: "60%" }}>
                                    <select name="propertyUniversity" id="propertyUniversity" className="AP1-select col-lg-6 col-md-12"
                                        value={this.state.propertyUniversity.length > 0 ? this.state.propertyUniversity[this.state.propertyUniversity.length - 1] : "Choose your Localities"}
                                        onChange={this.handleUniversity}
                                    >
                                        <option value="">Choose Nearby University</option>
                                        {this.state.propertyUniversityList ? (
                                            this.state.propertyUniversityList.map(item => (
                                                <option value={item}>{item}</option>
                                            ))
                                        ) : (null)}

                                    </select>
                                    <div className="AP1-subHeading-Italics text-left col-lg-6 col-md-12 text-muted">
                                        <ul>
                                            {this.state.propertyUniversity.length > 0 ? (
                                                this.state.propertyUniversity.map((item, index) =>
                                                    <li>{item}<span className="px-3 AP1-featureCancel" onClick={() => this.handleUniversityRemove(index)}>X</span></li>
                                                )
                                            ) : (
                                                    null
                                                )}
                                        </ul>
                                    </div>
                                </div>
                                <select name="propertyCity" id="city" className="AP1-tf" value={this.state.propertyCity} onChange={this.handlePropertyCity}>
                                    <option value="">Choose a City</option>
                                    {this.state.propertyCityList ? (
                                        this.state.propertyCityList.map(item => (
                                            <option value={item.id}>{item.name}</option>
                                        ))
                                    ) : (null)}

                                </select>
                                {this.state.showLocation ? (
                                    <div className="row AP1-row1 text-muted" style={{ width: "60%" }}>
                                        <select name="propertyLocalities" id="localities" className="AP1-select col-lg-6 col-md-12"
                                            value={this.state.propertyLocalities.length > 0 ? this.state.propertyLocalities[this.state.propertyLocalities.length - 1] : "Choose your Localities"}
                                            onChange={this.handlePropertyLocalities}
                                        >
                                            <option value="">Choose your Localities</option>
                                            {this.state.propertyLocalitiesList ? (
                                                this.state.propertyLocalitiesList.map(item => (
                                                    <option value={item}>{item}</option>
                                                ))
                                            ) : (null)}

                                        </select>
                                        <div className="AP1-subHeading-Italics text-left col-lg-6 col-md-12">
                                            <ul>
                                                {this.state.propertyLocalities.length > 0 ? (
                                                    this.state.propertyLocalities.map((item, index) =>
                                                        <li>{item}<span className="px-3 AP1-featureCancel" onClick={() => this.handlePropertyLocalitiesRemove(index)}>X</span></li>
                                                    )
                                                ) : (
                                                        null
                                                    )}
                                            </ul>
                                        </div>
                                    </div>
                                ) : (null)}
                                <div className="row AP1-row1 text-muted" style={{ width: "60%" }}>
                                    <select name="propertyFeature" id="feature" className="AP1-select col-lg-6 col-md-12" value={this.state.propertyFeature[this.state.propertyFeature.length - 1]} onChange={this.handlePropertyFeature}>
                                        <option className="text-center" value="">Choose Features</option>
                                        {this.state.featureList.map(item =>
                                            <option className="text-center" value={item}>{item}</option>
                                        )}
                                    </select>
                                    <div className="AP1-subHeading-Italics text-left col-lg-6 col-md-12">
                                        <ul>
                                            {this.state.propertyFeature.length > 0 ? (
                                                this.state.propertyFeature.map((item, index) =>
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
                                Thumbnail
                                <input type="file" id="propertyImagesLead" onChange={this.onChangeLeadFile} className="AP1-subHeading"/>
                                <button className="AP1-b1 text-uppercase px-3 py-2 mt-3" onClick={this.handleAPI}><span>Submit</span></button>
                            </div>
                        </div>
                    </div>
                ) : (
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
            </div>
        )
    }
}
