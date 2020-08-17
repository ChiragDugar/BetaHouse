import React, { Component } from 'react'
import performRequest from '../../../PerformRequest'

export default class Box1 extends Component {
    constructor(props){
        super(props)
        this.state = {
            data:0
        }
    }
    componentDidMount(){
        let id = localStorage.getItem('merchantId')
        let body = {
            "merchantId":id
        }
        let response = performRequest('/stats/overall/visitcount',"POST",body)
        response.then(res => {
            console.log(res)
            if(res.err === false){
                this.setState({
                    data:res.count
                })
            }
        })
    }
    render() {
        return (
            <div className=" Box1-container p-3">
                <div className="bg-dark border border-dark rounded p-2 text-white">
                    <div className="Box1-heading-container">
                        Visit Count
                    </div>
                    <div className="h1">{this.state.data}</div>
                </div>
                
            </div>
        )
    }
}
