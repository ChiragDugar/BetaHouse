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
import performRequest from '../../../PerformRequest';
import '../Stylesheets/MerchantProfile.scss'
import Switch from "react-switch";



export default class AdminTab2 extends Component {

    constructor(props){
        super(props)
        this.state={
            propertyList : [],
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
                        propertyList:res.merchants 
                    });
            })
        }
        else{
            console.log("FALSE")
        }      
    }

    componentDidMount = () => {
        let token  = localStorage.getItem('merchantId')
        let path = "/merchant/bookings/history"
        let method = "POST"
        let body = {
            merchantId:token
        }
        let response = performRequest(path, method, body)
        response.then(res=>{
            console.log(res)
            // console.log(res[0].allProperties)0
            if(res.length>0){
                this.setState({
                    propertyList:res[0].allProperties
                })
            }
        })
        
    }

    render() {
        return (
            <div className="my-5 mx-5 py-4">
                <h4 className="text-center py-3">List of Booking History</h4>
                <Accordion allowZeroExpanded={true}>
                { this.state.propertyList && this.state.propertyList.length > 0 ? this.state.propertyList.map((el,i) => {
                    return(
                    <AccordionItem>
                        <AccordionItemHeading>
                            <AccordionItemButton>
                                <b>{el.propertyDetails[0].propertyName}</b>
                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                            <p><b>Address: </b> { " " + el.propertyDetails[0].address }</p>
                            <p><b>Enabled: </b> { " " + el.propertyDetails[0].enabled }</p>
                            <p><b>Universities: </b> { " " + el.propertyDetails[0].universities }</p>
                            <p><b>Total Property Booking Amount: </b> { " " + el.totalPropertyBookingAmount }</p>
                            <Accordion allowZeroExpanded={true}>
                                { el.bookings && el.bookings.length > 0 ? el.bookings.map((e,j) => {
                                        return(
                                            <AccordionItem>
                                                <AccordionItemHeading>
                                                    <AccordionItemButton className="row AdminTab2-Accordian-item-button">
                                                        Booking { j+1 }
                                                    </AccordionItemButton>
                                                </AccordionItemHeading>
                                                <AccordionItemPanel>
                                                    <p><b>Booking Id</b>: { " " + e.bookingId } </p>
                                                    <p><b>Money Transfered To Merchant</b>: { " " + e.moneyTransferedToMerchant } </p>
                                                    <p><b>Tax Amount</b>: { " " + e.taxAmount } </p>
                                                    <p><b>After Discount Cost</b>: { " " + e.afterDiscountCost } </p>
                                                </AccordionItemPanel>
                                            </AccordionItem>
                                        )
                                    }):(
                                        <p className="AdminTab2-Accordian-item-button">No properties!</p>
                                    )
                                }
                            </Accordion>
                        </AccordionItemPanel>
                    </AccordionItem>
                    )}) : (
                        <div className="AdminTab2-Accordian-item-button">No Properties</div>
                    )
                }
                    
                </Accordion>
            </div>
        )
    }
}
