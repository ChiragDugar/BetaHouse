import React, { Component } from 'react'
import Mhome1 from '../Components/Mhome1'
import Mhome2 from '../Components/Mhome2'
import Mhome3 from '../Components/Mhome3'
import Mhome4 from '../Components/Mhome4'
import Mhome5 from '../Components/Mhome5'
import Footer from '../../../Footer'
import '../StyleSheets/Mhome1.scss'
import '../StyleSheets/Mhome2.scss'
import '../StyleSheets/Mhome3.scss'
import '../StyleSheets/Mhome4.scss'
import '../StyleSheets/Mhome5.scss'


export default class Mhome extends Component {
    componentDidMount(){
        let token = localStorage.getItem('merchantId')
        console.log(token)
        if(token!==null){
            this.props.history.push('/merchant/dashboard')
        }
    }
    render() {
        return (
            <div>
                <Mhome1 history={this.props.history}/>
                <Mhome2 />
                <Mhome3 />
                <Mhome4 history={this.props.history}/>
                <Mhome5 />
                <Footer />
            </div>
        )
    }
}
