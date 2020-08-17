import React, { Component } from 'react'
import performRequest from '../../PerformRequest'
import Autosuggest from 'react-autosuggest';
import '../StyleSheets/AdminDashboardThree.scss'

export default class AdminDashboardThree extends Component {

    constructor(props){
        super(props)
        this.state = {
            citiesList:[],
            value:"",
            suggestions:[],
        }
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

    deleteCity = (el) => {
        if(el._id !== "")
        {
            var toggle = window.confirm("Are you sure you want to delete the city?")
            let cityId = el._id
            if(toggle === true)
            {
                let path = "/admin/misc/deletecity"
                let method = "POST"
                let body = { cityId }
                let response = performRequest(path, method, body)
                response.then(res => {
                    alert(el.cityName + " has been deleted.")
                    window.location.reload()
                })
            }
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
        <span onClick = { () => this.deleteCity(suggestion)}  className="float-right admin-dashboard-locality-delete-cross-update-uni " >x</span> 
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
            placeholder: 'Search Cities to delete them',
            value,
            onChange: this.onChange,
        };

        return (
            <div>
                <div className="row">
                    <h3 className="col admin-dashboard-delete-city-heading">Delete Cities</h3>
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
                <div className="row admin-dashboard3-margin-bottom"></div>
            </div>
        )
    }
}
