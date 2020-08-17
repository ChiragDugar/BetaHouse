import React, { Component } from 'react';

export default class Home6 extends Component {
    render() {
        return (
            <div className='Home6-mainDiv'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-12 md-6'>
                            <p className='Home6-p1 Home6-p'>Get in touch with us!</p>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-12 md-6'>
                            <p className='Home6-p2 Home6-p'>For any queries - Fill in your information <br/> to get in touch with the Betahouse team</p>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-12 col-lg-5'>
                            <input type='text' placeholder='Name' className='Home6-text1 Home6-input'></input>
                        </div>
                        <div className='col-12 col-lg-5'>
                            <input type='text' placeholder='Phone Number' className='Home6-text1 Home6-input'></input>
                        </div>
                        <div className='col-2'>
                        </div>
                    </div>
                    
                    <div className='row'>
                        <div className='col-12 col-lg-5'>
                            <input type='text' placeholder='E-mail' className='Home6-text2 Home6-input'></input>
                        </div>
                        <div className='col-12 col-lg-5'>
                            <input type='text' placeholder='City' className='Home6-text2 Home6-input'></input>
                        </div>
                        <div className='col-2'>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-12 col-lg-5'>
                            <input type='text' placeholder='University' className='Home6-text3 Home6-input'></input>
                        </div>
                        <div className='col-12 col-lg-3'>
                            <button className='Home6-submit'><p className='Home6-btext'>SUBMIT</p></button>
                        </div>
                    </div>
                </div>
            </div>
             
        )
    }
}
