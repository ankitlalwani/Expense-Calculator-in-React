import React,{Component} from "react";
import AppNav from './AppNav';
import { Container, FormGroup, Form, Button, Label, Input, Table, Badge} from "reactstrap";
import { Link } from "react-router-dom";
import Bgslider from "./Bgslider"
import BgImage from "./BgImage";





class Register extends Component {

    constructor(props){
        super(props);
   
        this.state = {
            usernameList: [],
            fields: {username: '', password: '', emailid: ''},
            errors: {}
        }
         this.handleChange = this.handleChange.bind(this);
         this.submituserRegistrationForm = this.submituserRegistrationForm.bind(this);
    }

    handleChange(event) {
        let fields = this.state.fields;
        fields[event.target.name] = event.target.value;
        this.setState({
          fields
        });
  
      }

    async  submituserRegistrationForm(e) {
        e.preventDefault();
        console.log(" Fields: ",this.state)
        if (this.validateForm()) {
            const fields = this.state.fields;
            let errors = {};
            console.log(fields);

        const response = await fetch("https://expense-calculator-ankit.herokuapp.com/api/allUsers")
        const body = await response.json(); 
        const userExist = body.filter(user=>user.username===fields.username);

        if(userExist.length!==0){
            errors["username"] = "*The user already exists, please choose another username";
            this.setState({
                fields: fields,
                errors: errors
              });
        }else{
            
            await fetch('https://expense-calculator-ankit.herokuapp.com/api/addUser',{
                method: 'POST' ,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(fields)
            }).then((response)=>{

                if(response.status===201){
            
                    sessionStorage.setItem('username', fields.username);
                    sessionStorage.setItem('message', 'User Registration Successful, please add your expenses');
        
                    //redirect to expenses after successful login
                    this.props.history.push('/expenses');
                  } else{
                    alert('some error occurred');
                  }
            });
        }

        }
  
      }

      validateForm() {

        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;
  
        if (!fields["username"]) {
          formIsValid = false;
          errors["username"] = "*Please enter your username.";
        }
  
        if (typeof fields["username"] !== "undefined") {
          if (!fields["username"].match(/^[a-zA-Z0-9 ]*$/)) {
            formIsValid = false;
            errors["username"] = "*Please enter alphabet characters only.";
          }
        }

        if (!fields["emailid"]) {
            formIsValid = false;
            errors["emailid"] = "*Please enter your email-ID.";
          }
    
          if (typeof fields["emailid"] !== "undefined") {
            //regular expression for email validation
            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!pattern.test(fields["emailid"])) {
              formIsValid = false;
              errors["emailid"] = "*Please enter valid email-ID.";
            }
          }
  
        if (!fields["password"]) {
          formIsValid = false;
          errors["password"] = "*Please enter your password.";
        }
  
        if (typeof fields["password"] !== "undefined") {
          if (!fields["password"].match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {
            formIsValid = false;
            errors["password"] = "*Please enter secure and strong password. Should have at least 1 capital letter, digit and alphanumeric letter.";
          }
        }
  
        this.setState({
          errors: errors
        });
        return formIsValid;
  
  
      }


    render() { 
        return (
        <div>
            <AppNav />
            <BgImage />
            <Container style={{backgroundColor:'lightgray'}}>
              <h1 style={{fontFamily:'sans-serif', fontSize:30}}>Enter your details to Register</h1>
                    <Form name="userRegistrationForm" onSubmit={this.submituserRegistrationForm}>
                    <FormGroup >
                        <Label for="username">Enter UserName</Label>
                        <Input type="text" name="username" id="username" value={this.state.fields.username} onChange={this.handleChange}/>
                        <div color="danger" className="errorMsg">{this.state.errors.username}</div>
                    </FormGroup>
                    <FormGroup >
                        <Label for="emailid">Your emailid</Label>
                        <Input type="text" name="emailid" id="emailid" value={this.state.fields.emailid} onChange={this.handleChange}/>
                        <div className="errorMsg">{this.state.errors.emailid}</div>
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input type ="password" name="password" id="password" value={this.state.fields.password} onChange={this.handleChange}/>
                        <div color="danger" className="errorMsg">{this.state.errors.password}</div>
                    </FormGroup>
                    <FormGroup>
                        <Button color="primary" type="submit">Register</Button>{''}
                    </FormGroup>
                    </Form>
                </Container>
        </div> 
        );
    }
}
 
export default Register;