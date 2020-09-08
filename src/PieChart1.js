import React,{Component} from "react";
import { CanvasJSChart} from './canvasjs.react';
import {Bar} from 'react-chartjs-2';
import {Doughnut} from 'react-chartjs-2';
import { defaults } from 'react-chartjs-2';


class PieChart1 extends Component {

    constructor(props){
        super(props);
   
        this.state = {
            fields: [{amount: 10, categoryType: ''}],
            datapoints: [{ y: 0, label: ''}],
            user: {username:sessionStorage.getItem('username')},

            YearAndMonth: new Date().getFullYear()+"-0"+(new Date().getMonth()+1),
            errors: {},
            type: 'bar',
            data: {
                labels: [0,1],
                datasets: [{
                    label: '',
                    data: [0,1],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)'
                        
                    ]
                    
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            autoskip: true
                        }
                    }],
                }
            }

        }

        }

async componentDidMount(){
    
    const username = this.state.user.username;
    console.log('UserName from localvariable ', username); 
    const YearAndMonth = this.state.YearAndMonth; 
    console.log("Year&Month", YearAndMonth);
    const response1 = await fetch("https://expense-calculator-ankit.herokuapp.com/api/expenses/"+username+"/"+YearAndMonth)
    const body = await response1.json();
    this.setState({fields: body});
    this.getChartData();
};

getChartData=()=>{
        
    let data1= {
         labels: [0,1],
         datasets: [{
             label: '',
             data: [0,1],
             backgroundColor: [
                 'rgba(255, 99, 132, 0.2)'
                 
             ]
             
         }]
     }
     const backColor= ["pink", "purple", "blue", "green", "lightblue", "neon", "red", "lightgreen", "yellow", "grey", "lightgrey", "orange"]
     
     console.log("data1 ", data1);
     console.log("inside getCharData");

     const fields = this.state.fields;
        const Month = this.state.YearAndMonth;
        const username = this.state.user.username;
        
        let dataPoints = fields.map(function(item){
            return {
                y: item.sum_of_amounts,
                label: item.category_Type
            };
        });
    
        data1.datasets[0].data = dataPoints.y;
        data1.labels = dataPoints.label;
        data1.datasets[0].backgroundColor=backColor;
        data1.datasets[0].label = "Hello "+username+", your expenses for the month of "+ Month

     this.setState({
         data: data1
     })

 }
    
    render() {
        const fields = this.state.fields;
        const Month = this.state.YearAndMonth;
        const username = this.state.user.username;
        let dataPoints = fields.map(function(item){
            return {
                y: item.sum_of_amounts,
                label: item.category_Type
            };
        });
        let options1 = this.state.options;
        const data = this.state.data;
        const type = this.state.type;
        
		const options = {
			theme: "dark2",
            animationEnabled: true,
            animationDuration: 2000,
			exportFileName: "Expenses for the month of "+ Month,
			exportEnabled: true,
			title:{
				text: "Hello "+username+", your expenses for the month of "+ Month
			},
			data: [{
				type: "pie",
				showInLegend: true,
				legendText: "{label}",
				toolTipContent: "{label}: <strong>${y}</strong>",
				indexLabel: "${y}",
				indexLabelPlacement: "inside",
				dataPoints: dataPoints
			}]
		}
		return (
            <div>
		<div>
            
			<CanvasJSChart options = {options}
				/* onRef={ref => this.chart = ref} */
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
        <div style={{position: "relative", width: 600, height:300, paddingLeft: 100, alignContent: "center"}}>

         <Bar 
                type = {type}
                options={options1}
                data = {data}   
                redraw
                />
        </div>
        </div>
		);
	}
}
 
export default PieChart1;