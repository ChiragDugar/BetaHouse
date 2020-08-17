import React, { Component } from 'react'
import DarkNavbar from '../../../Navbars/darkMerchantNavbar'
import Card from '../Components/viewPropCard'
import Footer from '../../../Footer'
import performRequest from '../../../PerformRequest'
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';

export default class ViewProp extends Component {
    constructor(props){
        super(props)
        this.state = {
            properties:null,
            merchantId:null,
            propertiesCoLiving:[],
            propertiesStudentAccom:[]
        }
    }
    componentDidMount(){
        // console.log(this.props.location.state.merch_id)
        let token  = localStorage.getItem('merchantId')
        let path = "/property/view/byMerchant"
        let method = "POST"
        let body = {
            merchantId: token
        }
        let response = performRequest(path,method,body)
        response.then(res => {
            // console.log(res)
            if(res.err == false){
                console.log(res.properties)
                this.setState({
                    properties:res.properties
                })
                res.properties.map((item)=>{
                    if(item.propertyType == "coLiving"){
                        this.setState({
                            propertiesCoLiving:[...this.state.propertiesCoLiving,item]
                        })
                    }
                    else{
                        this.setState({
                            propertiesStudentAccom:[...this.state.propertiesStudentAccom,item]
                        })
                    }
                })
                console.log(this.state)
            }
            else {
                alert(res.msg)
            }
        })
    }

    render() {
        return (
            <div>
                <div>
                    <DarkNavbar history={this.props.history}/>
                </div>
                <div className="mt-2">

                        <div style={{position:'absolute',right:'1rem', zIndex:1,}}>
                            <div className=" px-3 py-2 text-center border border-dark text-white ViewProp-btn"  
                                onClick={()=>{
                                    this.props.history.push('/merchant/dashboard/addProperty')
                                }}>
                                <span>
                                    Add Property
                                </span>
                            </div>
                        </div>
                        <Tabs>
                            <TabList className="pt-4 text-center mb-0 mt-0" style={{ fontFamily: "Crimson Text",letterSpacing:'0.2rem',textTransform:'uppercase',fontWeight:'bold'}}>
                                <Tab>Co-Living</Tab>
                                <Tab>Student Accomodation</Tab>
                            </TabList>

                        <div className="min-vh-100 mx-4 border border-bottom-0 bg-light">
                            <TabPanel>
                                <div className="Hostel-listing-header-cards row">
                                {
                                    this.state.propertiesCoLiving !== null ? 
                                        (
                                            this.state.propertiesCoLiving.map(item => 
                                            <div className="col-lg-6 col-md-12">
                                            <Card
                                                    history={this.props.history}
                                                    images={item.propertyImages}
                                                    propertyName={item.propertyName}
                                                    description={item.description}
                                                    address={item.address}
                                                    features={item.features}
                                                    propertyId={item._id}
                                                    merch_id = {this.props.location.state.merch_id}
                                                    latitude = {item.location[0]}
                                                    longitude = {item.location[1]}
                                                    universities={item.universities}
                                            />
                                            </div>
                                            )

                                        ):(
                                        <div className="m-auto p-5">
                                            No properties available
                                            
                                        </div>
                                    )
                                }
                            </div>
                            </TabPanel>
                            <TabPanel>
                                <div className="Hostel-listing-header-cards row">
                                {
                                    this.state.propertiesStudentAccom !== null ? 
                                        (
                                            this.state.propertiesStudentAccom.map(item => 
                                            <div className="col-lg-6 col-md-12">
                                            <Card
                                                    history={this.props.history}
                                                    images={item.propertyImages}
                                                    propertyName={item.propertyName}
                                                    description={item.description}
                                                    address={item.address}
                                                    features={item.features}
                                                    propertyId={item._id}
                                                    merch_id = {this.props.location.state.merch_id}
                                                    latitude = {item.location[0]}
                                                    longitude = {item.location[1]}
                                                    universities={item.universities}
                                            />
                                            </div>
                                            )

                                        ):(
                                        <div className="m-auto p-5">
                                            No properties available
                                            
                                        </div>
                                    )
                                }
                                </div>
                            </TabPanel>
                        </div>
                        {this.state.properties !== null ?(
                            <div>
                                <Footer/>
                            </div>
                        ):(
                            <div className="fixed-bottom">
                                <Footer/>
                            </div>
                        )}
                        </Tabs>
                    </div>
                </div>
        )
    }
}
