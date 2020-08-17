import React, { Component } from 'react'
import WifiIcon from '../../../../Assets/Asset 39.png'
import LaundryIcon from '../../../../Assets/Asset 36.png'
import CommonRoomIcon from '../../../../Assets/Asset 33.png'
import CinemaRoomIcon from '../../../../Assets/Asset 38.png'
import VendingIcon from '../../../../Assets/Asset 35.png'
import GymIcon from '../../../../Assets/Asset 32.png'
import GamesIcon from '../../../../Assets/Asset 37.png'
import BikeIcon from '../../../../Assets/Asset 34.png'

var allFeatures = {
    "WiFi": WifiIcon,
    "On-Site Laundry Facilities": LaundryIcon,
    "Common Room": CommonRoomIcon,
    "Cinema Room": CinemaRoomIcon,
    "Vending Machine": VendingIcon,
    "Gym": GymIcon,
    "Games Room": GamesIcon,
    "Bike": BikeIcon
}
var additionalFeatures = []

export default class Feature extends Component {


    state = {
        features: [],
        additionalFeatures: []
    }

    constructor(props) {
        super(props)
        this.state = {
            features: this.props.features,
            additionalFeatures: this.props.additionalFeatures
        }
    }

    componentDidMount() {
        this.state.features.map(element => {
            if (allFeatures.hasOwnProperty(element)) {
                console.log(element, allFeatures[element])
            }
            else {
                this.setState({
                    additionalFeatures: [...this.state.additionalFeatures, element]
                })
            }
        })
    }

    render() {
        return (
            <div>
                <div className="HostelDetails-property-heading text-uppercase mb-3">
                    Features
                </div>
                <div className="row py-2">
                    {this.state && this.state.features && this.state.features.length > 0 && this.state.features.map(el => {
                        if (allFeatures.hasOwnProperty(el)) {
                            let x = allFeatures[el]
                            console.log(x)
                            return (
                                <div className="col-4 py-2">
                                    <img key={x} src={x} alt={x} />
                                    <div className="HostelDetails-Feature-content">
                                        {el}
                                    </div>
                                </div>)
                        }
                    })}



                </div>
                <div className="row" >
                    {
                        this.state && this.state.additionalFeatures && this.state.additionalFeatures.length > 0 && this.state.additionalFeatures.map(el => {
                            return (
                                <div className="col-4 py-2 HostelDetails-Feature-content">
                                    {el}
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}
