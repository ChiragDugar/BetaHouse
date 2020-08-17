import React, { Component } from 'react'
import performRequest from '../../../PerformRequest'

export default class Mhome5 extends Component {
    constructor(props){
        super(props)
        this.state={
            query:""
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange = (e) => {
        let text = e.target.value
        this.setState({
            query: text
        },()=>{
            console.log(this.state.query)
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        let {query } = this.state
        if(query){
            performRequest('/merchant/bookings/issues/query','POST',{message:query})
                .then((res)=>{
                    if(res.err === false){
                        this.setState({
                            query:""
                        })
                        alert(res.msg)
                        
                    }
                    else{
                        alert(res.msg)
                    }
                })
        }
        else{
            alert("Tell us your query")
        }
    }

    render() {
        return (
            <div className="Mhome5-container text-left">
                <div className="ml-0 Mhome5-sub-container">
                    <div className="Mhome5-heading-container d-block">
                        <h4 className="MHome5-heading text-uppercase">
                            Need help?
                        </h4>
                    </div>
                    <div className="Mhome5-content-container text-left">
                        <p className="MHome5-content">
                            Fill in your query and get in touch with the Betahouse team
                        </p>
                    </div>
                    <div className="Mhome5-input-container mb-4">
                        <textarea name="contact" id="contact" className="Mhome5-input" cols="30" rows="10" onChange={this.handleChange} value={this.state.query}></textarea>
                    </div>
                    <button type="submit" className="Mhome5-btn text-uppercase px-3 py-1" onClick={this.handleSubmit}>Submit</button>
                </div>
            </div>
        )
    }
}
