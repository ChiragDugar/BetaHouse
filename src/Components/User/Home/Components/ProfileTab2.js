import React, { Component } from 'react'
import performRequest from '../../../PerformRequest'
import Resolved from '../../../../Assets/Resolved.png'
import Pending from '../../../../Assets/Pending.png'
import BookingHistory from '../../../../Assets/BookingHistory3.png'
import { saveAs } from 'file-saver';
import axios from 'axios';

export default class ProfileTab2 extends Component {

    constructor(props){
        super(props)
        this.state={
            studentId:localStorage.getItem("studentId"),
            // userDetails:{},
            // paymentStatus:"",
            // propertyDetails:{},
            // roomType:{},
            checkIn:"",
            checkOut:"",
            // totalCost:"",
            // discount:"",
            details:[]


        }
    }

    // handleAPI = () => {
    //     let path = "/student/booking/history"
    //     let method = "POST"
    //     let studentId = this.state.studentId
    //     console.log(studentId)
    //     let body = { studentId }
    //     let response = performRequest(path, method, body)
    //     response.then(res => {
    //         console.log(res)
    //         if(res.err === false)
    //         {
    //             this.setState({
    //                 details:res.details
    //             })
    //         }
    //     })
    // }

    // componentDidMount = () => {
    //     this.handleAPI();
    // }

    handleDates = (e) => {
        const dates = new Date(e)
        const day = dates.getDate().toString()
        const month = dates.getMonth()
        const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
        const year = dates.getFullYear().toString()
        const st = day + " " +  months[month] + " " + year;
        return st; 

    }

    handleReciept = (id) => {
        console.log(id);
        let path = "/billing/generate/invoice";
        let method = "POST";
        let body = { bookingId: id };

        let fileName;

        let response = performRequest(path, method, body);
        response
        .then(res => {
            let directory = res.data.filename;
            console.log(directory);
            let directR = directory.split('/');
            console.log(directR);
            fileName = directR[directR.length - 1];
            console.log("HERE",fileName);

            let fileSaved = 
                axios.post('https://backend.betahouse.co.in/billing/get/invoice',{ fileName: fileName },{ responseType: 'blob' });

            fileSaved.then(file => {
                console.log(file);
                const pdfBlob = new Blob([file.data], { type: 'application/pdf' });
                saveAs(pdfBlob, fileName);
            })

        })
        .catch(err => {
            alert(err);
        })

    }

    render() {
        return (
            <div>

                <div className="row User-profile-tab2-greeting-row">
                    <div className="col-lg-6">
                        <h2 className="User-profile-tab2-greeting">Let's take a look at your booking history, {localStorage.getItem("studentName")} </h2>
                    </div>
                    <div className="col-lg-6 user-profile-tab1-image">
                        <img src={BookingHistory} className="user-profile-bh-greeting-img" alt="userProfile" width="60%"/>
                    </div>
                    
                </div>      

                { this.props.details && this.props.details.length > 0 ? this.props.details.map((el,i) => { 
                    return(
                        <div>
                            <div className="card User-profile-booking-history-card-wrapper">
                            <h5 className="card-header"> { el.propertyId.propertyName } </h5>
                            <div className="card-body row">
                                <div className="col-lg-8 col-8">
                                    <p className="card-text User-profile-booking-history-texts"> <b>Room Type:</b> { el.selectedRoomType.roomTypeName }  </p>
                                    <p className="card-text User-profile-booking-history-texts" > <b>Total Cost:</b> { el.afterDiscountCost } </p>
                                    <p className="card-text User-profile-booking-history-texts"> <b> { this.state.checkIn = this.handleDates(el.checkInDate) } to { this.state.checkOut = this.handleDates(el.checkOutDate) } </b> </p>
                                    <button onClick={() => {this.handleReciept(el._id)}} className="User-profile-booking-history-download-reciept"><i className="fas fa-download"></i> &nbsp; Reciept</button>
                                </div>
                                {/* <p className="card-text">  </p> */}
                                <div className="col-lg-4 col-4 User-profile-booking-history-image-wrapper">
                                    { el.paymentStatus.toLowerCase() === "resolved" ? 
                                        ( <div>
                                            <img src={ Resolved } className="user-profile-bh-res-img" alt="resolved" width="66%" />
                                        </div> ) :
                                        (
                                            <img src={Pending} className="user-profile-bh-pen-img" alt="pending" width="63%"/>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                </div>

                    )
                }) : (
                    <div className="card User-profile-booking-history-card-wrapper-nbm">
                        <h3 className="card-header">No bookings made!</h3>
                        <div className="card-body">
                            <p className="card-text"> <a href="/">Book your perfect place now!</a> </p>
                        </div>
                    </div>
                )}
            </div>
        )
    }
}
