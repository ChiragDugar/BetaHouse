import React, { Component } from 'react'
import CanvasJSReact from '../../../../Assets/canvasjs.react';
import '../Stylesheet/linechart.scss'
import performRequest from '../../../PerformRequest';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;


export default class lineChart extends Component {
    constructor(props){
        super(props)
        this.timer = null
        this.state = {
            revenueTime:"Week",
            dataPoints:null,
            days:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
            Month:["Week1","Week2","Week3","Week4","Week5"],
            Year:["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            toolTip:"Day"
        }
    }

    
    componentDidMount(){
        let token = localStorage.getItem('merchantId')
        // console.log(token)
        this.setState({
            merchantId:token
        })
        this.timer = setInterval(this.updateChart,1000); 
    }
    
    componentDidUpdate(){
        setTimeout(()=>{
            clearInterval(this.timer);
        },3000)
     }
     
    updateChart = () => {
        let path = "/stats/overall/revenueweekly"
        let method = "POST"
        let body = {
            merchantId:this.state.merchantId
        }
        const response = performRequest(path,method,body)
        response.then(res => {
            // console.log(res)
            if(res.err === false){
            //    console.log(this.state.data[0].points)
                let totalLength = res.totalAmount.length
                let data = []
                res.totalAmount.map((item,index) => {
                    data.push({y:item.totalAmount,label:`${this.state.days[index]}`})
                })
                for(let i=totalLength;i<this.state.days.length;i++){
                    data.push({y:0,label:`${this.state.days[i]}`})
                }
                // console.log(data)
                this.setState({
                    dataPoints:data,
                    toolTip:"Day"
                })
                this.chart.render();
            }
        })
    }
    
    updateChartByMonth = () => {
        let path = "/stats/overall/revenuemonthly"
        let method = "POST"
        let body = {
            merchantId:this.state.merchantId
        }
        const response = performRequest(path,method,body)
        response.then(res => {
            // console.log(res)
            if(res.err === false){
            //    console.log(this.state.data[0].points)
                let totalLength = res.result.length
                let data = []
                res.result.map((item,index) => {
                    data.push({y:item,label:`${this.state.Month[index]}`})
                })
                for(let i=totalLength;i<this.state.Month.length;i++){
                    data.push({y:0,label:`${this.state.Month[i]}`})
                }
                // console.log(data)
                this.setState({
                    dataPoints:data,
                    toolTip:"Week"
                })
                this.chart.render();
            }
        })
        
    }

    updateChartByYear=()=>{
        let path = "/stats/overall/revenueyearly"
        let method = "POST"
        let body = {
            merchantId:this.state.merchantId
        }
        const response = performRequest(path,method,body)
        response.then(res => {
            // console.log(res)
            if(res.err === false){
            //    console.log(this.state.data[0].points)
                let totalLength = res.totalAmount.length
                let data = []
                res.totalAmount.map((item,index) => {
                    data.push({y:item.totalAmount,label:`${this.state.Year[index]}`})
                })
                for(let i=totalLength;i<this.state.Year.length;i++){
                    data.push({y:0,label:`${this.state.Year[i]}`})
                }
                // console.log(data)
                this.setState({
                    dataPoints:data,
                    toolTip:"Month"
                })
                this.chart.render();
            }
        })
    }
    
    updateChartByCustom = () => {
        let fromDate = prompt("From Date:","Enter in YYYY-MM-DD format only")
        let toDate = prompt("To Date:","Enter in YYYY-MM-DD format only") 
        let path = "/stats/overall/revenuecustom"
        let method = "POST"
        let body = {
            fromDate:fromDate,
            toDate:toDate,
            merchantId:this.state.merchantId
        }
        const response = performRequest(path,method,body)
        response.then(res => {
            // console.log(res)
            if(res.err === false){
            //    console.log(this.state.data[0].points)
                let data = []
                res.totalAmount.map((item,index) => {
                    data.push({y:item.totalAmount})
                })
                // console.log(data)
                this.setState({
                    dataPoints:data,
                    toolTip:"Custom Date",
                    revenueTime:"Custom Date"
                })
                this.chart.render();
            }
            else{
                alert(res.msg)
            }
        })

    }

    handleLineChart = (e) => {
        let lhs = e.target.name
        let rhs = e.target.value
        this.setState({
            [lhs]:rhs
        })
        if(rhs === "Week"){
            this.updateChart()
        }   
        else if(rhs === "Month"){
            this.updateChartByMonth()
        }
        else if(rhs === "Year"){
            this.updateChartByYear()
        }
        else{
            this.updateChartByCustom()
        }
    }


    render() {

        const options = {
            animationEnabled: true,
			exportEnabled: true,
			theme: "light2", // "light1", "dark1", "dark2"
			title:{
				text: `Displayed by ${this.state.revenueTime}`
			},
			axisY: {
				title: "Revenue",
				includeZero: true,
				prefix: "Rs."
			},
			axisX: {
                title: "Timeline",
                // includeZero: true,
				interval:1
			},
			data: [{
                type: "line",
				toolTipContent: `${this.state.toolTip} {x}: Rs.{y}`,
				dataPoints: this.state.dataPoints
			}]
		}
        // console.log(options)
        return (
            <div>
                <div className="h4 d-inline-block">Revenue Chart</div>
                <div className="float-right">
                    <select name="revenueTime" id="revenueTime" value={this.state.time} onChange={this.handleLineChart} className="lineChart-select mr-1 p-1">
                        <option value="Week">Week</option>  
                        <option value="Month">Month</option>  
                        <option value="Year">Year</option> 
                    </select>   
                    <button type="button" className="bg-dark text-white px-2 py-1 border border-dark rounded" onClick = {this.updateChartByCustom}>
                        Choose Custom Date
                    </button>
                    
                </div>
                <div>
                    <CanvasJSChart options = {options}
                    onRef={ref => this.chart = ref}
                    />		
                </div>		
            </div>
        );
    }
}
