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
import '../StyleSheets/AdminTab3.scss'

export default class AdminTab3 extends Component {

    constructor(props){
        super(props)
        this.state={
            totalList : [],
            adminId: props.adminId,
            modeOfPayment: ''
        }
        console.log(this.state.adminId)
    }

    handleChange = (e) => {
        console.log(e.target.value)
        this.setState({
            modeOfPayment:e.target.value
        })
    }

    getMerchants = () => {
        let path = "/admin/admin/bookings/finance"
        let method = "POST"
        let body = {}
        let response = performRequest(path, method, body)
        response.then(res => {
            if(res.err === false)
            {
                console.log(res.data)
                this.setState({
                    totalList:res.data
                })
            }
        })
    }

    handleAPI = ( commissionEarned , amountPaid, merchantId ) => {
        console.log(commissionEarned , amountPaid, merchantId )
        let adminId = this.state.adminId
        let modeOfPayment = this.state.modeOfPayment
        if( modeOfPayment === '' )
        {
            alert("Please select the Mode of Payment")
        }
        else{
            // alert("Mode of Payment selected")
            let path = "/admin/admin/confirm/payment"
            let method = "POST"
            let body = { adminId, modeOfPayment, merchantId, amountPaid, commissionEarned }
            let response = performRequest(path, method, body)
            response.then(res => {
                if(res.changeStatus.err === false)
                {
                    alert(res.changeStatus.msg)
                    // console.log(res.changeStatus)
                    this.setState({
                        totalList:res.changeStatus.updatedList.data
                    })
                }
                else{
                    console.log(res)
                }
            })
        }
        
    }

    componentDidMount = () => {
        this.getMerchants()
    }

    render() {
        return (
            <div>
                <Accordion allowZeroExpanded={true}>
                { this.state.totalList && this.state.totalList.length > 0 ? this.state.totalList.map((el,i) => {
                return(
                    <AccordionItem>
                        <AccordionItemHeading>
                            <AccordionItemButton>
                                {el.merchantDetails[0].firstName + " " + el.merchantDetails[0].lastName}
                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                            <div className="row AdminTab3-details-wrapper">
                                <div className="col-lg-6">
                                    <p> <b>Name:</b> { " " + el.merchantDetails[0].firstName + " " + el.merchantDetails[0].lastName }</p>
                                    <p> <b>Email:</b> { " " + el.merchantDetails[0].email } </p>
                                    <p> <b>Phone Number:</b> { " " + el.merchantDetails[0].phoneNumber } </p>
                                    <p> <b>Commission Percentage:</b> { el.commission * 100 } </p>
                                </div>

                                <div className="col-lg-6">
                                    <table className="AdminTab3-amount-table">
                                        <thead className="AdminTab3-amt-table-row-head"> 
                                            <tr>
                                                <th className="AdminTab3-amt-table-col-head">Details</th>
                                                <th className="AdminTab3-amt-table-col-head">Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody className="AdminTab3-amt-table-body">
                                            <tr className="AdminTab3-amt-table-row-body">
                                                <td className="AdminTab3-amt-table-col-body">Total Merchant Commission Amount</td>
                                                <td className="AdminTab3-amt-table-col-body"> { el.totalMerchantCommissionAmount } </td>
                                            </tr>
                                            <tr className="AdminTab3-amt-table-row-body">
                                                <td className="AdminTab3-amt-table-col-body">Total Amount to return to merchant</td>
                                                <td className="AdminTab3-amt-table-col-body"> { el.totalAmountToReturnToMerchant } </td>
                                            </tr>
                                            <tr>
                                                <td className="AdminTab3-amt-table-col-body">Total</td>
                                                <td className="AdminTab3-amt-table-col-body"> { el.totalMerchantBookingAmount } </td>
                                            </tr>
                                            <tr>
                                                <td className="AdminTab3-amt-table-col-body">Mode of Payment: </td>
                                                <td className="AdminTab3-amt-table-col-body">
                                                    <select onChange={this.handleChange}>
                                                        <option value="choose">Choose an Option</option>
                                                        <option value="UPI">UPI</option>
                                                        <option value="NEFT">NEFT</option>
                                                        <option value="RTGS">RTGS</option>
                                                        <option value="Credit/Debit card">Credit/Debit Card</option>
                                                        <option value="Add wallet">Add Wallet</option>
                                                    </select>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan={3} className="AdminTab3-table-payment-row"><button className="AdminTab3-table-payment-button" onClick={ () => { this.handleAPI( el.totalMerchantCommissionAmount, el.totalAmountToReturnToMerchant, el._id ) } }>Pay</button></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <Accordion allowZeroExpanded={true}>
                                { el.allProperties && el.allProperties.length > 0 ? el.allProperties.map((e,j) => {
                                        return(
                                            <AccordionItem>
                                                <AccordionItemHeading>
                                                    <AccordionItemButton>
                                                        Property { j+1 }
                                                    </AccordionItemButton>
                                                    
                                                </AccordionItemHeading>
                                                <AccordionItemPanel>
                                                    <p> <b>Property Name:</b> { " " + e.propertyDetails[0].propertyName } </p>
                                                    <p> <b>Address:</b> { " " + e.propertyDetails[0].address } </p>
                                                    <p> <b>Total Property Booking Amount:</b> { " " + e.totalPropertyBookingAmount } </p>

                                                    <Accordion allowZeroExpanded={true}>
                                                        { e.bookings && e.bookings.length>0 ? e.bookings.map((item,k) => {
                                                            return(
                                                                // <AccordionItem>
                                                                //     <AccordionItemHeading>
                                                                    //     <AccordionItemButton>
                                                                    //         Bookings
                                                                    //     </AccordionItemButton>
                                                                //     </AccordionItemHeading>
                                                                //     <AccordionItemPanel>
                                                                //         <p> <b>Booking ID:</b> {" " + item.bookingId } </p>
                                                                //         <p> <b>Cost after Discount:</b> { " " + item.afterDiscountCost } </p>
                                                                //         <p> <b>Tax:</b> { " " + item.taxAmount } </p>
                                                                //     </AccordionItemPanel>
                                                                // </AccordionItem>
                                                                <div className="card AdminTab4-card-wrapper">
                                                                    <h5 className="card-header">Booking { k+1 }</h5>
                                                                    <div className="card-body Admin-Tab3-booking-cb" >
                                                                        <p> <b>Booking ID:</b> {" " + item.bookingId } </p>
                                                                        <p> <b>Cost after Discount:</b> { " " + item.afterDiscountCost } </p>
                                                                        <p> <b>Tax:</b> { " " + item.taxAmount } </p>
                                                                    </div>
                                                                </div>
                                                            )
                                                        }):(
                                                            <div className="card-header admin-tab1-card-header">
                                                                No Bookings to display here!
                                                            </div>
                                                        )}
                                                    </Accordion>

                                                </AccordionItemPanel>
                                            </AccordionItem>
                                        )
                                    }):(
                                        <div className="card-header admin-tab1-card-header">
                                            No properties to display here!
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
