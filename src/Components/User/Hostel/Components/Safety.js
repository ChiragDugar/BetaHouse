import React, { Component } from 'react'
import CCTVIcon from '../../../../Assets/Asset 45.png'
import SecureDoorEntryIcon from '../../../../Assets/Asset 42.png'
import SecurityIcon from '../../../../Assets/Asset 44.png'
import OnsiteIcon from '../../../../Assets/Asset 43.png'

export default class Safety extends Component {
    render() {
        return (
            <div className="Safety-Main mb-4">
                <div className="HostelDetails-property-heading text-uppercase mb-4">
                    Safety    
                </div>
                <div className="row  py-2">
                    <div className="col">
                        <img src={CCTVIcon} alt="CCTV"/>
                        <div className="HostelDetails-Feature-content">
                            CCTV
                        </div>
                    </div>
                    <div className="col">
                        <img src={SecureDoorEntryIcon} alt="Secure Door Entry"/>
                        <div className="HostelDetails-Feature-content">
                            Secure Door Entry
                        </div>
                    </div>
                    <div className="col">
                        <img src={SecurityIcon} alt="24-hour security"/>
                        <div className="HostelDetails-Feature-content">
                            24-hour security
                        </div>
                    </div>
                </div> 
                <div className="row py-2">
                    <div className="col-4">
                        <img src={OnsiteIcon} alt="Onsite maintenance"/>
                        <div className="HostelDetails-Feature-content">
                            Onsite maintenance
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
