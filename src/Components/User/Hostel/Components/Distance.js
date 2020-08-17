import React, { Component } from 'react'
import '../Stylesheets/Distance.scss'
// import mapboxgl from 'mapbox-gl';
// import { Map, GoogleApiWrapper } from 'google-maps-react';
import ReactMapboxGl from "react-mapbox-gl"
import { Marker } from "react-mapbox-gl";
// import { Popup } from "react-mapbox-gl";

// mapboxgl.accessToken = 'pk.eyJ1IjoieWFzaGJhaWQiLCJhIjoiY2thOGt4NTNyMGR2YTJybzNwa245bm02OCJ9.sTPUvOwNOqAAWd-M88JlZg';

const Map = ReactMapboxGl({
    accessToken: "pk.eyJ1IjoieWFzaGJhaWQiLCJhIjoiY2thOGt4NTNyMGR2YTJybzNwa245bm02OCJ9.sTPUvOwNOqAAWd-M88JlZg"
  });

export default class Distance extends Component {

    constructor(props) {
        super(props);
            this.state = {
                lng: this.props.propertyLong,
                lat: this.props.propertyLat,
                zoom: 15,
                center:[this.props.propertyLong,this.props.propertyLat],
                address:this.props.address
            };
    }

    // componentDidMount() {
    //     const map = new mapboxgl.Map({
    //         container: this.mapContainer,
    //         style: 'mapbox://styles/mapbox/streets-v11',
    //         center: [this.state.lng, this.state.lat],
    //         zoom: this.state.zoom
    //     });
    //     }

    render() {
        return (
            <div>
                <p className="Distance-p1">MAP LOCATION</p>
                {/* <select className="Distance-Drop">
                    <option>Select University</option>
                </select> */}
                {/* <Map
                className="Distance-Maps"
                google={this.props.google}
                zoom={8}
                initialCenter={{ lat: 47.444, lng: -122.176}}
                /> */}
                {/* <div className="row Listing-details-map">
                    <div ref={el => this.mapContainer = el} className="mapContainer" />
                </div> */}

                    <Map 
                        style="mapbox://styles/mapbox/streets-v8"
                        center = {this.state.center}
                        zoom = {[13]}
                        className = "mapContainer"
                    >
                        <Marker
                            coordinates={[this.state.lng, this.state.lat]}
                            anchor="bottom">
                            <div className="Distance-Map-Marker">
                                <i className="fas fa-map-marker-alt"></i>
                            </div>
                        </Marker> 

                        {/* <Popup
                            coordinates={[this.state.lng, this.state.lat]}
                            
                            anchor="right"
                        >
                            <p>{this.state.address}</p>
                        </Popup>   */}
                    </Map>

            </div>
        )
    }
}
