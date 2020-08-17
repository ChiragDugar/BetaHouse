import React, { Component } from 'react';
import '../Stylesheets/PriceRange.scss';
import $ from 'jquery';

class PriceRange2 extends Component {
    componentDidMount() {
    }
    handleRange = (e) => {
        console.log(e.target.value);
    }
    render() {
        return (

            // <div class="range-slider"><span>from
            //     <input type="number" value="25000" min="0" max="120000" />to
            //     <input type="number" value="50000" min="0" max="120000" /></span>
            //     <input value="25000" min="0" max="120000" step="500" type="range" />
            //     <input value="50000" min="0" max="120000" step="500" type="range" />
            //     <svg width="100%" height="24">
            //         <line x1="4" y1="0" x2="300" y2="0" stroke="#444" stroke-width="12" stroke-dasharray="1 28"></line>
            //     </svg>
            // </div>
            <div>
                {/* <div> */}
                <p>Enter amount range:</p>
                <div class="form__group field">
                    <input type="input" class="form__field" placeholder="From" name="fromAmount" id='fromAmount' required />
                    <label for="fromAmount" class="form__label">From</label>
                </div>
                <div class="form__group field">
                    <input type="input" class="form__field" placeholder="To" name="toAmount" id='toAmount' required />
                    <label for="toAmount" class="form__label">To</label>
                </div>
            </div>
        );
    }
}

export default PriceRange2;