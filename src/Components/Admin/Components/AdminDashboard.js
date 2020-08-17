import React, { Component } from 'react'
import '../StyleSheets/AdminDashboard.scss'
import performRequest from '../../PerformRequest'
import AdminDashboardOne from './AdminDashboardOne'
import AdminDashboardTwo from './AdminDashboardTwo'
import AdminDashboardThree from './AdminDashboardThree'
import AdminDashboard4 from './AdminDashboard4'
import AdminDashboard5 from './AdminDashboard5'

export default class AdminDashboard extends Component {

    constructor(props){
        super(props)
        this.state = { 
            cityName:"",
            countryName:"",
            localities:[],
            localityValue:""
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    addLocality = (e) => {
        e.preventDefault()
        if(this.state.localityValue !== "")
        {
            let localities = [...this.state.localities, this.state.localityValue]
            this.setState({
                localities,
                localityValue:""
            })
            // console.log(this.state.localityValue)
            // console.log(localities)
        }
        else{
            alert("Please enter a locality name!")
        }
        
    }

    deleteLocality = (el) => {
        el = el.toLowerCase()
        const localities = this.state.localities.filter(item => {
            item = item.toLowerCase()
            return el !== item
        })
        this.setState({
            localities
        })
    }

    addCity = () => {
        if(this.state.cityName !== "" && this.state.countryName !== "" && this.state.localities && this.state.localities.length > 0 )
        {
            // alert("All fields added")
            let path = "/admin/misc/addnewcity"
            let method = "POST"
            let body = this.state
            let response = performRequest(path, method, body)
            response.then(res => {
                if(res.err === false)
                {
                    alert(res.msg)
                    this.setState({
                        cityName:"",
                        countryName:"",
                        localities:[]
                    })
                    window.location.reload()
                }
                else{
                    alert(res.msg)
                }
            })

        }
        else{
            alert("Please add all the fields")
        }
    }


    render() {
        return (
            <div>
                <div className="row justify-content-around">
                    <div className="col-lg-6 ">
                        <div className="admin-dashboard-add-city-wrapper">
                            <div className="row">
                                <h3 className="col admin-dashboard-add-city-heading">Add City</h3>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <input value={this.state.cityName} onChange={this.handleChange}  type="text" name="cityName" id="cityName" placeholder="Add City" className="OverviewLeftPane-input" />
                                </div> 
                                <div className="col">
                                    <input value={this.state.countryName} onChange={this.handleChange} type="text" name="countryName" id="countryName" placeholder="Add Country" className="OverviewLeftPane-input" />
                                </div>
                            </div>
                            <form onSubmit={this.addLocality}>
                                <div className="row">
                                    <div className="col-lg-9">
                                        <input onChange={this.handleChange} value={this.state.localityValue}  type="text" name="localityValue" id="localityValue" placeholder="Add locality" className="OverviewLeftPane-input" />
                                    </div>
                                    <div className="col-lg-3 admin-dashboard-add-loc-button-wrapper">
                                        <button className="admin-dashboard-add-loc-button" onClick={this.addLocality}>Add Locality</button>
                                    </div>
                                </div>
                            </form>
                            <div className="row">
                                { this.state.localities && this.state.localities.length > 0 ? this.state.localities.map((el,i) => {
                                    return(
                                        
                                        <div className="admin-dashboard-locality-display"> &nbsp; { el } &nbsp; <span onClick = { () => this.deleteLocality(el) } className="admin-dashboard-locality-delete-cross" >X</span> &nbsp; &nbsp; </div> 

                                    )
                                }) : (
                                    // <div className="admin-dashboard-locality-display">There are no localities added yet.</div>
                                    <div></div>
                                ) }
                            </div>
                            <div className="row">
                                <div className="col">
                                    <button onClick={this.addCity} className="admin-dashboard-add-city-button" >SUBMIT</button> 
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 admin-dashboard-add-uni-wrapper">
                        <AdminDashboardOne></AdminDashboardOne>
                    </div>
                </div>
                <div className="row justify-content-around ">
                    <div className="col-lg-6 ">
                        <div className="admin-dashboard-update-loc-wrapper">
                            <AdminDashboardTwo></AdminDashboardTwo>
                        </div>
                    </div>
                    <div className="col-lg-6 admin-dashboard-del-city-wrapper-col">
                        <div className="admin-dashboard-del-city-wrapper">
                            <AdminDashboardThree></AdminDashboardThree>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-around">
                    <div className="col-lg-6">
                        <div className="admin-dashboard-update-feature-wrapper">
                            <AdminDashboard4></AdminDashboard4>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="admin-dashboard-update-feature-wrapper">
                            <AdminDashboard5></AdminDashboard5>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
