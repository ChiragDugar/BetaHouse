import React, { Component } from 'react'
import performRequest from '../../../PerformRequest'


export default class table extends Component {
    constructor(props){
        super(props)
        this.state={
            show:false
        }
    }
    
    componentDidMount(){
        let token = localStorage.getItem('merchantId')
        let path = "/stats/overall/discountcoupons"
        let method = "POST"
        let body = {
            merchantId:token
        }
        const response = performRequest(path,method,body)
        response.then(res => {
            console.log(res)
            if(res.err === false){
            }
            else{
                alert(res.msg)
            }
        })
    }


    render() {
        return (
            <div>
               <div className="h4">Total Discounts Used</div>
                <div className="Table-Input">
                    <span className="text-danger text-center small">*Input Fields are optional</span>
                    <div className="px-2 w-100">
                        <input type="text" name="fromDate" id="fromDate" placeholder="From Date. Eg: 2020/02/02" className="w-75 p-1"/>
                    </div>
                    <div className="px-2 w-100">
                        <input type="text" name="toDate" id="toDate" placeholder="To Date. Eg: 2014/02/14" className="w-75 p-1"/>
                    </div>
                </div>

            </div>
        )
    }
}
