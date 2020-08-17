import React from 'react'
import Doodle from '../../../../Assets/undraw_team_collaboration_8eoc.svg'
import DarkNavbar from '../../../Navbars/darkMerchantNavbar'

export default function analytics({history}) {
    return (
        <div>
            <DarkNavbar history={history}/>
            <div className="row mr-0 ml-0 p-5">
                <div className="col-lg-6" style={{height:'70vh'}}>
                    <div className="display-3 AddView-heading">Analytics</div>
                    <div className="h3 text-muted">You can check your statistics and your booking history</div>
                    <div style={{position:'relative', top:'40%', left:'50%', transform:'translate(-50%,-50%)'}}>
                        <div>
                            <button className="w-75 px-3 py-2 h2 AddView-btn" onClick={()=>history.push('/merchant/profile')}>BOOKING HISTORY</button>
                        </div>
                        <div className="">
                            <button className="w-75 px-3 py-2 h2 AddView-btn" onClick={()=>history.push('/merchant/analytics/stat')}>STATISTICS</button>
                        </div>
                    </div>
                </div>                  
                <div className="col-lg-6 col-md-12 text-center" style={{height:'70vh'}}>
                    <div style={{position:'relative', top:'55%', left:'50%', transform:'translate(-50%,-50%)'}} >
                        <div className="d-none d-lg-block">
                            <img src={Doodle} alt="Art" width="60%"/>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
