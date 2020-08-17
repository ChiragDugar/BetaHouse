import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// USER
import Home from './Components/User/Home/Screens/Home';
import Login from './Components/User/Authentication/Screens/Login'
import ForgotPass from '../src/Components/User/Authentication/Screens/ForgotPass'
import OtpVerify from '../src/Components/User/Authentication/Screens/OtpVerify'
import NewPass from '../src/Components/User/Authentication/Screens/NewPass'
import SignUp from './Components/User/Authentication/Screens/SignUp'
import Listing from './Components/User/Hostel/Screens/Listing';
import VerifyOtp from '../src/Components/User/Authentication/Screens/VerifyOtp'
import Overview from './Components/User/Hostel/Screens/Overview';
import Profile from './Components/User/Home/Screens/Profile';
import BookingHistory from './Components/User/Home/Screens/BookingHistory';
import TandC from './Components/User/About Us/Screens/TandC'
import Careers from './Components/User/Careers/Screens/Careers'
import AboutUs from './Components/User/Careers/Screens/AboutUs'
import ContactUs from './Components/User/Careers/Screens/Contact'
import ListingDetails from './Components/User/Hostel/Screens/ListingDetails';


// MERCHANT
import Mhome from './Components/Merchant/Mhome/Screens/Mhome';
import Mlogin from './Components/Merchant/Mauthentication/Screens/Mlogin'
import MsignUp from './Components/Merchant/Mauthentication/Screens/MsignUp'
import ComingSoon from './Components/ComingSoon';
import AddView from './Components/Merchant/Add Property/Screens/AddView'
import AddProp1 from './Components/Merchant/Add Property/Screens/AP1'
import AddRoom from './Components/Merchant/AddRoom/Screen/AR1'
import ViewProp from './Components/Merchant/ViewProperty/Screens/ViewProp';
import ViewRooms from './Components/Merchant/ViewProperty/Screens/ViewRooms';
import Stat from './Components/Merchant/Stats/Screen/Stat';
import MerchantProfile from './Components/Merchant/Profile/Screens/profile'
import Analytics from './Components/Merchant/Stats/Screen/analytics'
// import HostelDetails from './Components/User/Hostel/Components/HostelDetails';

import './App.scss';

//Admin
import Admin from './Components/Admin/Screens/Admin'
import AdminLogin from './Components/Admin/Screens/AdminLogin';


class App extends Component {
  componentDidMount() {
    window.addEventListener("resize", (e) => {
      // console.log(window.innerWidth);
    })
  }
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>

            {/* USER */}
            <Route exact path="/" component={Home} />
            <Route exact path="/user/login" component={Login} />
            <Route exact path="/user/signup" component={SignUp} />
            <Route exact path="/user/ForgotPass" component={ForgotPass} />
            <Route exact path="/user/NewPass" component={NewPass} />
            <Route exact path="/user/OtpVerify" component={OtpVerify} />
            <Route exact path="/user/listing" component={Listing} />
            <Route exact path="/user/listing/detail/:detail" component={ListingDetails} />
            <Route exact path="/user/overview" component={Overview} />
            <Route exact path="/user/profile" component={Profile} />
            <Route exact path="/user/profile/bookingHistory" component={BookingHistory} />
            <Route exact path="/user/VerifyOtp" component={VerifyOtp} />
            <Route exact path="/user/termsandconditions" component={TandC} />
            <Route exact path="/user/careers" component={Careers} />
            <Route exact path="/user/aboutus" component={AboutUs} />
            <Route exact path="/user/contactus" component={ContactUs} />


            {/* MERCHANT */}
            <Route exact path="/merchant" component={Mhome} />
            <Route exact path="/merchant/login" component={Mlogin} />
            <Route exact path="/merchant/signup" component={MsignUp} />
            <Route exact path="/merchant/dashboard" component={AddView} />
            <Route exact path="/merchant/dashboard/addProperty" component={AddProp1} />
            <Route exact path="/merchant/dashboard/addRoom" component={AddRoom} />
            <Route exact path="/merchant/dashboard/viewProperty" component={ViewProp} />
            <Route exact path="/merchant/dashboard/viewProperty/studentAccom" component={ViewProp} />
            <Route exact path="/merchant/dashboard/viewProperty/coLiving" component={ViewProp} />
            <Route exact path="/merchant/dashboard/viewRoom" component={ViewRooms} />
            <Route exact path="/merchant/analytics" component={Analytics} />
            <Route exact path="/merchant/analytics/stat" component={Stat} />
            <Route exact path="/merchant/profile" component={MerchantProfile} />

            {/* ADMIN */}
            <Route exact path="/admin" component={AdminLogin} />
            <Route exact path="/admin/details" component={Admin} />
            {/* <Route exact path="/merchant/dashboard/addProperty2" component={AddProp1} /> */}
            <Route path="*" component={ComingSoon} />

          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
