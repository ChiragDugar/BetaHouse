import React, { Component } from 'react'

export default class Mhome4 extends Component {
    render() {
        return (
            <div className="Mhome4-container">
                <div className="row">
                    <div className="col-7 Mhome4-titles">
                        <div className="row">Ready to share your Happy Place?</div>
                        <div className="row">Create your listing now!</div> 
                    </div>

                    <div className="col-5 Mhome4-button-container" onClick = {()=>this.props.history.push('/merchant/signup')}>
                        <button className="Mhome4-button">REGISTER NOW</button>
                    </div>
                </div>
            </div>
        )
    }
}
