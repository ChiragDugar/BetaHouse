import React, { Component } from 'react'
import performRequest from '../../PerformRequest'
import Autosuggest from 'react-autosuggest';
import '../StyleSheets/AdminDashboardTwo.scss'


export default class AdminDashboardTwo extends Component {

    constructor(props){
        super(props)
        this.state = {
            citiesList:[],
            value:"",
            suggestions:[],
            localities:[],
            localityValue:"",
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

    getLocalities = (el) => {
        console.log(el)
        this.setState({
            localities:el.localities,
            cityId:el._id
        })
        // console.log(this.state.localities)
    }

    addLocality = (e) => {
        e.preventDefault()
        if(this.state.localityValue !== "")
        {
            if(this.state.localityValue.includes(","))
            {
                let newLocValue = this.state.localityValue.trim()
                let locList = newLocValue.split(",")
                locList = locList.filter(item => {
                    return item !== ""
                })
                let localities = locList.concat(this.state.localities)
                this.setState({
                    localities,
                    localityValue:""
                })
            }
            else{
                let localities = [...this.state.localities, this.state.localityValue]
                this.setState({
                    localities,
                    localityValue:""
                })
            }
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

    updateLocality = () => {
        if(this.state.cityId === "")
        {
            alert("Please select a city, then add or delete a locality")
        }
        else{
            let path = "/admin/misc/updatelocality"
            let method = "POST"
            let cityId = this.state.cityId
            let localities = this.state.localities
            let body = {cityId, localities}
            let response = performRequest(path, method, body)
            response.then(res => {
                if(res.err === false)
                {
                    alert(res.msg)
                    this.setState({
                        cityId:"",
                        localities:[],
                        localityValue:""
                    })
                    this.getCities()
                }
                else{
                    alert(res.msg)
                }
            })
        }
    }


    componentDidMount = () => {
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
          <span onClick = { () => this.getLocalities(suggestion)}  className="float-right admin-dashboard-locality-delete-cross-update-uni " >Get Localities</span> 
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


    render() {

        const value = this.state.value
        const suggestions = this.state.suggestions
        const inputProps = {
            placeholder: 'Search Cities to get their localities',
            value,
            onChange: this.onChange,
          };


        return (
            <div>
                <div className="row">
                    <h3 className="col admin-dashboard-add-city-heading">Update Localities</h3>
                </div>
                <div className="row">
                    <p className="admin-dashboardone-uni-msg">**Please press submit after adding the Locality</p>
                </div>
                <div className="row">
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
                </div>
                
                <form onSubmit={this.addLocality}>
                    <div className="row admin-dashboard-two-add-locality-row">
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
                        <button onClick={this.updateLocality} className="admin-dashboard-update-uni-button" >SUBMIT</button> 
                    </div>
                </div>
            </div>
        )
    }
}
