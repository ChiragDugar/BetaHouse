import React, { Component } from 'react'
import Navbar from '../../../Navbars/transparentUserNavbar'
// import Logo from '../../../../Assets/Asset 1.png'
// import Search from '../../../../Assets/Search@2x.png'
// import DateRangePicker from 'react-daterange-picker';
import 'react-daterange-picker/dist/css/react-calendar.css'
// import moment from 'moment-range';
// import range from 'moment-range';
// import SearchBarDatePickerStart from './SearchBarDatePickerStart';
// import SearchBarDatePickerEnd from './SearchBarDatePickerEnd';
// import MapboxAutocomplete from 'react-mapbox-autocomplete';
import PerformRequest from '../../../PerformRequest'
// import SearchIcon from '../../../../Assets/search-512.png';
// import SearchIconWhite from '../../../../Assets/searchicon2-white.png';
import SearchBar from '../Components/SearchBar';
import ReactTypingEffect from 'react-typing-effect';

export default class Home1 extends Component {

    constructor(props) {
        // console.log(window.location.href);
        // const URL = window.location.href;
        // if (URL.split("#").length > 1 && URL.split("#")[1].length !== 0) {
        //     localStorage.setItem('studentId', URL.split("#")[1]);
        //     window.location.href = "http://localhost:3001/";
        // }
        const urlParams = new URLSearchParams(window.location.search);
        console.log(urlParams);
        if (urlParams.has('a')) {
            fetch('https://backend.betahouse.co.in/auth/student/getstudentdetails', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    studentId: urlParams.get('a')
                })
            })
                .then(data => data.json())
                .then(data => {
                    console.log(data);
                    if (!data.err) {
                        localStorage.setItem("studentId", data.studentId);
                        localStorage.setItem("studentName", data.studentName);
                        localStorage.setItem("x-auth-token", data.token);
                    }
                    else {
                        alert(data.msg);
                    }
                    window.location.href = "https://betahouse.co.in";
                })
                .catch(err => {
                    console.log(err);
                })
        }
        super(props);
        this.state = {
            fromDate: '',
            toDate: '',
            type: 'location',
            latitude: '',
            longitude: '',
            beta: '',
            isBeta: false,
            text: '',
            countryCode: '',
            radioStudent: true,
            radioCoLiving: false
        };
        this.handleDatesStart = this.handleDatesStart.bind(this);
        this.handleDatesEnd = this.handleDatesEnd.bind(this);
    }

    onSelect = dates => this.setState({ dates })

    _suggestionSelect = (result, lat, lng, text) => {
        this.setState({
            latitude: lat,
            longitude: lng,
            text: text
        })
    }


    handleAPI = () => {
        if (this.state.isBeta === false || (this.state.isBeta === true && this.state.beta === '')) {
            let path = "/property/view/search"
            let method = "POST"
            let body = this.state
            let response = PerformRequest(path, method, body)
            // alert("in")
            response.then(res => {
                if (res.err === false) {
                    this.props.history.push({
                        pathname: '/user/listing',
                        state: {
                            type: this.state.type,
                            latitude: this.state.latitude,
                            longitude: this.state.longitude,
                            fromDate: this.state.fromDate,
                            toDate: this.state.toDate,
                            text: this.state.text,
                            studentId: this.props.studentId
                        }
                    })
                }
                else {
                    // alert(res.msg);
                }
            })
                .catch(err => {
                    // alert(err.message);
                })
        }

        else {
            let path = "/property/view/search"
            let method = "POST"
            let body = {
                type: "uniqueId",
                uniqueId: this.state.beta
            }
            let response = PerformRequest(path, method, body)
            response.then(res => {
                // console.log(res)
                this.props.history.push({
                    pathname: '/user/listing',
                    state: {
                        type: "uniqueId",
                        uniqueId: this.state.beta
                    }
                })

            })
        }
    }

    handleDatesStart = (start) => {
        this.setState({
            fromDate: start,
            // to: end
        })
    }

    handleDatesEnd = (end) => {
        this.setState({
            // from: start,
            toDate: end
        })
    }

    handleRadioStudent = (el) => {
        // console.log(el.target)
        this.setState({
            radioStudent: true,
            radioCoLiving: false
        })
    }

    handleRadioColiving = (el) => {
        this.setState({
            radioCoLiving: true,
            radioStudent: false
        })
    }

    handleBeta = (e) => {
        let re = /^beta/;
        e.target.value = e.target.value.toLowerCase();
        if (e.target.value.match(re)) {
            let trimmed = e.target.value.replace(/\s/g, '')
            this.setState({
                beta: trimmed.slice(4),
                isBeta: true
            })
        }
    }

    componentDidMount() {
        fetch('https://extreme-ip-lookup.com/json/')
            .then(res => res.json())
            .then(response => {
                console.log("Country: ", response.country, response.countryCode);
                this.setState({
                    countryCode: response.countryCode.toLowerCase()
                })
            })
            .catch((data, status) => {
                console.log('Request failed');
            })
    }



    render() {
        return (
            <div className="Home1Container text-white">
                <Navbar />
                <div className="row text-center Home1HeadingCtr ">
                    <h4 className="Home1Heading text-uppercase mb-4">
                        Book your comfortable
                <br />
                        {/* student accommodation */}
                        <ReactTypingEffect
                            text={["student accommodation", "co living"]}
                            speed={100}
                            eraseDelay={1000}
                            typingDelay={500}
                        />
                    </h4>
                    <div
                        style={{ margin: "auto", marginTop: "1rem" }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'start', alignItems: 'center', width: "100%", margin: "1rem auto 0.5rem auto" }} >
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: "1.3rem", paddingRight: "0.8rem" }} >
                                <input id="student-accom" type="radio" style={{ marginRight: 3 }} checked={this.state.radioStudent} name="category" onChange={this.handleRadioStudent} />
                                <label htmlFor="student-accom">
                                    <span >Student Accomodation</span>
                                </label>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: "1.3rem", paddingRight: "0.8rem" }} >
                                <input id="co-living" type="radio" style={{ marginRight: 3 }} name="category" checked={this.state.radioCoLiving} onChange={this.handleRadioColiving} />
                                <label htmlFor="co-living">
                                    <span >Co-Living</span>
                                </label>
                            </div>
                        </div>
                        <SearchBar coliving={this.state.radioCoLiving} studentAccomodation={this.state.radioStudent} history={this.props.history} studentId={this.props.studentId} />
                    </div>
                </div>
            </div >
        )
    }
}
