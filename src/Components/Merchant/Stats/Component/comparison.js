import React, { Component } from 'react'

export default class comparison extends Component {
    render() {
        return (
            <div>
                <div className="Comparison-heading h2 d-inline-block">Compare Your Properties</div>
                <div className="btn float-right d-inline-block bg-dark text-white px-3 py-2">Submit</div>
                <div className="Comparison-container">
                    <select>
                        <option value = "Hello">Hello</option>
                        <option value = "Bye">Bye</option>
                        <option value = "Pop">Pop</option>
                    </select>
                </div>
            </div>
        )
    }
}
