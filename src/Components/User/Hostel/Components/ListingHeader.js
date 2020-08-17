import React, { Component } from 'react'
// import Search from '../../../../Assets/Search.png'
// import HostelListingCarousel from './HostelListingCarousel'
// import HostelListingCard from './HostelListingCard'
// import HostelListingPaginating from './HostelListingPaginating'
import SearchBar from '../../Home/Components/SearchBar'
import '../Stylesheets/Listing.scss'

export default class ListingHeader extends Component {
    render() {
        return (
            <div className="Hostel-listing-header">
                <div className="row Hostel-listing-header-main-div">
                    <div className="col-lg-6 Hostel-listing-header-titles">
                        <div className="row Hostel-listing-header-title">{this.props.studentAccomodation ? "Student Accommodation" : "Coliving"} {this.props.text}</div>
                        <div className="row Hostel-listing-header-title__description">
                            {this.props.cityDescription}
                        </div>
                        <div className="row">{this.props.propertyLength} results found</div>
                    </div>
                    <div className="col-lg-6 Hostel-listing-header-search-bar">
                        <div className="row Hostel-listing-header-search-bar__row">
                            {/* <input type="text" placeholder="Search by University, City or Property" className="Hostel-listing-header-input px-4" /> */}
                            {/* <div className=" Hostel-listing-header-Button">
                                <img src={Search} alt="Logo" />
                            </div> */}
                            <SearchBar studentAccomodation={this.props.studentAccomodation} history={this.props.history} />
                        </div>

                    </div>
                    {/* <div className="listing-page-search-bar">
                        <div className="listing-page-search-bar__subsection">
                            <SearchBar history={this.props.history} />
                        </div>
                    </div> */}

                </div>

                {/* <div className="row Hostel-listing-filter-wrapper">
                    <div className="col-lg-8">
                        <div className="row">
                            <span className="Hostel-listing-filters-title">Filter by:</span>
                            <div className="col-lg-10 Hostel-listing-filter-buttons-wrapper">
                                <div className="Hostel-listing-filters">
                                    <button className="Hostel-listing-filter-button" >Accommodation Type</button>
                                </div>
                                <div className="Hostel-listing-filters">
                                    <button className="Hostel-listing-filter-button"  >Neighbourhood</button>
                                </div>
                                <div className="Hostel-listing-filters">
                                    <button className="Hostel-listing-filter-button"  >Price Range</button>
                                </div>
                                <div className="Hostel-listing-filters">
                                    <button className="Hostel-listing-filter-button"  >University</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4">
                        <div className="Hostel-listing-sort-title">SORT BY: <span className="Hostel-listing-sort-content">Most Popular</span></div>

                    </div>
                </div> */}



                {/* <div className="row Hostel-listing-header-cards">
                    <div className="col-lg-6">
                        <HostelListingCard />
                    </div>
                    <div className="col-lg-6">
                        <HostelListingCard />
                    </div>
                </div> */}

                {/* <div>
                    <HostelListingPaginating />
                </div> */}
            </div>
        )
    }
}
