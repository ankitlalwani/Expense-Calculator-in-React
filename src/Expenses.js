import React,{Component} from "react";
import AppNav from './AppNav';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Container, FormGroup, Form, Button, Label, Input, Table, Badge, Nav} from "reactstrap";
import { Link } from "react-router-dom";
import Category from "./Category";
import Moment from 'react-moment';
import Bgslider from "./Bgslider"
import BgImage from "./BgImage"


class Expenses extends Component {

emptyItem = {
    title: '',
    date: new Date(),
    location: '',
    amount: '',
    user: {username:sessionStorage.getItem('username'),password:''},
    category: {id:0, categoryType:''},
}

constructor(props){
    super(props);
    this.state = { 
        date: new Date(),
        isLoading: true,
        Expenses: [],
        categories: [],
        item: this.emptyItem,
        errors: {}
     };

     this.addExpense = this.addExpense.bind(this);
     this.handleChange = this.handleChange.bind(this);
     this.handleChange1 = this.handleChange1.bind(this);
     this.dateChange = this.dateChange.bind(this);
}

    

     async componentDidMount(){
        const response = await fetch("/api/categories")
        const body = await response.json(); 
        console.log("Categories Response: ", body);
        const username = this.state.item.user.username;
        console.log('UserName from localvariable ', username);  
        const response1 = await fetch("/api/expenses/"+username)
        const body1 = await response1.json();
        this.setState({categories :body, isLoading :false, Expenses: body1});
    };

    
     dateChange(date){
     
         let item = {...this.state.item};
         item.date = date;
        this.setState({
          item
        });
      }
      

    async remove(id){

        await fetch('http://localhost:8080/api/expenses/'+id, {
            method: 'DELETE' ,
            headers: {
                'accepts': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(()=>{
            let updatedExpenses = [...this.state.Expenses].filter(i=>i.id!==id);
            this.setState({Expenses: updatedExpenses})
        })

    }

    
   async addExpense(event){
        event.preventDefault();
        const username = this.state.item.user.username;
        const {item} = this.state;
        
        if(username===null)
            {
                let errors = {};
                errors["username"] = "*Please login before adding any expenses";
                this.setState({
                    errors: errors,
                    item: item
                })
            }
        else
            {
            if (this.validateForm()) {
                await fetch('/api/expenses', {
                    method: 'POST' ,
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(item)
            });  
            console.log(this.state);
            window.location.reload();
            }
            
            }
               
        }



        handleChange(event){
            const target = event.target;
            const value = target.value;
            const name = target.name;
                console.log("name",name);
                console.log("value: ", value);
            let item = {...this.state.item};
            item[name] = value;
            console.log(item.category)
            this.setState({item});
            console.log(item)
        }

        handleChange1(event){
            const target = event.target;
            const value = target.value;
            const name = target.name;
            let item = {...this.state.item};
            item.category[name] = value;
            this.setState({item});
            console.log(item)
        }


        validateForm() {

            let fields = this.state.item;
            let errors = {};
            let formIsValid = true;
      
            if (!fields.title) {
              formIsValid = false;
              errors["title"] = "*Please enter expense title.";
            }
      
            if (fields.category.id===0) {
              formIsValid = false;
              errors["category"] = "*Please choose a category";
            }

            if (!fields.amount) {
                formIsValid = false;
                errors["amount"] = "*Please enter some amount";
              }

              if (!fields.location) {
                formIsValid = false;
                errors["location"] = "*Please specify the location";
              }
      
            this.setState({
              errors: errors
            });
            return formIsValid; 
      
          }


    render() {
        
    const {categories, isLoading, Expenses} = this.state;
        
    let categoryList = categories.map(category =>
        <option value = {category.id} name= {category.id} key={category.id} id={category.id}>
            {category.categoryType} 
        </option> )

    if(isLoading)
    return ( <div>Loading.....</div>)
        return ( 
            <div>
                <AppNav />
                <BgImage />
                
                <Container style={{backgroundColor:'lightgray'}}>
                    <div>
                    <h1 style={{fontFamily:'sans-serif', fontSize:30}}>{sessionStorage.getItem('message')}</h1>   
                    </div>

                    <Form onSubmit={this.addExpense}>
                    
                    <FormGroup >
                        <Label for="title">Title</Label>
                        <Input type="text" name="title" id="title" onChange={this.handleChange}/>
                        <div color="danger" className="errorMsg">{this.state.errors.title}</div>
                    </FormGroup>
                    <FormGroup>
                        <Label for="category">Category</Label>
                        <select selected={this.state.item.category.id} name="id" name2="categoryType" onChange={this.handleChange1} >
                            {categoryList} 
                        </select>
                        <div color="danger" className="errorMsg">{this.state.errors.category}</div>
                    </FormGroup>
                    <FormGroup>
                        <Label for="date">Expense Date</Label>
                        <DatePicker selected={this.state.item.date} onChange={this.dateChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="amount">Amount</Label>
                        <Input type="text" name="amount" id="amount" onChange={this.handleChange}/>
                        <div color="danger" className="errorMsg">{this.state.errors.amount}</div>
                    </FormGroup>
                    <FormGroup>
                        <Label for="location">Location</Label>
                        <Input type="text" name="location" id="location" onChange={this.handleChange}/>
                        <div color="danger" className="errorMsg">{this.state.errors.location}</div>
                    </FormGroup>
                    <FormGroup>
                        <Button color="primary" type="submit">Add Expense</Button>{''}
                        <Button color="secondary" tag={Link} to='/categories'>cancel</Button>
                    </FormGroup>
                        <div color="danger" className="errorMsg">{this.state.errors.username}</div>
                    </Form>
                    
                </Container>
                
                <Container style={{backgroundColor:'lightblue'}}>
                
                <h2><Badge variant="secondary">All Expenses</Badge> </h2>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>
                                Expense Title
                            </th>
                            <th>
                                Expense Date
                            </th>
                            <th>
                                Amount
                            </th>
                            <th>
                                Location
                            </th>
                            <th>
                                User
                            </th>
                            <th>
                                Expense Category
                            </th>
                            <th>
                                Action
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                    {
                       
                        Expenses.map(expense =>

                                <tr key={expense.id}>
                                    <td>
                                        {expense.title}
                                    </td>
                                    <td>
                                        <Moment format="YYYY/MM/DD">
                                        {expense.date}
                                        </Moment>
                                    </td>
                                    <td>
                                        {expense.amount}
                                    </td>
                                    <td>
                                        {expense.location}
                                    </td>
                                    <td>
                                        {expense.user.username}
                                    </td>
                                    <td>
                                        {expense.category.categoryType}
                                    </td>
                                    <td>
                                        <Button size="sm" color="danger" onClick={()=> this.remove(expense.id)}>Delete</Button>
                                    </td>
                                </tr>
                         
                        )

                    }
                    </tbody>
                    </Table>
                 
                </Container>

            </div>
         );
    }
}
 
export default Expenses;