import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import '../StyleSheets/SearchBar2.scss';

// const languages = [
//     {
//         "title": "City",
//         "suggestions": [
//             {
//                 "_id": "5e98748750f31d27c4003e2d",
//                 "name": "Chennai, India",
//                 "type": "cityId"
//             },
//             {
//                 "_id": "5e9874d850f31d27c4003e2e",
//                 "name": "Bangalore, India",
//                 "type": "cityId"
//             },
//             {
//                 "_id": "5e9876033e9ff62a8413eb5d",
//                 "name": "Gurgaon, India",
//                 "type": "cityId"
//             }
//         ]
//     },
//     {
//         "title": "Property",
//         "suggestions": [
//             {
//                 "_id": "5e8da0c92b952f5d4c85c653",
//                 "name": "The Boulevard Perth",
//                 "type": "propertyId"
//             },
//             {
//                 "_id": "5e8da4732b952f5d4c85c66c",
//                 "name": "University Square Melbourne",
//                 "type": "propertyId"
//             },
//             {
//                 "_id": "5e93247c3848210e58ededca",
//                 "name": "Infinity Place Melbourne",
//                 "type": "propertyId"
//             },
//             {
//                 "_id": "5e99703f8c2bd434c813d7a3",
//                 "name": "The Boulevard Perth, Chennai, India",
//                 "type": "propertyId"
//             }
//         ]
//     },
//     {
//         "title": "University",
//         "suggestions": [
//             {
//                 "name": "Harvard University",
//                 "type": "universityId"
//             },
//             {
//                 "name": "Yale University",
//                 "type": "universityId"
//             },
//             {
//                 "name": "University of Pennsylvania",
//                 "type": "universityId"
//             },
//             {
//                 "name": "Princeton University",
//                 "type": "universityId"
//             },
//             {
//                 "name": "Columbia University",
//                 "type": "universityId"
//             }
//         ]
//     }
// ];


// Teach Autosuggest how to calculate suggestions for any given input value.
// const getSuggestions = value => {
//     const inputValue = value.trim().toLowerCase();
//     const inputLength = inputValue.length;

//     // return inputLength === 0 ? [] : 
//     // languages.filter(section =>
//     // // lang.name.toLowerCase().slice(0, inputLength) === inputValue
//     // // section.filter(item => item.name.toLowerCase().slice(0, inputLength) === inputValue)
//     // {
//     //     let temp_section = JSON.parse(JSON.stringify(section));
//     //     temp_section.suggestions = temp_section.suggestions.filter(item => item.name.toLowerCase().slice(0, inputLength) === inputValue);
//     //     console.log(temp_section);
//     //     return temp_section;
//     // }
//     // ); 
//     // (
//     //     let temp_lang = languages;
//     // )
//     if (inputLength === 0) {
//         return [];
//     }
//     else {
//         const result = [];
//         for (let i = 0; i < languages.length; i++) {
//             // console.log(langua);
//             let section = {};
//             section.title = languages[i].title;
//             console.log(languages[i]);
//             const sectionLength = languages[i].suggestions.length;
//             const suggestionsForEachSection = [];
//             for (let j = 0; j < sectionLength; j++) {
//                 let eachSuggestion = languages[i].suggestions[j];
//                 if (eachSuggestion.name.toLowerCase().slice(0, inputLength) === inputValue) {
//                     // if (eachSuggestion.name.toLowerCase().includes(inputValue)) {
//                     suggestionsForEachSection.push(eachSuggestion);
//                 }
//             }
//             if (suggestionsForEachSection.length !== 0) {
//                 section.suggestions = suggestionsForEachSection;
//                 result.push(section);
//             }
//         }
//         return result;
//     }
// };

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => suggestion.name;

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => (
    <span>
        {suggestion.name}
    </span>
);

function renderSectionTitle(section) {
    return <strong>{section.title}</strong>;
}

function getSectionSuggestions(section) {
    return section.suggestions;
}

class SearchBar2 extends Component {
    constructor() {
        super();

        // Autosuggest is a controlled component.
        // This means that you need to provide an input value
        // and an onChange handler that updates this value (see below).
        // Suggestions also need to be provided to the Autosuggest,
        // and they are initially empty because the Autosuggest is closed.
        this.state = {
            value: '',
            suggestions: [],
            allSuggestions: []
        };
    }

    componentDidMount() {
        fetch('https://backend.betahouse.co.in/property/view/getsearchdata', {
            method: "POST"
        })
            .then(data => data.json())
            .then(data => {
                if (data.err) {
                    console.log(`ERROR`);
                    console.log(data.msg);
                    // alert(data.msg);
                }
                else {
                    this.setState({
                        allSuggestions: data.result
                    })
                }
            })
            .catch(err => {
                console.log(`ERRROR`);
                // alert(err.msg);
                console.log(err.msg);
            })
    }

    getSuggestions = value => {
        // return this.state.allSuggestions;
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;
        if (inputLength === 0) {
            return this.state.allSuggestions;
        }
        else {
            const result = [];
            const { allSuggestions } = this.state;
            for (let i = 0; i < allSuggestions.length; i++) {
                let section = {};
                section.title = allSuggestions[i].title;
                // console.log(allSuggestions[i]);
                const sectionLength = allSuggestions[i].suggestions.length;
                const suggestionsForEachSection = [];
                for (let j = 0; j < sectionLength; j++) {
                    let eachSuggestion = allSuggestions[i].suggestions[j];
                    if (eachSuggestion.name.toLowerCase().slice(0, inputLength) === inputValue) {
                        // if (eachSuggestion.name.toLowerCase().includes(inputValue)) {
                        suggestionsForEachSection.push(eachSuggestion);
                    }
                }
                if (suggestionsForEachSection.length !== 0) {
                    section.suggestions = suggestionsForEachSection;
                    result.push(section);
                }
            }
            return result;
        }
    };

    getSuggestionValue = suggestion => suggestion.name;

    renderSectionTitle = (section) => {
        if (section.title === "City")
            return <strong><i className="fas fa-city"></i>&nbsp;{section.title}</strong>;
        else if (section.title === "Property")
            return <strong><i className="fas fa-home"></i>&nbsp;{section.title}</strong>;
        else
            return <strong><i className="fas fa-university"></i>&nbsp;{section.title}</strong>;
    }

    renderSuggestion = suggestion => (
        <span>
            {suggestion.name}
        </span>
    );


    getSectionSuggestions = (section) => {
        return section.suggestions;
    }

    onChange = (event, { newValue }) => {
        document.querySelector('.react-autosuggest__suggestions-container').style = "display: block;";
        this.setState({
            value: newValue
        });
    };

    // Autosuggest will call this function every time you need to update suggestions.
    // You already implemented this logic above, so just use it.
    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            suggestions: this.getSuggestions(value)
        });
    };

    // Autosuggest will call this function every time you need to clear suggestions.
    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };
    onSuggestionSelected = (event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) => {
        // console.log(11111);
        // console.log(suggestion);
        // console.log(22222);
        // console.log(event);
        this.props.suggestionSelect(suggestion);
        this.setState({
            suggestions: []
        });
        document.querySelector('.react-autosuggest__suggestions-container').style = "display: none;";
    }

    render() {
        const { value, suggestions } = this.state;

        // Autosuggest will pass through all these props to the input.
        // const inputProps = {
        //     placeholder: `Search by city, property or university`,
        //     value,
        //     onChange: this.onChange
        // };
        let inputProps;
        if (this.props.studentAccomodation) {
            inputProps = {
                placeholder: `Search by city, property or university`,
                value,
                onChange: this.onChange
            };
        }
        else {
            inputProps = {
                placeholder: `Search by city or property`,
                value,
                onChange: this.onChange
            };
        }

        // Finally, render it!
        return (
            <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                getSuggestionValue={this.getSuggestionValue}
                renderSuggestion={this.renderSuggestion}
                inputProps={inputProps}
                multiSection={true}
                getSectionSuggestions={this.getSectionSuggestions}
                renderSectionTitle={this.renderSectionTitle}
                alwaysRenderSuggestions={true}
                onSuggestionSelected={this.onSuggestionSelected}
            />
        );
    }
}

export default SearchBar2;
