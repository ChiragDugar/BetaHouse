import React, { Component } from 'react'
import performRequest from '../../PerformRequest';
import Autosuggest from 'react-autosuggest';
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
 
// Demo styles, see 'Styles' section below for some notes on use.
import 'react-accessible-accordion/dist/fancy-example.css';
import '../StyleSheets/AdminDashboard5.scss'


export default class AdminDashboard5 extends Component {

    constructor(props){
        super(props);
        this.state = {
            propertyType:"coLiving",
            propertyList:[],
            value:"",
            suggestions:[],
            featuredList:[],
            featuredListIds:[]     
        }
    }

    getProperties = () => {
        let propertyType = this.state.propertyType
        let path = "/property/gethomepagefeature"
        let method = "POST"
        let body = { propertyType }
        let response = performRequest(path, method, body)
        response.then(res => {
            if(res.err === false)
            {
                let propertyList = []

                let featuredListIds = res.featuredProperties.map(el => {
                    return el._id
                })

                for(var i=0;i<res.allProperties.length;i++)
                {
                    let count = 0;
                    for(var j=0;j<res.featuredProperties.length;j++)
                    {
                        if(res.allProperties[i]._id === res.featuredProperties[j]._id)
                        {
                            count++;
                        }
                    }
                    if(count === 0)
                    {
                        propertyList = [...propertyList, res.allProperties[i]]
                    }
                }

                this.setState({
                    propertyList,
                    featuredList:res.featuredProperties,
                    featuredListIds
                })
            }
            else{
                alert(res.msg)
            }
        })
    }

    getFeatured = (el) => {
        if(el !== undefined)
        {
            let featuredList = [...this.state.featuredList , el]
            const propertyList = this.state.propertyList.filter(item => {
                return el._id !== item._id
            })
            let featuredListIds = [...this.state.featuredListIds, el._id]
            this.setState({
                propertyList,
                featuredList,
                featuredListIds
            })
        }
    }

    removeFeatured = (el) => {
        if(el !== undefined)
        {
            let featuredList = this.state.featuredList.filter(item => {
                return el._id !== item._id
            })
            let featuredListIds = this.state.featuredListIds.filter(item => {
                return el._id !== item 
            })
            let propertyList = [...this.state.propertyList, el]
            this.setState({
                propertyList,
                featuredList,
                featuredListIds
            })
        }
    }

    updateFeaturedProperties = () => {
        let propertyType = this.state.propertyType
        let properties = this.state.featuredListIds
        let path = "/property/addhomepagefeature"
        let method = "POST"
        let body = {propertyType, properties}
        let response = performRequest(path, method, body)
        response.then(res => {
            if(res.err === false)
            {
                alert(res.msg)
                window.location.reload()
            }
            else{
                alert(res.msg)
            }
        })
    }

    componentDidMount = () => {
        this.getProperties()
    }

    getSuggestions = value => {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;
       
        return inputLength === 0 ? [] : this.state.propertyList.filter(uni =>
          uni.propertyName.toLowerCase().slice(0, inputLength) === inputValue
        );
      };

    getSuggestionValue = suggestion => suggestion.propertyName + ", " + suggestion.city.cityName + ", " + suggestion.merchantId.firstName + " " + suggestion.merchantId.lastName ;

    renderSuggestion = suggestion => (
        <div className="row admin-autosuggest-update-uni-suggestion">
            {/* <span className="text-left admin-autosuggest-update-uni-suggestion"  >{suggestion.cityName}</span>  */}
            <p className="row text-left admin-autosuggest-update-uni-suggestion">{ suggestion.propertyName + ", " + suggestion.city.cityName + ", " } &nbsp; <b>Merchant: </b> { " " + suggestion.merchantId.firstName + " " + suggestion.merchantId.lastName }</p> <br/>
            <p className="text-left admin-autosuggest-update-uni-suggestion">  </p>  
            <span onClick = { () => this.getFeatured(suggestion)}  className="float-right admin-dashboard-locality-delete-cross-update-uni " >Get Featured</span> 
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
            placeholder: 'Search Properties to add them to the featured list',
            value,
            onChange: this.onChange,
          };

        return (
            <div>
                <div className="row">
                    <h3 className="col admin-dashboard-add-city-heading">Featured properties for Co-Living</h3>
                </div>
                <div className="row">
                    <p className="admin-dashboardone-uni-msg">**Please press submit after adding the Featured Property!</p>
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
                <div className="row admin-dashboard5-accordian-featured-disp">
                    <div className="col-lg-12">
                        <Accordion allowZeroExpanded={true}>
                            {   this.state.featuredList && this.state.featuredList.length > 0 ? this.state.featuredList.map(el => {
                                return(
                                    <AccordionItem>
                                        <AccordionItemHeading>
                                            <AccordionItemButton>
                                                {<b>Name: { " " + el.propertyName } </b> }
                                            </AccordionItemButton>
                                        </AccordionItemHeading>
                                        <AccordionItemPanel>
                                            <p className="card-text">  </p >
                                            <p className="card-text"> <b>Address: </b> { " " + el.address } </p >
                                            <p className="card-text"> <b>Merchant:</b> { el.merchantId !== null ? (
                                                <span>{ " " +  el.merchantId.firstName + " " + el.merchantId.lastName}</span>
                                            ) : (
                                                <span>Does not Exist!</span>
                                            ) } </p >
                                            <p></p>
                                            <p className="card-text"><i className="fas fa-times admin-tab1-cross" onClick = { () => {this.removeFeatured(el)} } ></i></p>
                                        </AccordionItemPanel>
                                    </AccordionItem>   
                                )
                            }):(
                                <div className="col-lg-12">
                                    <div className="card">
                                        <div className="card-header">No featured properties</div>
                                    </div>
                                </div>
                            )

                            }
                        </Accordion>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <button onClick={this.updateFeaturedProperties} className="admin-dashboard-update-uni-button" >SUBMIT</button> 
                    </div>
                </div>
            </div>
        )
    }
}
