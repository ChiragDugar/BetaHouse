import React, { Component } from 'react'
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
 
// Demo styles, see 'Styles' section below for some notes on use.
import 'react-accessible-accordion/dist/fancy-example.css';
import performRequest from '../../PerformRequest';
import '../StyleSheets/AdminTab2.scss'
import Switch from "react-switch";



export default class AdminTab2 extends Component {

    constructor(props){
        super(props)
        this.state={
            merchantList : [],
            checked: false 
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(id,enabled ) {
        // this.setState({ 
        //     checked:!this.state.checked 
        // });
        var toggle = window.confirm("Are you sure you want to Enable/Disable the property?")
        if(toggle === true)
        {
            let path = "/admin/property/changepropertystatus"
            let method = "POST"
            let propertyId = id
            let status = !enabled
            let body = { propertyId, status }
            let response = performRequest(path,method,body)
            response.then(res => {
                console.log(res)
                this.setState({ 
                        merchantList:res.merchants 
                    });
            })
        }
        else{
            console.log("FALSE")
        }      
    }

    getMerchants = () => {
        let path = "/admin/property/getmerchants"
        let method = "POST"
        let body = {}
        let response = performRequest(path, method, body)
        response.then(res=>{
            if(res.err === false)
            {
                console.log(res.msg)
                this.setState({
                    merchantList:res.merchants
                })
            }
            else
            {
                console.log(res.err)
            }
        })
    }

    componentDidMount = () => {
        console.log("Entereddd")
        this.getMerchants()
    }

    render() {
        return (
            <div>
                <Accordion allowZeroExpanded={true}>
                { this.state.merchantList && this.state.merchantList.length > 0 ? this.state.merchantList.map((el,i) => {
                    return(
                    <AccordionItem>
                        <AccordionItemHeading>
                            <AccordionItemButton>
                                {el.firstName + " " + el.lastName}
                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                            <p> <b>Name:</b> { " " + el.firstName + " " + el.lastName }</p>
                            <p> <b>Email:</b> { " " + el.email } </p>
                            <p> <b>Phone Number:</b> { " " + el.phoneNumber } </p>
                            <Accordion allowZeroExpanded={true}>
                                { el.propertyDetails && el.propertyDetails.length > 0 ? el.propertyDetails.map((e,j) => {
                                        return(
                                            <AccordionItem>
                                                <AccordionItemHeading>
                                                    <AccordionItemButton className="row AdminTab2-Accordian-item-button">
                                                        
                                                            <div className="AdminTab2-property-header col-lg-8">Property { j+1 }</div>
                                                            <div className="AdminTab2-switch-wrapper col-lg-4">
                                                                <Switch
                                                                    onChange={ () =>  {this.handleChange(e._id , e.enabled)}}
                                                                    checked={e.enabled}
                                                                    height={20}
                                                                    width={40}
                                                                    className="Admin-tab2-react-switch"
                                                                />
                                                            </div>
                                                        
                                                    </AccordionItemButton>
                                                    
                                                </AccordionItemHeading>
                                                <AccordionItemPanel>
                                                    <p> <b>Property Name:</b> { " " + e.propertyName } </p>
                                                    <p> <b>Address:</b> { " " + e.address } </p>
                                                    <p> <b>Description:</b> { " " + e.description } </p>
                                                    <p> <b>Location:</b> { " " + e.location } </p>
                                                </AccordionItemPanel>
                                            </AccordionItem>
                                        )
                                    }):(
                                        <div className="card-header admin-tab1-card-header">
                                            No Properties to display here!
                                        </div>
                                    )
                                }
                            </Accordion>
                        </AccordionItemPanel>
                    </AccordionItem>
                    )}) : (
                        <div className="card-header admin-tab1-card-header">
                            Nothing to display here!
                        </div>
                    )
                }
                    
                </Accordion>
            </div>
        )
    }
}
