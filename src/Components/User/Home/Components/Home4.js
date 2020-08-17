import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import React, { Component } from 'react'
import Carousel from './Carousel'
import PerformRequest from '../../../PerformRequest'


export default class Home4 extends Component {


    state = {
        propsList: null,
        received: false,
        toDate: new Date()
    }

    componentWillMount() {
        let path = "/property/getfeaturelist"
        let method = "POST"
        let body = {}
        let response = PerformRequest(path, method, body)
        response
            .then(res => {
                if (res.err === false) {
                    this.setState({
                        propsList: res.result,
                        received: true
                    })
                    console.log("!!!PPP", res);
                }
                else {
                    alert("No list available.")
                }
            })
    }

    render() {
        if (this.state.propsList !== undefined && this.state.propsList !== null && this.state.propsList.length !== 0) {
            return (
                <div className="Home4-container">
                    <div className="Home4-Heading text-center">Featured Properties On Beta House</div>
                    <div className="text-center">
                        <Tabs>
                            <TabList>
                                <Tab className="Home4-tab">Coliving</Tab>
                                {/* <Tab className="react-tabs-2 Home4-tab">Accomodation</Tab> */}
                                <Tab className="Home4-tab">Student Accomodation</Tab>
                            </TabList>

                            <TabPanel>
                                <Carousel history={this.props.history} propsList={this.state.propsList} value="coLiving" />
                                {this.state.propsList.coLiving.length === 0 ? "NO PROPERTIES" : ""}
                            </TabPanel>
                            <TabPanel>
                                <Carousel history={this.props.history} propsList={this.state.propsList} value="studentAccom" />
                                {this.state.propsList.studentAccom.length === 0 ? "NO PROPERTIES" : ""}
                            </TabPanel>
                        </Tabs>
                    </div>
                    <div className="Home4-Paragraph">
                        {/* Betahouse has the most comfortable student accommodation and co-living places in India And Australia! Browse through our verified student accommodation and Co-living properties, picked exclusively for our user's comfort. Each accommodation featured on our website has been selected by accommodation experts based on its proximity to essential amenities and keeping in mind the convenience of our users. Be assured to find an accommodation around universities, the city centre, and other popular areas of town. And if you have need help We’re here to make life easier, hit us up with through the contact section or just leave us a message on our live chat and we shall get someone to assist you right away! */}
                    </div>
                </div>
            )
        }
        else {
            return (
                <div>
                    Nothing to display
                </div>
            )
        }
    }
}
