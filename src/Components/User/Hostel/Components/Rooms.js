import React, { Component } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import '../Stylesheets/Rooms.scss';
import RoomBox from './RoomBox';


export default class Rooms extends Component {
    constructor(props) {
        super(props)
        this.state = {
            roomTypes: this.props.roomTypes,
            fromDate: this.props.fromDate,
            toDate: this.props.toDate
        }
    }
    componentDidMount() {
        console.log(this.props.roomTypes);
        this.setState({
            roomTypes: this.props.roomTypes
        })
    }
    render() {
        return (
            <div>
                <p className="Rooms-p1">Book Your Room</p>
                <Tabs>
                    <TabList className="text-uppercase mb-0 HostelDetails-Tablist">
                        <Tab className="HostelDetails-Tab pb-0 mb-0">ALL</Tab>
                        {/* <Tab className="HostelDetails-Tab pb-0 mb-0">Studio Flat</Tab>
                        <Tab className="HostelDetails-Tab pb-0 mb-0">Private Room</Tab>
                        <Tab className="HostelDetails-Tab pb-0 mb-0">Shared Room</Tab> */}
                    </TabList>
                </Tabs>
                <div className="Rooms-line m-auto"></div>
                {/* <p className="Rooms-p2">Shared Room<small className="Rooms-small">(2 types to choose from)</small></p> */}
                {
                    this.state.roomTypes !== null
                        ? (
                            this.state.roomTypes && this.state.roomTypes.map((item, i) =>
                                <RoomBox features={this.props.features} additionalFeatures={this.props.additionalFeatures} key={i} roomTypes={item} fromDate={this.state.fromDate} toDate={this.state.toDate} history={this.props.history} studentId={this.props.studentId} />
                            )
                        ) : (
                            <div></div>
                        )
                }

            </div>
        )
    }
}
