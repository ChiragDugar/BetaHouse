import React, { Component } from 'react'
import '../StyleSheets/AdminTab1.scss'
import PerformRequest from '../../PerformRequest'


export default class AdminTab1 extends Component {

    constructor(props){
        super(props);
        this.state={
            // name:'',
            // email:'',
            // phone:'',
            // address:'',
            // gender:'',
            // status:'',
            merchantList:[]
        }
    }

    getMerchants = () => {
        let path = "/admin/list/pending-status"
        let method = "POST"
        let body = {}
        let response = PerformRequest(path, method, body)
        response.then(res => {
            if(res.err === false)
            {
                console.log(res.list)
                this.setState({
                    merchantList : res.list
                })
            }
        })
    }

    handleAccept = (id) => {
        console.log('Hello')
        let acceptConfirmation = window.confirm("Are you sure you want to accept the Merchant?")
        if(acceptConfirmation === true)
        {
            let commissionValue = prompt("Please Enter the comission to be charged in percentage","5")
            commissionValue = parseInt(commissionValue)
            if(isNaN(commissionValue))
            {
                alert("Merchant not accepted")
            }
            else{
                console.log(commissionValue)
                let type = "accept"
                let merchantId = id
                let path = "/auth/merchant/changeStatus"
                let method = "POST"
                let body = { type , merchantId, commissionValue }
                let response = PerformRequest(path,method,body)
                response.then(res => {
                    if(res.err === false)
                    {
                        console.log(res)
                        if(res.getList.err === false && res.addCommission.err === false)
                        {
                            alert(res.addCommission.msg + " Successfully")
                            this.setState({
                                merchantList : res.getList.list
                            })
                        }
                        
                    }
                })
            }
        }
        else
        {
            console.log("FALSEACCEPT")
        }
    }

    handleReject = (id) => {
        console.log('Hello')
        let rejectConfirmation = window.confirm("Are you sure you want to reject the Merchant?")
        if(rejectConfirmation === true)
        {
            let commissionValue = 0
            commissionValue = parseInt(commissionValue)
            let type = "reject"
            let merchantId = id
            let path = "/auth/merchant/changeStatus"
            let method = "POST"
            let body = { type , merchantId, commissionValue }
            let response = PerformRequest(path,method,body)
            response.then(res => {
                if(res.err === false)
                {
                    console.log(res)
                    if(res.getList.err === false )
                    {
                        alert(res.msg)
                        this.setState({
                            merchantList : res.getList.list
                        })
                    }
                    
                }
            })
        }
        else{
            console.log("REJECTFALSSEE")
        }
    }

    componentDidMount = () => {
        this.getMerchants();
    }

    render() {
        return (
            <div>
                    { this.state.merchantList && this.state.merchantList.length > 0 ? this.state.merchantList.map((el,i) => {
                        return (
                         <div>
                            <div className="card AdminTab4-card-wrapper">
                                <div className="card-header admin-tab1-card-header">
                                    Merchant Details
                                </div>
                                <div className="card-body">
                                    <p className="card-text"> <b>Name:</b> &nbsp; { el.firstName + " " + el.lastName } </p>
                                    <p className="card-text"> <b>Email:</b> &nbsp; { el.email }</p>
                                    <p className="card-text"> <b>Phone Number:</b> &nbsp; { el.phoneNumber }</p>
                                    <p className="card-text"> <b>Address:</b> &nbsp; { el.address }</p>
                                    <p className="card-text"> <b>Gender:</b> &nbsp; { el.gender } </p>
                                    <p className="card-text"> <b>Status:</b> &nbsp; { el.status } </p>
                                    <p className="card-text">
                                        <i className="fas fa-check admin-tab1-tick" onClick = { () => {this.handleAccept(el._id)} } ></i> &nbsp;&nbsp;&nbsp;&nbsp;
                                        <i className="fas fa-times admin-tab1-cross" onClick = { () => {this.handleReject(el._id)} } ></i>
                                    </p>
                                </div>
                            </div>
                        </div>

                    )
                    }):(
                        <div className="card-header admin-tab1-card-header">
                            No pending merchants for approval!
                        </div>
                    )
                    }
                
            </div>
        )
    }
}
