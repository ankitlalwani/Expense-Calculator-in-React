import React,{Component} from "react";
import {Bar} from 'react-chartjs-2';
import {Pie} from 'react-chartjs-2';
import {Doughnut} from 'react-chartjs-2';
import { defaults } from 'react-chartjs-2';
import DatePicker from 'react-datepicker';



class PieChart1 extends Component {

    constructor(props){
        super(props);
   
        this.state = {
            fields: [{amount: 10, categoryType: ''}],
            datapoints: [{ y: 0, label: ''}],
            user: {username:sessionStorage.getItem('username')},
            startDate: new Date(),

            YearAndMonth: new Date().getFullYear()+"-0"+(new Date().getMonth()+1),
            errors: {},
            type: 'pie',
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
               
            }

        }
        this.handleChange = this.handleChange.bind(this);

        }

async componentDidMount(){
    
    const username = this.state.user.username;
    console.log('UserName from localvariable ', username); 
    const YearAndMonth = this.state.YearAndMonth; 
    console.log("Year&Month", YearAndMonth);
    const response1 = await fetch("https://expense-calculator-ankit.herokuapp.com/api/expenses/"+username+"/"+YearAndMonth)
    const body = await response1.json();
    this.setState({fields: body});
};

getChartData=()=>{
        
     let data1 = this.state.data;
     const backColor= ["pink", "purple", "blue", "green", "lightblue", "neon", "red", "lightgreen", "yellow", "grey", "lightgrey", "orange","lightpink", "lightpurple", "lightblue", "lightgreen", "blue", "brown", "lightred", "parrot", "lightyellow", "lightgrey", "lightorange"]
     
     console.log("data1 ", data1);
     console.log("inside getCharData");

     const fields = this.state.fields;
        const Month = this.state.YearAndMonth;
        const username = this.state.user.username;
        console.log("Fields: ", fields);
       let data2 = fields.map(function(item){
            return {
                data2: item.sum_of_amounts
            };
        });
   
        let label2 = fields.map(function(item){
            return {
                label2: item.category_Type
            };
        });

        console.log("datapoints :", data2.map(k=>k.data2));
        data1.datasets[0].data = data2.map(k=>k.data2);
        data1.labels = label2.map(k=>k.label2);
        data1.datasets[0].backgroundColor=backColor;
        

        console.log("data1 after datapoints: ", data1);

     return data1;

 }

async handleChange(event){
    const date = event;
     let YearAndMonth1 = event;
     console.log("handleChange Yearand Month: ", YearAndMonth1)
     YearAndMonth1 = YearAndMonth1.getFullYear()+"-0"+(YearAndMonth1.getMonth()+1);
     console.log("handleChange Yearand Month: ", YearAndMonth1);

     const username = this.state.user.username;

     const response1 = await fetch("https://expense-calculator-ankit.herokuapp.com/api/expenses/"+username+"/"+YearAndMonth1)
     const body = await response1.json();

     this.setState({fields: body, startDate: date, YearAndMonth: YearAndMonth1});
     console.log("handleChange fields: ", body);

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
        const startDate = this.state.startDate;
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
		<h1> 
            Hello {username}, your expenses for the month of {Month}
        </h1>
        <div style={{alignContent: "center", backgroundColor: "lightgray"}}>
        <div style={{paddingLeft:900, position: "relative", alignItems: "end"}}>
                <DatePicker
                    selected={startDate}
                    onChange={this.handleChange}
                    dateFormat="yyyy-MM"
                    showMonthYearPicker
                    showFullMonthYearPicker
                />
            </div>
            <div style={{position: "relative", alignContent: "center", backgroundColor: "lightgray"}}>
         <Pie 
                type = {type}
                options={options1}
                data = {this.getChartData}   
                redraw
                />
        </div>
        </div>

        </div>
		);
	}
}
 
export default PieChart1;