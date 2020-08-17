import React, { Component } from 'react'
import performRequest from '../../../PerformRequest'

export default class Box1 extends Component {
    constructor(props){
        super(props)
        this.state= {
            totalAmt : 0
        }
    }

    componentDidMount(){
        let token  = localStorage.getItem('merchantId')
        performRequest('/stats/overall/revenueyearly','POST',{merchantId:token})
            .then((res)=>{
                console.log(res)
                let total = 0
                if(res.length>0){
                    res.totalAmount.map((item)=>{
                        total+=item.totalAmount
                    })
                    this.setState({
                        totalAmt:total
                    })
                }
            })
    }
    render() {
        return (
            <div className=" Box2-container p-3">
                <div className="bg-dark border border-dark rounded p-2 text-white">
                    <div className="Box1-heading-container ">
                        Total Revenue
                    </div>
                    <div className="h1">Rs.{this.state.totalAmt}</div>
                </div>
            </div>
        )
    }
}
