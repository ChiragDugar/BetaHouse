import React, { Component } from 'react'
import performRequest from '../../PerformRequest'
import Autosuggest from 'react-autosuggest';
import '../StyleSheets/AdminDashboardOne.scss'

export default class AdminDashboardOne extends Component {

    constructor(props){
        super(props)
        this.state = { 
            citiesList:[],
            universityList:[],
            universityValue:"",
            suggestions:[],
            value:"",
            cityId:""
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    getCities = () => {
        let path = "/admin/misc/getcitieslist"
        let method = "POST"
        let body = {}
        let response = performRequest(path, method, body)
        response.then(res => {
            // console.log(res)
            this.setState({
                citiesList:res
            })
        })
    }

    getUniversities = (el) => {
        const cityId = el._id;
        let path = "/admin/misc/getuniversitiesforcity"
        let method = "POST"
        let body = {cityId}
        let response = performRequest(path, method, body)
        response.then(res => {
            if(res.err === false)
            {
                this.setState({
                    universityList:res.universities,
                    cityId:cityId
                })
            }
        })
    }

    addUniversity = (e) => {
        e.preventDefault()
        if(this.state.universityValue !== "")
        {
            if(this.state.universityValue.includes(","))
            {
                let newUniValue = this.state.universityValue.trim()
                let uniList = newUniValue.split(",")
                uniList = uniList.filter(item => {
                    return item !== ""
                })
                let universityList = uniList.concat(this.state.universityList)
                this.setState({
                    universityList,
                    universityValue:""
                })
            }
            else{
                let universityList = [...this.state.universityList, this.state.universityValue]
                this.setState({
                    universityList,
                    universityValue:""
                })
            }
        }
        else{
            alert("Please enter a University name!")
        }
        
    }

    deleteUniversity = (el) => {
        el = el.toLowerCase()
        const universityList = this.state.universityList.filter(item => {
            item = item.toLowerCase()
            return el !== item
        })
        this.setState({
            universityList
        })
    }

    // deleteUniversity = (el) => {
    //     var toggle = window.confirm("Are you sure you want to delete the university?")
    //     if(toggle===true)
    //     {
    //         el = el.toLowerCase()
    //         const universityList = this.state.universityList.filter(item => {
    //             item = item.toLowerCase()
    //             return el !== item
    //         })
    //         this.setState({
    //             universityList,
    //         })
    //         alert(el+" has been deleted!")
    //     }
        // else{
        //     console.log(toggle)
        // }
    // }

    // getUniversityList = () => {
    //     let path = "/admin/misc/getunilist"
    //     let method = "POST"
    //     let body ={}
    //     let response = performRequest(path, method, body)
    //     response.then(res => {
    //         if(res.err === false)
    //         {
    //             this.setState({
    //                 universityList:res.universityList
    //             })
    //         }
    //         else{
    //             alert(res.msg)
    //         }
    //     })
    // }

    updateUniversity = () => {
        if(this.state.cityId === "" && this.state.value !== "")
        {
            alert("Please select a city, then add or delete a University")
        }
        else{
            let cityId = this.state.cityId
            let universities = this.state.universityList
            console.log(cityId)
            let path = "/admin/misc/updateuniversity"
            let method = "POST"
            let body = {cityId, universities}
            let response = performRequest(path, method, body)
            response.then(res => {
                if(res.err === false)
                {
                    alert(res.msg)
                    this.setState({
                        cityId:"",
                        universityList:[],
                        universityValue:"",
                    })
                    this.getCities();
                }
                else
                {
                    alert(res.msg)
                }
            })
        }
    }    

    componentDidMount = () => {
        // this.getUniversityList();
        this.getCities()
        
    }

    getSuggestions = value => {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;
       
        return inputLength === 0 ? [] : this.state.citiesList.filter(uni =>
          uni.cityName.toLowerCase().slice(0, inputLength) === inputValue
        );
      };

    getSuggestionValue = suggestion => suggestion.cityName;

    renderSuggestion = suggestion => (
        <div className="row admin-autosuggest-update-uni-suggestion">
          <span className="text-left admin-autosuggest-update-uni-suggestion"  >{suggestion.cityName}</span>    
          <span onClick = { () => this.getUniversities(suggestion)}  className="float-right admin-dashboard-locality-delete-cross-update-uni " >Get Universities</span> 
        </div>
      );

      onChange = (event, { newValue }) => {
            this.setState({
                value: newValue
            });
        };  

        onSuggestionsFetchRequested = ({ value }) => {
            this.setState({
              suggestions: this.getSuggestions(value)
            });
        };

        onSuggestionsClearRequested = () => {
            this.setState({
              suggestions: []
            });
        };

    // getSuggestions = value => {
    //     const inputValue = value.trim().toLowerCase();
    //     const inputLength = inputValue.length;
       
    //     return inputLength === 0 ? [] : this.state.universityList.filter(uni =>
    //       uni.toLowerCase().slice(0, inputLength) === inputValue
    //     );
    //   };

    // getSuggestionValue = suggestion => suggestion;

    // renderSuggestion = suggestion => (
    //     <div className="row admin-autosuggest-update-uni-suggestion">
    //       <span className="text-left admin-autosuggest-update-uni-suggestion" >{suggestion}</span> &nbsp;  &nbsp;    
    //       <span  onClick = { () => this.deleteUniversity(suggestion) } className="float-right admin-dashboard-locality-delete-cross-update-uni " >x</span> 
    //     </div>
    //   );

    // onChange = (event, { newValue }) => {
    // this.setState({
    //     value: newValue
    // });
    // };  

    // onSuggestionsFetchRequested = ({ value }) => {
    //     this.setState({
    //       suggestions: this.getSuggestions(value)
    //     });
    // };

    // onSuggestionsClearRequested = () => {
    //     this.setState({
    //       suggestions: []
    //     });
    // };

    // handleAPI = () => {
    //     let path = "/admin/misc/updateunilist"
    //     let method = "POST"
    //     let universityList = this.state.universityList
    //     let body = { universityList }
    //     let response = performRequest(path, method, body)
    //     response.then(res => {
    //         if(res.err === false)
    //         {
    //             alert(res.msg)
    //             // console.log(res.universityList)
    //         }
    //         else{
    //             alert(res.msg)
    //         }
    //     })
    // }

    render() {
        const value = this.state.value
        const suggestions = this.state.suggestions
        const inputProps = {
            placeholder: 'Search Cities to get its Universities',
            value,
            onChange: this.onChange,
          };
        return (    
            <div>
                <div className="row">
                    <h3 className="col admin-dashboard-add-uni-heading">Update Universities</h3>
                </div>
                <div className="row">
                    <p className="admin-dashboardone-uni-msg">**Please press submit after adding the university</p>
                </div>
                <div className="row admin-dashboardone-search-bar-row">
                    
                    <div className="col-lg-12 AutosuggestUpdateUni">
                        <Autosuggest
                            suggestions={suggestions}
                            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                            getSuggestionValue={this.getSuggestionValue}
                            renderSuggestion={this.renderSuggestion}
                            inputProps={inputProps}
                    
                        />
                    </div>
                </div>
                <form onSubmit={this.addUniversity}>
                    <div className="row">
                        <div className="col-lg-9">
                            {/* <p className="admin-dashboardone-uni-msg">**Please press submit after adding the university</p> */}
                            <input onChange={this.handleChange} value={this.state.universityValue}  type="text" name="universityValue" id="universityValue" placeholder="Add University" className="OverviewLeftPane-input" />
                        </div>
                        <div className="col-lg-3 admin-dashboard-add-uni-button-wrapper">
                            <button className="admin-dashboard-add-loc-button" onClick={this.addUniversity}>Add Universities</button>
                        </div>
                    </div>
                </form>

                <div className="row">
                    { this.state.universityList && this.state.universityList.length > 0 ? this.state.universityList.map((el,i) => {
                            return(
                                
                                <div className="admin-dashboard-locality-display"> &nbsp; { el } &nbsp; <span onClick = { () => this.deleteUniversity(el) } className="admin-dashboard-locality-delete-cross" >X</span> &nbsp; &nbsp; </div> 

                            )
                        }) : (
                            // <div className="admin-dashboard-locality-display">There are no localities added yet.</div>
                            <div></div>
                    ) }
                </div>

                {/* <div className="row">
                    

                    <div className="col AutosuggestUpdateUni">
                        <Autosuggest
                            suggestions={suggestions}
                            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                            getSuggestionValue={this.getSuggestionValue}
                            renderSuggestion={this.renderSuggestion}
                            inputProps={inputProps}
                    
                        />
                    </div>
                </div> */}
                <div className="row">
                    <div className="col">
                        <button onClick={this.updateUniversity} className="admin-dashboard-update-uni-button" >SUBMIT</button> 
                    </div>
                </div>
            </div>
        )
    }
}
