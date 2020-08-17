import React, { Component } from 'react'
import '../Stylesheets/SignUp.scss'
import PerformRequest from '../../../PerformRequest'
import Footer from '../../../Footer'
import Navbar from '../../../Navbars/darkNavbar'


class SignUp extends Component {

    constructor(props) {
        super(props)
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            password: '',
            dob: '',
            address: '',
            gender: 'male',
            checkBox: false,
            countryCode: '91'
        }
    }

    handleValidate = () => {
        let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        if (!re.test(this.state.email)) {
            alert('Oops! Invalid Email')
            return false
        }
        if (this.state.firstName.length === 0) {
            alert("Oops! Please enter your name.")
        }
        if (this.state.phoneNumber.length < 0 || this.state.email.length < 0) {
            alert('Oops! Looks like you left something.')
            return false
        }
        if (this.state.phoneNumber.length !== 10) {
            alert('Oops! Invalid Phone Number')
            return false
        }
        if (this.state.password.length < 8) {
            alert('Oops! Password should be atleast 8 characters.')
            return false
        }
        if (this.state.gender === "notselected") {
            alert("Oops! Please select a gender.")
        }
        else {
            return true
        }
    }


    handleAPI = () => {
        console.log(this.state)
        if (this.state.checkBox === false) {
            alert("Please accept the Terms and Conditions to continue!")
        }
        else if (this.handleValidate() === true) {
            let path = "/auth/student"
            let method = "POST"
            let body = this.state
            let response = PerformRequest(path, method, body)
            response
                .then(res => {
                    console.log(res);
                    if (res.err === false && this.state.checkBox === true) {
                        alert("Successfully Signed Up!")
                        this.props.history.push({
                            pathname: '/user/VerifyOtp',
                            state: {
                                firstName: this.state.firstName,
                                lastName: this.state.lastName,
                                email: this.state.email,
                                phoneNumber: this.state.phoneNumber,
                                password: this.state.password,
                                dob: this.state.dob,
                                address: this.state.address,
                                gender: this.state.gender,
                                otpId: res.otp._id,
                                studentId: res.details._id
                            }
                        })
                    }
                    else
                        alert(res.msg)
                })
                .catch(err => {
                    alert(err);
                })
        }

    }

    handleChange = (e) => {
        let lhs = e.target.name
        let rhs = e.target.value
        this.setState({ [lhs]: rhs })
    }

    handleCheckBox = (e) => {
        this.setState({ checkBox: e.target.checked })
    }


    render() {
        return (
            <div>
                <Navbar />
                <div className="SignUp-main-div" >
                    <div className="SignUp-main-inner1" >
                    </div>
                    <div className="SignUp-main-inner2" >
                        <div className="SignUp-text1 mb-4 mt-4" >
                            REGISTER HERE TO FIND YOUR
                            <br />
                            COMFORTABLE STUDENT ACCOMODATION
                        </div>
                        <div className="SignUp-main-inner2-sub1" >

                            <div>
                                <input type="text" onChange={this.handleChange} className="SignUp-input" name="firstName" placeholder="First Name" />
                                <input type="text" onChange={this.handleChange} className="SignUp-input" name="lastName" placeholder="Last Name" />
                            </div>

                            <div>
                                <input type="text" onChange={this.handleChange} className="SignUp-input" name="email" placeholder="E-mail" />
                                {/* <input type="text" onChange={this.handleChange} className="SignUp-input" name="phoneNumber" placeholder="Mobile Number" /> */}
                                {/* <select value={this.state.gender} onChange={this.handleChange} name="gender" id="gender" className="OverviewLeftPane-input">
                                    <option value="Gender">Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select> */}

                                <select value={this.state.countryCode} onChange={this.handleChange} name="countryCode" id="countryCode" className="OverviewLeftPane-input OverviewLeftPane-input-code-no SignUp-select" style={{ width: '4rem' }} >
                                    <option value="91" selected > 91</option>
                                    <option value="61"> 61</option>
                                    <option value="213"> 213</option>
                                    <option value="376"> 376</option>
                                    <option value="244"> 244</option>
                                    <option value="1264"> 1264</option>
                                    <option value="1268"> 1268</option>
                                    <option value="54"> 54</option>
                                    <option value="374"> 374</option>
                                    <option value="297"> 297</option>
                                    <option value="43"> 43</option>
                                    <option value="994"> 994</option>
                                    <option value="1242"> 1242</option>
                                    <option value="973"> 973</option>
                                    <option value="880"> 880</option>
                                    <option value="1246"> 1246</option>
                                    <option value="375"> 375</option>
                                    <option value="32"> 32</option>
                                    <option value="501"> 501</option>
                                    <option value="229"> 229</option>
                                    <option value="1441"> 1441</option>
                                    <option value="975"> 975</option>
                                    <option value="591"> 591</option>
                                    <option value="387">  387</option>
                                    <option value="267"> 267</option>
                                    <option value="55"> 55</option>
                                    <option value="673"> 673</option>
                                    <option value="359"> 359</option>
                                    <option value="226">  226</option>
                                    <option value="257"> 257</option>
                                    <option value="855"> 855</option>
                                    <option value="237"> 237</option>
                                    <option value="1"> 1</option>
                                    <option value="238">238</option>
                                    <option value="1345">1345</option>
                                    <option value="236">236</option>
                                    <option value="56"> 56</option>
                                    <option value="86"> 86</option>
                                    <option value="57"> 57</option>
                                    <option value="269"> 269</option>
                                    <option value="242"> 242</option>
                                    <option value="682">  682</option>
                                    <option value="506">506</option>
                                    <option value="385"> 385</option>
                                    <option value="53"> 53</option>
                                    <option value="90392">90392</option>
                                    <option value="357">357</option>
                                    <option value="42">42</option>
                                    <option value="45"> 45</option>
                                    <option value="253"> 253</option>
                                    <option value="1809"> 1809</option>
                                    <option value="1809">  1809</option>
                                    <option value="593"> 593</option>
                                    <option value="20"> 20</option>
                                    <option value="503">503</option>
                                    <option value="240"> 240</option>
                                    <option value="291"> 291</option>
                                    <option value="372"> 372</option>
                                    <option value="251"> 251</option>
                                    <option value="500">  500</option>
                                    <option value="298"> 298</option>
                                    <option value="679"> 679</option>
                                    <option value="358"> 358</option>
                                    <option value="33"> 33</option>
                                    <option value="594">594</option>
                                    <option value="689"> 689</option>
                                    <option value="241"> 241</option>
                                    <option value="220"> 220</option>
                                    <option value="7880"> 7880</option>
                                    <option value="49"> 49</option>
                                    <option value="233"> 233</option>
                                    <option value="350"> 350</option>
                                    <option value="30"> 30</option>
                                    <option value="299"> 299</option>
                                    <option value="1473"> 1473</option>
                                    <option value="590"> 590</option>
                                    <option value="671"> 671</option>
                                    <option value="502"> 502</option>
                                    <option value="224"> 224</option>
                                    <option value="245"> 245</option>
                                    <option value="592"> 592</option>
                                    <option value="509"> 509</option>
                                    <option value="504"> 504</option>
                                    <option value="852">852</option>
                                    <option value="36"> 36</option>
                                    <option value="354"> 354</option>
                                    <option value="62"> 62</option>
                                    <option value="98"> 98</option>
                                    <option value="964"> 964</option>
                                    <option value="353"> 353</option>
                                    <option value="972"> 972</option>
                                    <option value="39"> 39</option>
                                    <option value="1876"> 1876</option>
                                    <option value="81"> 81</option>
                                    <option value="962"> 962</option>
                                    <option value="7"> 7</option>
                                    <option value="254"> 254</option>
                                    <option value="686"> 686</option>
                                    <option value="850">  850</option>
                                    <option value="82">  82</option>
                                    <option value="965"> 965</option>
                                    <option value="996"> 996</option>
                                    <option value="856"> 856</option>
                                    <option value="371"> 371</option>
                                    <option value="961"> 961</option>
                                    <option value="266"> 266</option>
                                    <option value="231"> 231</option>
                                    <option value="218"> 218</option>
                                    <option value="417"> 417</option>
                                    <option value="370"> 370</option>
                                    <option value="352"> 352</option>
                                    <option value="853"> 853</option>
                                    <option value="389"> 389</option>
                                    <option value="261"> 261</option>
                                    <option value="265"> 265</option>
                                    <option value="60"> 60</option>
                                    <option value="960"> 960</option>
                                    <option value="223"> 223</option>
                                    <option value="356"> 356</option>
                                    <option value="692">692</option>
                                    <option value="596"> 596</option>
                                    <option value="222"> 222</option>
                                    <option value="269"> 269</option>
                                    <option value="52"> 52</option>
                                    <option value="691"> 691</option>
                                    <option value="373"> 373</option>
                                    <option value="377"> 377</option>
                                    <option value="976"> 976</option>
                                    <option value="1664"> 1664</option>
                                    <option value="212"> 212</option>
                                    <option value="258"> 258</option>
                                    <option value="95"> 95</option>
                                    <option value="264"> 264</option>
                                    <option value="674"> 674</option>
                                    <option value="977"> 977</option>
                                    <option value="31"> 31</option>
                                    <option value="687">687</option>
                                    <option value="64">64</option>
                                    <option value="505"> 505</option>
                                    <option value="227"> 227</option>
                                    <option value="234"> 234</option>
                                    <option value="683"> 683</option>
                                    <option value="672"> 672</option>
                                    <option value="670">670</option>
                                    <option value="47"> 47</option>
                                    <option value="968"> 968</option>
                                    <option value="680"> 680</option>
                                    <option value="507"> 507</option>
                                    <option value="675"> 675</option>
                                    <option value="595"> 595</option>
                                    <option value="51"> 51</option>
                                    <option value="63"> 63</option>
                                    <option value="48"> 48</option>
                                    <option value="351"> 351</option>
                                    <option value="1787"> 1787</option>
                                    <option value="974"> 974</option>
                                    <option value="262"> 262</option>
                                    <option value="40"> 40</option>
                                    <option value="7"> 7</option>
                                    <option value="250"> 250</option>
                                    <option value="378">378</option>
                                    <option value="239"> 239</option>
                                    <option value="966">966</option>
                                    <option value="221"> 221</option>
                                    <option value="381"> 381</option>
                                    <option value="248"> 248</option>
                                    <option value="232">232</option>
                                    <option value="65"> 65</option>
                                    <option value="421">421</option>
                                    <option value="386"> 386</option>
                                    <option value="677">677</option>
                                    <option value="252"> 252</option>
                                    <option value="27"> 27</option>
                                    <option value="34"> 34</option>
                                    <option value="94"> 94</option>
                                    <option value="290"> 290</option>
                                    <option value="1869"> 1869</option>
                                    <option value="1758">1758</option>
                                    <option value="249"> 249</option>
                                    <option value="597"> 597</option>
                                    <option value="268"> 268</option>
                                    <option value="46"> 46</option>
                                    <option value="41"> 41</option>
                                    <option value="963"> 963</option>
                                    <option value="886"> 886</option>
                                    <option value="7"> 7</option>
                                    <option value="66"> 66</option>
                                    <option value="228"> 228</option>
                                    <option value="676"> 676</option>
                                    <option value="1868">1868</option>
                                    <option value="216"> 216</option>
                                    <option value="90"> 90</option>
                                    <option value="7"> 7</option>
                                    <option value="993"> 993</option>
                                    <option value="1649">1649</option>
                                    <option value="688"> 688</option>
                                    <option value="256"> 256</option>
                                    <option value="44"> 44</option>
                                    <option value="380"> 380</option>
                                    <option value="971"> 971</option>
                                    <option value="598"> 598</option>
                                    <option value="1"> 1</option>
                                    <option value="7"> 7</option>
                                    <option value="678"> 678</option>
                                    <option value="379"> 379</option>
                                    <option value="58"> 58</option>
                                    <option value="84"> 84</option>
                                    <option value="84">1284</option>
                                    <option value="84">1340</option>
                                    <option value="681">681</option>
                                    <option value="969">969</option>
                                    <option value="967">967</option>
                                    <option value="260"> 260</option>
                                    <option value="263"> 263</option>
                                </select>
                                {/* <input value={this.state.codeNumber} onChange={this.handleChange} type="number" className="OverviewLeftPane-input OverviewLeftPane-input-code-no col-3" name="codeNumber" placeholder="Code Number" /> */}
                                <input value={this.state.phoneNumber} onChange={this.handleChange} type="text" name="phoneNumber" id="phoneNumber" placeholder="Phone Number" className="SignUp-input SignUp-input-mobile" />
                            </div>

                            <div>
                                <input type="password" onChange={this.handleChange} className="SignUp-input" name="password" placeholder="Password" />
                                <input type="date" onChange={this.handleChange} className="SignUp-input" name="dob" placeholder="Date of Birth" />
                            </div>

                            <div style={{ display: 'flex' }} >
                                <input type="text" onChange={this.handleChange} className="SignUp-input" name="address" placeholder="Address" />
                                <select value={this.state.gender} name="gender" onChange={this.handleChange} className="SignUp-input-gender" >
                                    <option value="male" default>Male</option>
                                    <option value="female">Female</option>
                                    <option value="others">Others</option>
                                </select>
                                {/* <input type="text" onChange={this.handleChange} className="SignUp-input" name="gender" placeholder="Gender" /> */}
                            </div>

                        </div>
                        <div className="SignUp-footer-text" >
                            <div className="SignUp-footer-text-1" >
                                <input type="checkbox" className="SignUp-checkbox" onChange={this.handleCheckBox} />
                            </div>
                            <div className="SignUp-footer-text-2">
                                I have read and agree to the terms and conditions.
                            </div>
                        </div>
                        <div> <button className="SignUp-button" id="SignUp-button" onClick={this.handleAPI}  >CREATE ACCOUNT</button></div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}

export default SignUp