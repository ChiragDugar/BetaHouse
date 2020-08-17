import SearchBarDatePickerStart from './SearchBarDatePickerStart';
import SearchBarDatePickerEnd from './SearchBarDatePickerEnd';
import MapboxAutocomplete from 'react-mapbox-autocomplete';
import PerformRequest from '../../../PerformRequest'
import SearchIconWhite from '../../../../Assets/searchicon2-white.png';
import React, { Component } from 'react';
import $ from 'jquery'
import SearchBar2 from './SearchBar2';


class SearchBar extends Component {
    constructor(props) {
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
            blurStartDate: 0,
            acmenuFlag: false,
            suggestion: {}
        };
        this.handleDatesStart = this.handleDatesStart.bind(this);
        this.handleDatesEnd = this.handleDatesEnd.bind(this);
    }

    onSelect = dates => this.setState({ dates })

    // _suggestionSelect = (result, lat, lng, text) => {
    //     this.setState({
    //         latitude: lat,
    //         longitude: lng,
    //         text: text
    //     })
    // }

    suggestionSelect = (result) => {
        this.setState({
            suggestion: result
        }, () => {
            // console.log(`Suggestion successfully set`);
        });
    }

    handleAPI2 = () => {
        let path = "/property/view/newsearch";
        let method = "POST";
        const { type, name, _id } = this.state.suggestion;
        const { fromDate, toDate } = this.state;
        if (!type || !fromDate || fromDate === '' || !toDate || toDate === '') {
            alert("Enter the search details");
            return;
        }
        let universityName, cityId, propertyId, body;
        const propertyType = this.props.studentAccomodation ? "studentAccom" : "coLiving";
        if (type === 'universityId') {
            universityName = name;
            body = {
                fromDate,
                toDate,
                type,
                universityName,
                propertyType
            };
        }
        else if (type === 'cityId') {
            cityId = _id;
            body = {
                fromDate,
                toDate,
                type,
                cityId,
                propertyType
            }
        }
        else if (type === 'propertyId') {
            propertyId = _id;
            body = {
                fromDate,
                toDate,
                type,
                propertyId,
                propertyType
            }
        }
        let response = PerformRequest(path, method, body);
        const studentId = localStorage.getItem("studentId") ? localStorage.getItem("studentId") : '';
        console.log("@@@@@@@@@@@@@@@@@")
        this.props.history.push({
            pathname: '/user/listing',
            state: {
                // type: this.state.type,
                // latitude: this.state.latitude,
                // longitude: this.state.longitude,
                searchBody: body,
                // fromDate: this.state.fromDate,
                // toDate: this.state.toDate,
                text: this.state.text,
                studentId: studentId,
                coliving: this.props.coliving,
                studentAccomodation: this.props.studentAccomodation
            }
        });
    }


    handleAPI = () => {
        if (this.state.isBeta === false || (this.state.isBeta === true && this.state.beta === '')) {
            let path = "/property/view/search"
            let method = "POST"
            let body = this.state
            console.log("Entered handle api");
            let response = PerformRequest(path, method, body)
            // alert("in")
            const studentId = localStorage.getItem("studentId") ? localStorage.getItem("studentId") : '';
            response.then(res => {
                if (res.err === false) {
                    console.log(`response 1`);
                    console.log(this.state);
                    this.props.history.push({
                        pathname: '/user/listing',
                        state: {
                            type: this.state.type,
                            latitude: this.state.latitude,
                            longitude: this.state.longitude,
                            fromDate: this.state.fromDate,
                            toDate: this.state.toDate,
                            text: this.state.text,
                            studentId: studentId,
                            coliving: this.props.coliving,
                            studentAccomodation: this.props.studentAccomodation
                        }
                    })
                }
                else {
                    console.log(`response 2`);
                    // alert(res.msg);
                    console.log(`ERRRROOR`);
                    console.log(res.msg);
                }
            })
                .catch(err => {
                    // alert(err.message);
                    console.log(err.message);

                })
        }

        else {
            let path = "/property/view/search"
            let method = "POST"
            const studentId = localStorage.getItem("studentId") ? localStorage.getItem("studentId") : '';
            let body = {
                type: "uniqueId",
                uniqueId: this.state.beta,
                fromDate: this.state.fromDate,
                toDate: this.state.toDate,
                text: this.state.text,
                studentId: studentId,
                coliving: this.props.coliving,
                studentAccomodation: this.props.studentAccomodation
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
            toDate: end,
            blurStartDate: this.state.blurStartDate + 1
        })
    }

    handleBlurStartDate = () => {
        this.setState({
            blurStartDate: this.state.blurStartDate + 1
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
                // console.log("Country: ", response.country, response.countryCode);
                this.setState({
                    countryCode: response.countryCode.toLowerCase()
                })
            })
            .catch((data, status) => {
                // console.log('Request failed');
            })

        var that = this

        $(document).click(function () {
            if (that.state.acmenuFlag === true) {
                $(".react-mapbox-ac-menu").show();
            }
            else {
                $(".react-mapbox-ac-menu").hide();
            }
        })

        $(".Home1-input").click(function () {
            that.setState({
                acmenuFlag: !that.state.acmenuFlag
            })
        })

        $(".Home1-input").focusout(function () {
            that.setState({
                acmenuFlag: !that.state.acmenuFlag
            })
        })
    }



    render() {
        return (
            <div className="Home1-Search-bar" onChange={this.handleBeta}>
                {/* <input type="text" placeholder="Search by University, City or Property" className="Home1-input px-4" /> */}
                {/* <MapboxAutocomplete
                    publicKey='pk.eyJ1IjoieWFzaGJhaWQiLCJhIjoiY2s3Nmp4cWxtMDBuMDNmbzBiZXhlbmlrZCJ9.-2KnnF7MdkIAip6it8XdZg'
                    inputClass='Home1-input'
                    onSuggestionSelect={this._suggestionSelect}
                    country={this.state.countryCode}
                    resetSearch={false}
                /> */}
                <SearchBar2 studentAccomodation={this.props.studentAccomodation} suggestionSelect={this.suggestionSelect} />
                {/* <br></br> */}
                <div className="Dates">
                    <div className=" Home1-Dates Home1-Dates__start">
                        <SearchBarDatePickerStart
                            handleBlurStartDate={() => this.handleBlurStartDate()}
                            // handleFocusStartDate={() => this.handleFocusStartDate()}
                            handleDates={this.handleDatesStart} />
                    </div>

                    <div className=" Home1-Dates Home1-Dates__end">
                        <SearchBarDatePickerEnd
                            blurStartDate={this.state.blurStartDate}
                            handleDates={this.handleDatesEnd} fromDate={this.state.fromDate} />
                    </div>




                    <div className="d-inline-block bg-dark Home1-Button" onClick={this.handleAPI2} >
                        <img src={SearchIconWhite} className="Home1-Search-Icon"
                            height="100%" alt="Search Button" />
                        {/* <i className="fas fa-search Home1-Search-Icon"></i> */}
                    </div>
                </div>
            </div>
        )
    }
}

export default SearchBar;