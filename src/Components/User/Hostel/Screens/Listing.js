import React, { Component } from 'react'
import Navbar from '../../../Navbars/darkNavbar'
import Footer from '../../../Footer'
import ListingHeader from '../Components/ListingHeader.js'
import '../Stylesheets/ListingHeader.scss'
import '../Stylesheets/HostelListingCarousel.scss'
import '../Stylesheets/HostelListingCard.scss'
import PerformRequest from '../../../PerformRequest'
import HostelListingCard from '../Components/HostelListingCard'
// import SearchBar from '../../Home/Components/SearchBar'
import '../Stylesheets/Listing.scss';
import Loader from 'react-loader-spinner';
import '../Stylesheets/CheckboxDesign.scss';
// import '../Stylesheets/PriceRange.scss';
// import PriceRange2 from '../Components/PriceRange2';
import '../Stylesheets/PriceRange.scss';
import $ from 'jquery';

export default class Listing extends Component {
    constructor(props) {
        super(props);
        // const { type, latitude, longitude, uniqueId, fromDate, toDate, text } = this.props.location.state;
        // console.log(`Reached the listing page`);
        // console.log(this.props.location.state);
        let { searchBody, text, studentAccomodation } = this.props.location.state;
        if (studentAccomodation) {
            searchBody["propertyType"] = "studentAccom";
        }
        else {
            searchBody["propertyType"] = "coLiving";
        }
        this.state = {
            allProperties: [],
            displayProperties: [],
            loading: true,
            text: text,
            searchParams: searchBody,
            fromDate: searchBody.fromDate,
            toDate: searchBody.toDate,
            neighbourHoodOptionsFilter: [],
            priceRangeLowFilter: null,
            priceRangeHighFilter: null,
            universityListFilter: [],
            selectedLocalities: [],
            roomTypesFilter: [],
            selectedRoomTypes: [],
            showRoomTypeFilter: false,
            showNeighbourHoodFilter: false,
            showPriceRangeFilter: false,
            showUniversityFilter: false,
            selectedUniversities: [],
            minPriceRangeValue: null,
            maxPriceRangeValue: null,
            cityDescription: ''
        }
        // if (type === "location") {
        //     this.state = {
        //         properties: [],
        //         searchParams: {
        //             type,
        //             latitude,
        //             longitude,
        //             fromDate,
        //             toDate
        //         },
        //         text: text,
        //         loading: true
        //     }
        // }
        // else {
        //     this.state = {
        //         properties: [],
        //         searchParams: {
        //             type,
        //             uniqueId,
        //             fromDate,
        //             toDate
        //         },
        //         text: text,
        //         loading: true
        //     }
        // }
    }
    populateFilterFields = () => {
        // console.log(this.state.allProperties);
        const neighbourHoodOptionsFilter = [];
        const universityListFilter = [];
        const roomTypesFilter = [];
        let priceRangeLowFilter = 0;
        let priceRangeHighFilter = 0;
        // console.log(`Entered populate filter fields`);
        // console.log(this.state.allProperties.length);
        if (this.state.allProperties.length === 0) {
            this.setState({
                neighbourHoodOptionsFilter,
                universityListFilter,
                priceRangeHighFilter,
                priceRangeLowFilter,
                roomTypesFilter
            });
            return;
        }
        priceRangeLowFilter = this.state.allProperties[0].minimumCost;
        priceRangeHighFilter = this.state.allProperties[0].minimumCost;
        // minimumCost
        // console.log(`Something`);
        for (let i = 0; i < this.state.allProperties.length; i++) {
            // console.log(`Inside the crazy for loop`);
            const property = this.state.allProperties[i];
            property.roomTypeNames.forEach(roomName => {
                if (!roomTypesFilter.includes(roomName.roomTypeName)) {
                    roomTypesFilter.push(roomName.roomTypeName);
                }
            })
            property.localities.forEach(locality => {
                // console.log(`Locality name: ${locality}`);
                if (!neighbourHoodOptionsFilter.includes(locality)) {
                    neighbourHoodOptionsFilter.push(locality);
                }
            });
            property.universities.forEach(university => {
                if (!universityListFilter.includes(university)) {
                    universityListFilter.push(university);
                }
            });
            if (property.minimumCost < priceRangeLowFilter) {
                priceRangeLowFilter = property.minimumCost;
            }
            if (property.minimumCost > priceRangeHighFilter) {
                priceRangeHighFilter = property.minimumCost;
            }
        }
        this.setState({
            neighbourHoodOptionsFilter,
            universityListFilter,
            priceRangeHighFilter,
            priceRangeLowFilter,
            minPriceRangeValue: priceRangeLowFilter,
            maxPriceRangeValue: priceRangeHighFilter,
            roomTypesFilter
        });
    }
    getProperties = (data) => {
        let response = PerformRequest("/property/view/newsearch", "POST", data)
        response.then(res => {
            console.log(res);
            this.setState({
                allProperties: res.properties,
                displayProperties: res.properties,
                loading: false,
                cityDescription: res.city.data.description
                // studentId:this.props.studentId
            }, () => {
                this.populateFilterFields();
                console.log("%%", this.state)
            });
            // console.log(`Set loading to false`);
        })
            .catch(err => {
                // console.log(`Got error`);
                this.setState({
                    loading: false
                })
                // console.log(`Set loading to false`);

            })
    }
    componentDidMount = () => {
        this.getProperties(this.state.searchParams)
        $(document).mousedown(function (e) {
            var container = $("#neighbourhood-box");
            if (!container.is(e.target) && container.has(e.target).length === 0) {
                container.hide();
            }
            var container2 = $("#pricerange-box");
            if (!container2.is(e.target) && container2.has(e.target).length === 0) {
                container2.hide();
            }
            var container3 = $("#university-box");
            if (!container3.is(e.target) && container3.has(e.target).length === 0) {
                container3.hide();
            }

            var container3 = $("#roomtype-box");
            if (!container3.is(e.target) && container3.has(e.target).length === 0) {
                container3.hide();
            }
        });
    }

    componentDidUpdate = (prevProps) => {
        // console.log(`Component did update`);
        // console.log(prevProps);
        // console.log(this.props);
        // console.log(`Component did update end of`);
        if (prevProps.location.key !== this.props.location.key) {
            const { searchBody, text } = this.props.location.state;
            this.setState({
                // properties: [],
                loading: true,
                text: text,
                searchParams: searchBody,
                fromDate: searchBody.fromDate,
                toDate: searchBody.toDate
            }, () => {
                // console.log(`Set loading to true`);
                this.getProperties(this.state.searchParams)
            })
        }
    }
    // const { type, latitude, longitude, uniqueId, fromDate, toDate, text } = this.props.location.state;
    // console.log(`Reached the listing page`);
    // if (type === "location") {
    //     const searchParams = {
    //         type,
    //         latitude,
    //         longitude,
    //         fromDate,
    //         toDate
    //     }
    //     this.setState({
    //         searchParams: searchParams,
    //         text: text,
    //         loading: true
    //         }, () => {
    //             console.log(`Set loading to true`);
    //             this.getProperties(this.state.searchParams)
    //         })
    //     }
    //     else {
    //         const searchParams = {
    //             type,
    //             uniqueId,
    //             fromDate,
    //             toDate
    //         };
    //         this.setState({
    //             searchParams: searchParams,
    //             text: text,
    //             loading: true
    //         }, () => {
    //             this.getProperties(this.state.searchParams)
    //         })
    //     }
    // }
    // else {
    //     console.log(`Did not reach the listing page`);
    // }
    updateNeighbourList = (locality) => {
        // console.log(`Locality selected ${locality}`);
        let { selectedLocalities } = this.state;
        // console.log(1111);
        // console.log(selectedLocalities);
        // console.log(2222);
        if (selectedLocalities.includes(locality)) {
            // console.log(`Entered this`);
            selectedLocalities = selectedLocalities.filter(el => el !== locality);
        }
        else {
            selectedLocalities.push(locality);
        }
        // console.log({ selectedLocalities });
        this.setState({
            selectedLocalities: selectedLocalities
        })
    }

    updateRoomTypeList = (roomType) => {
        // console.log(`Locality selected ${locality}`);
        let { selectedRoomTypes } = this.state;
        // console.log(1111);
        // console.log(selectedLocalities);
        // console.log(2222);
        if (selectedRoomTypes.includes(roomType)) {
            // console.log(`Entered this`);
            selectedRoomTypes = selectedRoomTypes.filter(el => el !== roomType);
        }
        else {
            selectedRoomTypes.push(roomType);
        }
        // console.log({ selectedRoomTypes });
        this.setState({
            selectedRoomTypes: selectedRoomTypes
        })
    }

    updateUniversityList = (university) => {
        // console.log(`Locality selected ${locality}`);
        let { selectedUniversities } = this.state;
        // console.log(1111);
        // console.log(selectedLocalities);
        // console.log(2222);
        if (selectedUniversities.includes(university)) {
            // console.log(`Entered this`);
            selectedUniversities = selectedUniversities.filter(el => el !== university);
        }
        else {
            selectedUniversities.push(university);
        }
        // console.log({ selectedUniversities });
        this.setState({
            selectedUniversities: selectedUniversities
        })
    }

    toggleNeighbourHood = () => {
        this.setState({
            showNeighbourHoodFilter: !this.state.showNeighbourHoodFilter
        })
    }

    toggleRoomType = () => {
        console.log(`Toggle room called`);
        this.setState({
            showRoomTypeFilter: !this.state.showRoomTypeFilter
        })
    }

    toggleUniversity = () => {
        this.setState({
            showUniversityFilter: !this.state.showUniversityFilter
        })
    }

    togglePriceRange = () => {
        // console.log(`Toggle price range`);
        this.setState({
            showPriceRangeFilter: !this.state.showPriceRangeFilter
        })
    }


    handleNeighbourhoodFilter = () => {
        // console.log(`Selected localities list`);
        // console.log(this.state.selectedLocalities);
        const { selectedLocalities, allProperties } = this.state;
        if (selectedLocalities.length === 0) {
            this.setState({
                displayProperties: allProperties,
                showNeighbourHoodFilter: false
            });
        }
        else {
            // console.log(selectedLocalities);
            const displayProperties = allProperties.filter(property => {
                for (let i = 0; i < selectedLocalities.length; i++) {
                    if (property.localities.includes(selectedLocalities[i])) {
                        return true;
                    }
                }
                return false;
            });
            this.setState({
                displayProperties: displayProperties,
                showNeighbourHoodFilter: false
            })
        }
    }

    handleRoomTypeFilter = () => {
        // console.log(`Selected localities list`);
        // console.log(this.state.selectedLocalities);
        const { selectedRoomTypes, allProperties } = this.state;
        console.log(`ENTERED HANDLE ROOM TYPE FILTER`);
        console.log({ selectedRoomTypes, allProperties });
        if (selectedRoomTypes.length === 0) {
            this.setState({
                displayProperties: allProperties,
                showRoomTypeFilter: false
            });
        }
        else {
            // console.log(selectedRoomTypes);
            // const displayProperties = allProperties.filter(property => {
            //     for (let i = 0; i < selectedRoomTypes.length; i++) {
            //         property.roomTypeNames.forEach(roomName => {
            //             console.log({ roomName: roomName.roomTypeName, selectedRoom: selectedRoomTypes[i] });
            //             if (roomName.roomTypeName === selectedRoomTypes[i]) {
            //                 return true;
            //             }
            //         })
            //     }
            //     return false;
            // });
            const displayProperties = [];
            allProperties.forEach(property => {
                let found = false;
                for (let i = 0; i < selectedRoomTypes.length; i++) {
                    for (let j = 0; j < property.roomTypeNames.length; j++) {
                        if (property.roomTypeNames[j].roomTypeName === selectedRoomTypes[i]) {
                            console.log(`PROPERTY MATCH`);
                            displayProperties.push(property);
                            found = true;
                            break;
                        }
                    }
                    if (found) {
                        break;
                    }
                }
            });
            console.log({ displayProperties });
            this.setState({
                displayProperties: displayProperties,
                showRoomTypeFilter: false
            })
        }
    }

    handleUniversityFilter = () => {
        // console.log(`Selected universities list`);
        // console.log(this.state.selectedLocalities);
        const { selectedUniversities, allProperties } = this.state;
        if (selectedUniversities.length === 0) {
            this.setState({
                displayProperties: allProperties,
                showUniversityFilter: false
            });
        }
        else {
            // console.log(selectedUniversities);
            const displayProperties = allProperties.filter(property => {
                for (let i = 0; i < selectedUniversities.length; i++) {
                    if (property.universities.includes(selectedUniversities[i])) {
                        return true;
                    }
                }
                return false;
            });
            this.setState({
                displayProperties: displayProperties,
                showUniversityFilter: false
            })
        }
    }

    handlePriceChange = (e, type) => {
        // console.log(`Entered handle price change`);
        const val = e.target.value;
        // console.log(val);
        if (val >= this.state.priceRangeLowFilter && val <= this.state.priceRangeHighFilter) {
            if (type === "min") {
                this.setState({
                    minPriceRangeValue: val
                })
            }
            else if (type === "max") {
                this.setState({
                    maxPriceRangeValue: val
                })
            }
        }
    }

    priceRangeFilterButton = () => {
        const { minPriceRangeValue, maxPriceRangeValue } = this.state;
        // console.log({ minPriceRangeValue, maxPriceRangeValue });
        if (!minPriceRangeValue || !maxPriceRangeValue) {
            this.setState({
                showPriceRangeFilter: false,
                minPriceRangeValue: this.state.priceRangeLowFilter,
                maxPriceRangeValue: this.state.priceRangeHighFilter,
                displayProperties: this.state.allProperties
            });
            return;
        }
        const result = [];
        for (let i = 0; i < this.state.allProperties.length; i++) {
            const property = this.state.allProperties[i];
            if (property.minimumCost >= minPriceRangeValue && property.minimumCost <= maxPriceRangeValue) {
                result.push(property);
            }
        }
        this.setState({
            showPriceRangeFilter: false,
            displayProperties: result
        });
    }

    resetPriceRange = () => {
        this.setState({
            displayProperties: this.state.allProperties,
            minPriceRangeValue: null,
            maxPriceRangeValue: null,
            showPriceRangeFilter: false
        });
    }

    render() {
        // console.log(44444);
        // console.log(this.state);
        // console.log(55555);
        return (
            <div>

                <Navbar history={this.props.history} />
                {/* <h3 className="listing-page-search-bar__heading">Search by City, University or Property</h3> */}
                {/* <div className="listing-page-search-bar">
                    <div className="listing-page-search-bar__subsection">
                        <SearchBar history={this.props.history} />
                    </div>
                </div> */}
                <ListingHeader studentAccomodation={this.props.location.state.studentAccomodation}
                    coliving={this.props.location.state.coliving}
                    history={this.props.history} text={this.state.text}
                    propertyLength={this.state.allProperties.length}
                    cityDescription={this.state.cityDescription}
                />
                <div className="row Hostel-listing-filter-wrapper">
                    <div className="col-lg-8">
                        <div className="row"
                        //  style={{marginTop:"2rem"}}
                        >
                            <span className="Hostel-listing-filters-title">Filter by:</span>
                            <div className="col-lg-10 Hostel-listing-filter-buttons-wrapper">
                                <div style={{ position: "relative" }} className="Hostel-listing-filters"
                                //  onClick={() => this.handleAccommodationTypeFilter()}
                                >
                                    <button className="Hostel-listing-filter-button" onClick={() => this.toggleRoomType()}>Accommodation</button>
                                    <div id="roomtype-box" style={this.state.showRoomTypeFilter ? { 'display': 'block' } : { 'display': 'none' }}
                                        className="neighbourHoodContainer">
                                        <div style={{ overflowY: "scroll" }}>
                                            {this.state.roomTypesFilter.map((roomName, i) => {
                                                return (
                                                    <li
                                                        key={i}
                                                        // onClick={() => this.updateNeighbourList(roomName)}
                                                        className="each-li-neighbourHood"><input style={{ display: "none" }}
                                                            className="hidden-xs-up cbx-main" id={roomName} type="checkbox" />
                                                        <label
                                                            onClick={() => this.updateRoomTypeList(roomName)}
                                                            className="cbx" htmlFor={roomName}
                                                        ></label>
                                                        <label
                                                            onClick={() => this.updateRoomTypeList(roomName)}
                                                            className="lbl" htmlFor={roomName}>{roomName}</label>
                                                    </li>
                                                )
                                            })}
                                        </div>
                                        <button className="neighbourhood-button" onClick={() => this.handleRoomTypeFilter()}>Apply</button>
                                    </div>
                                </div>
                                <div style={{ position: "relative" }} className="Hostel-listing-filters">
                                    <button className="Hostel-listing-filter-button" onClick={() => this.toggleNeighbourHood()}>Neighbourhood</button>
                                    <div id="neighbourhood-box" style={this.state.showNeighbourHoodFilter ? { 'display': 'block' } : { 'display': 'none' }}
                                        className="neighbourHoodContainer">
                                        <div style={{ overflowY: "scroll" }}>
                                            {this.state.neighbourHoodOptionsFilter.map((locality, i) => {
                                                return (
                                                    <li
                                                        key={i}
                                                        // onClick={() => this.updateNeighbourList(locality)}
                                                        className="each-li-neighbourHood"><input style={{ display: "none" }}
                                                            className="hidden-xs-up cbx-main" id={locality} type="checkbox" />
                                                        <label
                                                            onClick={() => this.updateNeighbourList(locality)}
                                                            className="cbx" htmlFor={locality}
                                                        ></label>
                                                        <label
                                                            onClick={() => this.updateNeighbourList(locality)}
                                                            className="lbl" htmlFor={locality}>{locality}</label>
                                                    </li>
                                                )
                                            })}
                                        </div>
                                        <button className="neighbourhood-button" onClick={() => this.handleNeighbourhoodFilter()}>Apply</button>
                                    </div>
                                </div>
                                <div style={{ position: "relative" }} className="Hostel-listing-filters">
                                    <button className="Hostel-listing-filter-button" onClick={() => this.togglePriceRange()}>Price Range</button>
                                    <div id="pricerange-box"
                                        style={this.state.showPriceRangeFilter ? { 'display': 'block' } : { 'display': 'none' }}
                                        className="priceRangeContainer">
                                        <div>
                                            {/* <div> */}
                                            {/* <p>Enter amount between ₹{this.state.priceRangeLowFilter} - ₹{this.state.priceRangeHighFilter}</p> */}
                                            <div className="form__group field">
                                                <input type="number" className="form__field" placeholder="From" name="fromAmount"
                                                    min={this.state.priceRangeLowFilter} max={this.state.priceRangeHighFilter}
                                                    defaultValue={this.state.priceRangeLowFilter}
                                                    id='fromAmount'
                                                    onChange={(e) => this.handlePriceChange(e, "min")}
                                                />
                                                <label htmlFor="fromAmount" className="form__label">From</label>
                                            </div>
                                            <div className="form__group field">
                                                <input type="number"
                                                    min={this.state.priceRangeLowFilter} max={this.state.priceRangeHighFilter}
                                                    defaultValue={this.state.priceRangeHighFilter}
                                                    className="form__field" placeholder="To" name="toAmount" id='toAmount'
                                                    onChange={(e) => this.handlePriceChange(e, "max")}
                                                />
                                                <label htmlFor="toAmount" className="form__label">To</label>
                                            </div>
                                            {/* resetPriceRange */}
                                            <button className="resetfilter-button" onClick={() => this.resetPriceRange()}>Reset</button>
                                            <button className="pricefilter-button" onClick={() => this.priceRangeFilterButton()}>Apply</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="Hostel-listing-filters">
                                    {this.props.location.state.studentAccomodation ?
                                        <button className="Hostel-listing-filter-button"
                                            onClick={() => this.toggleUniversity()}
                                        >University</button> : ''}
                                    <div id="university-box"
                                        style={this.state.showUniversityFilter ? { 'display': 'block' } : { 'display': 'none' }}
                                        className="neighbourHoodContainer">
                                        <div style={{ overflowY: "scroll" }}>
                                            {this.state.universityListFilter.map((university, i) => {
                                                return (
                                                    <li
                                                        key={i}
                                                        // onClick={() => this.updateNeighbourList(university)}
                                                        className="each-li-neighbourHood"><input style={{ display: "none" }}
                                                            className="hidden-xs-up cbx-main" id={university} type="checkbox" />
                                                        <label
                                                            onClick={() => this.updateUniversityList(university)}
                                                            className="cbx" htmlFor={university}
                                                        ></label>
                                                        <label
                                                            onClick={() => this.updateUniversityList(university)}
                                                            className="lbl" htmlFor={university}>{university}</label>
                                                    </li>
                                                )
                                            })}
                                        </div>
                                        <button className="neighbourhood-button" onClick={() => this.handleUniversityFilter()}>Apply</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <div className="col-lg-4">
                        <div className="Hostel-listing-sort-title">SORT BY: <span className="Hostel-listing-sort-content">Most Popular</span></div>

                    </div> */}
                </div>
                {
                    this.state.loading ? (
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
                                timeout={3000} //3 secs
                            />
                        </div>
                    ) : (

                            <div className="row Hostel-listing-header-cards">
                                {this.state.displayProperties && this.state.displayProperties.length > 0 ? this.state.displayProperties.map((el, i) => {
                                    return (
                                        <div className="col-lg-6 mb-3" key={i}>
                                            <HostelListingCard
                                                history={this.props.history}
                                                images={el.propertyImages}
                                                propertyName={el.propertyName}
                                                description={el.description}
                                                address={el.address}
                                                features={el.features}
                                                minimumCost={el.minimumCost}
                                                propertyId={el._id}
                                                offers={el.offers}
                                                fromDate={this.state.fromDate}
                                                toDate={this.state.toDate}
                                                studentId={this.props.studentId}
                                                roomTypeNames={el.roomTypeNames}
                                                isAvailable={el.isAvailable}
                                            />
                                        </div>
                                    )
                                }) : (
                                        <div>
                                            No properties found.
                                        </div>
                                    )}
                            </div>
                        )
                }
                <div className={this.state.displayProperties && this.state.displayProperties.length > 0 ? "Listing-footer" : "Listing-footer-none"}>
                    < Footer />
                </div>
            </div >
        )
    }
}
