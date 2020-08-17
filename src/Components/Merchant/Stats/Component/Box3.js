import React, { Component } from 'react'
import performRequest from '../../../PerformRequest'

export default class Box1 extends Component {
    constructor(props){
        super(props)
        this.state = {
            bookingCount:0
        }
    }

    componentDidMount(){
        let token = localStorage.getItem('merchantId')
        performRequest('/merchant/bookings/history','POST',{merchantId:token})
            .then((res)=>{
                console.log(res)
                let total = 0
                if(res.length>0){
                    res[0].allProperties.map((item)=>{
                        total+=item.bookings.length
                    })
                    this.setState({
                        bookingCount:total
                    })
                }
            })
    }

    render() {
        return (
            <div className=" Box1-container p-3">
                <div className="bg-dark text-white border border-dark rounded p-2">
                    <div className="Box1-heading-container ">
                        Total Number of Bookings
                    </div>
                    <div className="h1">{this.state.bookingCount}</div>
                </div>
                
            </div>
        )
    }
}
