import React, { Component } from 'react'
import performRequest from '../../PerformRequest'
import '../StyleSheets/AdminTab4.scss'

export default class AdminTab4 extends Component {

    constructor(props){
        super(props)
        this.state = {
            fullList:[],
        }
    }

    handleAPI = () => {
        let path = "/admin/admin/payment/history"
        let method = "POST"
        let body = {}
        let response = performRequest(path, method, body)
        response.then(res => {
            if (res.err === false)
            {
                console.log(res)
                this.setState({
                    fullList:res.getBookings
                })
                console.log(this.state.fullList)
            }
            else{
                console.log(res)
            }
        })
    }

    handleDates = (e) => {
        const dates = new Date(e)
        const day = dates.getDate().toString()
        const month = dates.getMonth()
        const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
        const year = dates.getFullYear().toString()
        const st = day + " " +  months[month] + " " + year;
        return st; 

    }

    handleTime = (e) => {
        var time = e.split('T')[1]
        console.log(time)
        // const i=0
        var t = ""
        for(var i=0;i<8;i++)
        {
            t = t + time[i]
        }
        return t
    }

    componentDidMount = () => {
        this.handleAPI();
    }

    render() {
        return (
            <div>
                { this.state.fullList && this.state.fullList.length > 0 ? this.state.fullList.map( (el,i) => {
                    return(
                        <div className="card AdminTab4-card-wrapper">
                            {/* <h5 className="card-header">{ el.merchantId.firstName + " " + el.merchantId.lastName }</h5> */}
                            <div className="row AdminTab3-details-wrapper card-body">
                                <div className="col-lg-6">
                                    <p> <b>Name:</b> { " " + el.merchantId.firstName + " " + el.merchantId.lastName }</p>
                                    <p> <b>Email:</b> { " " + el.merchantId.email } </p>
                                    <p> <b>Phone Number:</b> { " " + el.merchantId.phoneNumber } </p>
                                    <p> <b>Commission Percentage:</b> { el.merchantId.commission * 100 } </p>
                                    <p> <b>Payment done on : </b> { this.handleDates(el.created_at) + " at " + this.handleTime(el.created_at) } </p>
                                    <p> <b>Paid by : </b> { el.adminId.firstName } </p>
                                </div>

                                <div className="col-lg-6 AdminTab4-amount-table-wrapper">
                                    <table className="AdminTab3-amount-table">
                                        <thead className="AdminTab3-amt-table-row-head"> 
                                            <tr>
                                                <th className="AdminTab3-amt-table-col-head">Details</th>
                                                <th className="AdminTab3-amt-table-col-head">Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody className="AdminTab3-amt-table-body">
                                            <tr className="AdminTab3-amt-table-row-body">
                                                <td className="AdminTab3-amt-table-col-body">Amount Paid to Merchant</td>
                                                <td className="AdminTab3-amt-table-col-body"> { el.amountPaid } </td>
                                            </tr>
                                            <tr className="AdminTab3-amt-table-row-body">
                                                <td className="AdminTab3-amt-table-col-body">Commission Earned</td>
                                                <td className="AdminTab3-amt-table-col-body"> { el.commissionEarned } </td>
                                            </tr>
                                            <tr>
                                                <td className="AdminTab3-amt-table-col-body">Total</td>
                                                <td className="AdminTab3-amt-table-col-body"> { el.amountPaid + el.commissionEarned } </td>
                                            </tr>
                                            <tr>
                                                <td className="AdminTab3-amt-table-col-body">Mode of Payment: </td>
                                                <td className="AdminTab3-amt-table-col-body"> { el.modeOfPayment } </td>
                                            </tr>
                                            <tr>
                                                <td colSpan={3} className="AdminTab4-table-payment-row">Paid &nbsp; <i className="fas fa-check-circle"></i> </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )
                 } ):(
                    <div className="card-header admin-tab1-card-header">
                        No Payment history to display here!
                    </div>
                 ) }

                
            </div>
        )
    }
}
