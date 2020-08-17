import React, { Component } from 'react'
import LocationIcon from '../../../../Assets/Asset 41.png'
import Feature from './Feature'
// import Nationality from './Nationality'


export default class overviewLeftPane extends Component {
    constructor(props) {
        super(props)
        console.log("PROPS", props)
        this.state = {
            propertyName: this.props.data.propertyName,
            propertyAddress: this.props.data.propertyAddress,
            firstName: this.props && this.props.set && this.props.set.firstName ? this.props.set.firstName : '',
            lastName: this.props && this.props.set && this.props.set.lastName ? this.props.set.lastName : '',
            email: this.props && this.props.set && this.props.set.email ? this.props.set.email : '',
            contactNumber: this.props && this.props.set && this.props.set.contactNumber ? this.props.set.contactNumber : '',
            dateOfBirth: this.props && this.props.set && this.props.set.dateOfBirth ? this.props.set.dateOfBirth : '',
            nationality: this.props && this.props.set && this.props.set.nationality ? this.props.set.nationality : '',
            country: this.props && this.props.set && this.props.set.country ? this.props.set.country : '',
            city: this.props && this.props.set && this.props.set.city ? this.props.set.city : '',
            postalCode: this.props && this.props.set && this.props.set.postalCode ? this.props.set.postalCode : '',
            gender: this.props && this.props.set && this.props.set.gender ? this.props.set.gender : '',
            address: this.props && this.props.set && this.props.set.address ? this.props.set.address : '',
            whereDidYouHearAboutUs: this.props && this.props.set && this.props.set.whereDidYouHearAboutUs ? this.props.set.whereDidYouHearAboutUs : '',
            codeNumber: this.props.set && this.props.set.codeNumber ? this.props.set.codeNumber : '91',
        }
    }

    handleChange = (e) => {
        console.log(e.target.value);
        this.setState({
            [e.target.name]: e.target.value,
        })
        this.props.handleForm(e)
    }

    render() {
        return (
            <div>
                <div className="OverviewLeftPane-about-container my-4">
                    <div className="OverviewLeftPane-about-heading-container">
                        <h4 className="OverviewLeftPane-heading">
                            {this.state.propertyName}
                        </h4>
                    </div>
                    <div className="HostelDetails-line m-auto"></div>
                    <div className="HostelDetails-address-container mt-3 row mb-4">
                        <div className="text-center col-1">
                            <img src={LocationIcon} alt="Location" />
                        </div>
                        <h4 className="HostelDetails-address col-7">
                            {this.state.propertyAddress}
                        </h4>
                    </div>
                    <div>
                        <Feature features={this.props.data.features} additionalFeatures={this.props.data.additionalFeatures} />
                    </div>
                </div>


                <div className="OverviewLeftPane-heading-container">
                    <h4 className="OverviewLeftPane-heading-main mb-0">
                        READY TO BOOK?
                    </h4>
                    <p className="OverviewLeftPane-subHeading">
                        Lets get to know you a little better!
                    </p>
                </div>
                <div className="OverviewLeftPane-input-container">
                    <div className="row">
                        <div className="col">
                            <input value={this.state.firstName} onChange={this.handleChange} type="text" name="firstName" id="fname" placeholder="First Name" className="OverviewLeftPane-input" />
                        </div>
                        <div className="col">
                            <input value={this.state.lastName} onChange={this.handleChange} type="text" name="lastName" id="lname" placeholder="Last Name" className="OverviewLeftPane-input" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <input value={this.state.email} onChange={this.handleChange} type="text" name="email" id="email" placeholder="Email" className="OverviewLeftPane-input" />
                        </div>
                        <div className="col">
                            {/* <input value={this.state.codeNumber} onChange={this.handleChange} type="number" className="OverviewLeftPane-input OverviewLeftPane-input-code-no col-3" name="codeNumber" placeholder="Code Number" /> */}
                            <select value={this.state.countryCode} onChange={this.handleChange} name="codeNumber" id="countryCode" className="OverviewLeftPane-input OverviewLeftPane-input-code-no col-3 no-padding-right" >
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
                            <input value={this.state.contactNumber} onChange={this.handleChange} type="text" name="contactNumber" id="phoneNumber" placeholder="Phone Number" className="OverviewLeftPane-input col-9" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <input value={this.state.dateOfBirth} onChange={this.handleChange} type="text" onFocus={(e) => e.target.type = 'date'} onBlur={(e) => e.target.type = 'text'} name="dateOfBirth" id="DOB" placeholder="Date of Birth" className="OverviewLeftPane-input" />
                        </div>
                        <div className="col">
                            <select value={this.state.nationality} onChange={this.handleChange} name="nationality" className="OverviewLeftPane-input">
                                <option value="">Nationality</option>
                                <option value="afghan">Afghan</option>
                                <option value="albanian">Albanian</option>
                                <option value="algerian">Algerian</option>
                                <option value="american">American</option>
                                <option value="andorran">Andorran</option>
                                <option value="angolan">Angolan</option>
                                <option value="antiguans">Antiguans</option>
                                <option value="argentinean">Argentinean</option>
                                <option value="armenian">Armenian</option>
                                <option value="australian">Australian</option>
                                <option value="austrian">Austrian</option>
                                <option value="azerbaijani">Azerbaijani</option>
                                <option value="bahamian">Bahamian</option>
                                <option value="bahraini">Bahraini</option>
                                <option value="bangladeshi">Bangladeshi</option>
                                <option value="barbadian">Barbadian</option>
                                <option value="barbudans">Barbudans</option>
                                <option value="batswana">Batswana</option>
                                <option value="belarusian">Belarusian</option>
                                <option value="belgian">Belgian</option>
                                <option value="belizean">Belizean</option>
                                <option value="beninese">Beninese</option>
                                <option value="bhutanese">Bhutanese</option>
                                <option value="bolivian">Bolivian</option>
                                <option value="bosnian">Bosnian</option>
                                <option value="brazilian">Brazilian</option>
                                <option value="british">British</option>
                                <option value="bruneian">Bruneian</option>
                                <option value="bulgarian">Bulgarian</option>
                                <option value="burkinabe">Burkinabe</option>
                                <option value="burmese">Burmese</option>
                                <option value="burundian">Burundian</option>
                                <option value="cambodian">Cambodian</option>
                                <option value="cameroonian">Cameroonian</option>
                                <option value="canadian">Canadian</option>
                                <option value="cape verdean">Cape Verdean</option>
                                <option value="central african">Central African</option>
                                <option value="chadian">Chadian</option>
                                <option value="chilean">Chilean</option>
                                <option value="chinese">Chinese</option>
                                <option value="colombian">Colombian</option>
                                <option value="comoran">Comoran</option>
                                <option value="congolese">Congolese</option>
                                <option value="costa rican">Costa Rican</option>
                                <option value="croatian">Croatian</option>
                                <option value="cuban">Cuban</option>
                                <option value="cypriot">Cypriot</option>
                                <option value="czech">Czech</option>
                                <option value="danish">Danish</option>
                                <option value="djibouti">Djibouti</option>
                                <option value="dominican">Dominican</option>
                                <option value="dutch">Dutch</option>
                                <option value="east timorese">East Timorese</option>
                                <option value="ecuadorean">Ecuadorean</option>
                                <option value="egyptian">Egyptian</option>
                                <option value="emirian">Emirian</option>
                                <option value="equatorial guinean">Equatorial Guinean</option>
                                <option value="eritrean">Eritrean</option>
                                <option value="estonian">Estonian</option>
                                <option value="ethiopian">Ethiopian</option>
                                <option value="fijian">Fijian</option>
                                <option value="filipino">Filipino</option>
                                <option value="finnish">Finnish</option>
                                <option value="french">French</option>
                                <option value="gabonese">Gabonese</option>
                                <option value="gambian">Gambian</option>
                                <option value="georgian">Georgian</option>
                                <option value="german">German</option>
                                <option value="ghanaian">Ghanaian</option>
                                <option value="greek">Greek</option>
                                <option value="grenadian">Grenadian</option>
                                <option value="guatemalan">Guatemalan</option>
                                <option value="guinea-bissauan">Guinea-Bissauan</option>
                                <option value="guinean">Guinean</option>
                                <option value="guyanese">Guyanese</option>
                                <option value="haitian">Haitian</option>
                                <option value="herzegovinian">Herzegovinian</option>
                                <option value="honduran">Honduran</option>
                                <option value="hungarian">Hungarian</option>
                                <option value="icelander">Icelander</option>
                                <option value="indian">Indian</option>
                                <option value="indonesian">Indonesian</option>
                                <option value="iranian">Iranian</option>
                                <option value="iraqi">Iraqi</option>
                                <option value="irish">Irish</option>
                                <option value="israeli">Israeli</option>
                                <option value="italian">Italian</option>
                                <option value="ivorian">Ivorian</option>
                                <option value="jamaican">Jamaican</option>
                                <option value="japanese">Japanese</option>
                                <option value="jordanian">Jordanian</option>
                                <option value="kazakhstani">Kazakhstani</option>
                                <option value="kenyan">Kenyan</option>
                                <option value="kittian and nevisian">Kittian and Nevisian</option>
                                <option value="kuwaiti">Kuwaiti</option>
                                <option value="kyrgyz">Kyrgyz</option>
                                <option value="laotian">Laotian</option>
                                <option value="latvian">Latvian</option>
                                <option value="lebanese">Lebanese</option>
                                <option value="liberian">Liberian</option>
                                <option value="libyan">Libyan</option>
                                <option value="liechtensteiner">Liechtensteiner</option>
                                <option value="lithuanian">Lithuanian</option>
                                <option value="luxembourger">Luxembourger</option>
                                <option value="macedonian">Macedonian</option>
                                <option value="malagasy">Malagasy</option>
                                <option value="malawian">Malawian</option>
                                <option value="malaysian">Malaysian</option>
                                <option value="maldivan">Maldivan</option>
                                <option value="malian">Malian</option>
                                <option value="maltese">Maltese</option>
                                <option value="marshallese">Marshallese</option>
                                <option value="mauritanian">Mauritanian</option>
                                <option value="mauritian">Mauritian</option>
                                <option value="mexican">Mexican</option>
                                <option value="micronesian">Micronesian</option>
                                <option value="moldovan">Moldovan</option>
                                <option value="monacan">Monacan</option>
                                <option value="mongolian">Mongolian</option>
                                <option value="moroccan">Moroccan</option>
                                <option value="mosotho">Mosotho</option>
                                <option value="motswana">Motswana</option>
                                <option value="mozambican">Mozambican</option>
                                <option value="namibian">Namibian</option>
                                <option value="nauruan">Nauruan</option>
                                <option value="nepalese">Nepalese</option>
                                <option value="new zealander">New Zealander</option>
                                <option value="ni-vanuatu">Ni-Vanuatu</option>
                                <option value="nicaraguan">Nicaraguan</option>
                                <option value="nigerien">Nigerien</option>
                                <option value="north korean">North Korean</option>
                                <option value="northern irish">Northern Irish</option>
                                <option value="norwegian">Norwegian</option>
                                <option value="omani">Omani</option>
                                <option value="pakistani">Pakistani</option>
                                <option value="palauan">Palauan</option>
                                <option value="panamanian">Panamanian</option>
                                <option value="papua new guinean">Papua New Guinean</option>
                                <option value="paraguayan">Paraguayan</option>
                                <option value="peruvian">Peruvian</option>
                                <option value="polish">Polish</option>
                                <option value="portuguese">Portuguese</option>
                                <option value="qatari">Qatari</option>
                                <option value="romanian">Romanian</option>
                                <option value="russian">Russian</option>
                                <option value="rwandan">Rwandan</option>
                                <option value="saint lucian">Saint Lucian</option>
                                <option value="salvadoran">Salvadoran</option>
                                <option value="samoan">Samoan</option>
                                <option value="san marinese">San Marinese</option>
                                <option value="sao tomean">Sao Tomean</option>
                                <option value="saudi">Saudi</option>
                                <option value="scottish">Scottish</option>
                                <option value="senegalese">Senegalese</option>
                                <option value="serbian">Serbian</option>
                                <option value="seychellois">Seychellois</option>
                                <option value="sierra leonean">Sierra Leonean</option>
                                <option value="singaporean">Singaporean</option>
                                <option value="slovakian">Slovakian</option>
                                <option value="slovenian">Slovenian</option>
                                <option value="solomon islander">Solomon Islander</option>
                                <option value="somali">Somali</option>
                                <option value="south african">South African</option>
                                <option value="south korean">South Korean</option>
                                <option value="spanish">Spanish</option>
                                <option value="sri lankan">Sri Lankan</option>
                                <option value="sudanese">Sudanese</option>
                                <option value="surinamer">Surinamer</option>
                                <option value="swazi">Swazi</option>
                                <option value="swedish">Swedish</option>
                                <option value="swiss">Swiss</option>
                                <option value="syrian">Syrian</option>
                                <option value="taiwanese">Taiwanese</option>
                                <option value="tajik">Tajik</option>
                                <option value="tanzanian">Tanzanian</option>
                                <option value="thai">Thai</option>
                                <option value="togolese">Togolese</option>
                                <option value="tongan">Tongan</option>
                                <option value="trinidadian or tobagonian">Trinidadian or Tobagonian</option>
                                <option value="tunisian">Tunisian</option>
                                <option value="turkish">Turkish</option>
                                <option value="tuvaluan">Tuvaluan</option>
                                <option value="ugandan">Ugandan</option>
                                <option value="ukrainian">Ukrainian</option>
                                <option value="uruguayan">Uruguayan</option>
                                <option value="uzbekistani">Uzbekistani</option>
                                <option value="venezuelan">Venezuelan</option>
                                <option value="vietnamese">Vietnamese</option>
                                <option value="welsh">Welsh</option>
                                <option value="yemenite">Yemenite</option>
                                <option value="zambian">Zambian</option>
                                <option value="zimbabwean">Zimbabwean</option>
                            </select>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <input value={this.state.country} onChange={this.handleChange} type="text" name="country" id="country" placeholder="Country" className="OverviewLeftPane-input" />
                        </div>
                        <div className="col">
                            <input value={this.state.city} onChange={this.handleChange} type="text" className="OverviewLeftPane-input col-6 " name="city" placeholder="City" />
                            <input value={this.state.postalCode} onChange={this.handleChange} type="text" name="postalCode" id="postalCode" placeholder="Postal Code" className="OverviewLeftPane-input col-5 offset-1" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <select value={this.state.gender} onChange={this.handleChange} name="gender" id="gender" className="OverviewLeftPane-input">
                                <option value="Gender">Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div className="col">
                            <select value={this.state.whereDidYouHearAboutUs} onChange={this.handleChange} name="whereDidYouHearAboutUs" id="hearAboutUs" className="OverviewLeftPane-input" defaultValue="Social Media" >
                                <option value="hearAboutUs">Where did you hear about us?</option>
                                <option value="socialMedia">Social Media</option>
                                <option value="newsPaper">Newspaper</option>
                                <option value="friendsFamily">Friends and Family</option>
                            </select>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <textarea value={this.state.address} onChange={this.handleChange} name="address" id="Address" placeholder="Address" className="OverviewLeftPane-input"></textarea>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
