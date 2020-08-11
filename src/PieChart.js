import React,{Component} from "react";
import CanvasJSReact from './canvasjs.react';
import { CanvasJS } from './canvasjs.react';
import { CanvasJSChart} from './canvasjs.react';


class PieChart extends Component {

    constructor(props){
        super(props);
   
        this.state = {
            fields: [{amount: 10, categoryType: ''}],
            datapoints: [{ y: 0, label: ''}],
            user: {username:sessionStorage.getItem('username')},

            YearAndMonth: new Date().getFullYear()+"-0"+(new Date().getMonth()+1),
            errors: {}
        }
    }

async componentDidMount(){
    
    const username = this.state.user.username;
    console.log('UserName from localvariable ', username); 
    const YearAndMonth = this.state.YearAndMonth; 
    console.log("Year&Month", YearAndMonth);
    const response1 = await fetch("/api/expenses/"+username+"/"+YearAndMonth)
    const body = await response1.json();
    console.log('Body1: ', body);
    this.setState({fields: body});
};
    
    render() {
        const fields = this.state.fields;
        const Month = this.state.YearAndMonth;
        console.log("Fields: ", fields);
        let dataPoints = fields.map(function(item){
            return {
                y: item.sum_of_amounts,
                label: item.category_Type
            };
        });

        console.log("dataPoints: ", dataPoints);
        
		const options = {
			theme: "dark2",
			animationEnabled: true,
			exportFileName: "Expenses for the month of "+ Month,
			exportEnabled: true,
			title:{
				text: "Expenses for the month of "+ Month
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
            
			<CanvasJSChart options = {options}
				/* onRef={ref => this.chart = ref} */
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
}
 
export default PieChart;