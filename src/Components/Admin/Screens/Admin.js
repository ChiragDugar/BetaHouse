import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Navbar from '../../Navbars/adminNavbar'
import '../StyleSheets/admin.scss'
import AdminTab1 from '../Components/AdminTab1';
import AdminTab2 from '../Components/AdminTab2';
import AdminTab3 from '../Components/AdminTab3';
import Footer from '../../Footer';
import AdminDashboard from '../Components/AdminDashboard';
import AdminTab4 from '../Components/AdminTab4';

export default class Admin extends Component {
    render() {
    console.log(this.props.location.state.adminId)
        return (
            <div>
                <Navbar></Navbar>

                <div className="admin-tabs-wrapper">
                    <Tabs>
                        <TabList  className="text-center">
                            <Tab>Dashboard</Tab>
                            <Tab >Pending Merchants</Tab>
                            <Tab >Merchants List</Tab>
                            <Tab >Pending Payments</Tab>
                            <Tab>Payment History</Tab>
                        </TabList>

                        <TabPanel><AdminDashboard></AdminDashboard></TabPanel>
                        <TabPanel><AdminTab1></AdminTab1></TabPanel>
                        <TabPanel><AdminTab2></AdminTab2></TabPanel>
                        <TabPanel><AdminTab3 adminId={this.props.location.state.adminId}></AdminTab3></TabPanel>
                        <TabPanel> <AdminTab4></AdminTab4> </TabPanel>
                    </Tabs>
                </div>
                {/* <Footer/> */}
            </div>
        )
    }
}
