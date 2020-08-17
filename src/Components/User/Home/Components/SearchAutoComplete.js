import MapboxAutocomplete from 'react-mapbox-autocomplete';

import React, { Component } from 'react'

export default class SearchAutoComplete extends Component {
  _suggestionSelect(result, lat, lng, text) {
    console.log(result, lat, lng, text)
  }

  render() {
    return (
      <div>
        <MapboxAutocomplete publicKey='pk.eyJ1IjoieWFzaGJhaWQiLCJhIjoiY2s3Nmp4cWxtMDBuMDNmbzBiZXhlbmlrZCJ9.-2KnnF7MdkIAip6it8XdZg'
          // inputClass='form-control search'
          onSuggestionSelect={this._suggestionSelect}
          country='in'
          resetSearch={false}
        />
      </div>
    )
  }
}
