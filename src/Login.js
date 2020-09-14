import React,{Component} from "react";
import AppNav from './AppNav';
import { Container, FormGroup, Form, Button, Label, Input, Table} from "reactstrap";
import { Link } from "react-router-dom";
import BgImage from "./BgImage"


class Login extends Component {

    constructor(props){
        super(props);
   
        this.state = {
            fields: {username: '', password: ''},
            errors: {}
        }
         this.handleChange = this.handleChange.bind(this);
         this.submitUserLoginForm = this.submitUserLoginForm.bind(this);
    }

    handleChange(event) {
        let fields = this.state.fields;
        fields[event.target.name] = event.target.value;
        this.setState({
          fields
        });
  
      }

      async submitUserLoginForm(e) {
        e.preventDefault();
        console.log(" Fields: ",this.state)
        if (this.validateForm()) {
            console.log(this.state);
            let errors = {};
            const fields = this.state.fields;
            console.log(fields);

                await fetch('https://expense-calculator-react-ankit.herokuapp.com/api/login', {
                method: 'POST' ,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(fields)
        }).then((response) => {
          if(response.status===200){
            
            sessionStorage.setItem('username', fields.username)
            sessionStorage.setItem('message', '');

            //redirect to expenses after successful login
            this.props.history.push('/');
          }else if(response.status===401){
            errors["password"] = "*Invalid password, Please enter correct User credentials";
          } else{
            errors["username"] = "*user not found, Please register";

          }
          this.setState({
            errors: errors,
            fields: fields
          })
        }) ;   

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
                    <Form name="userLoginForm" onSubmit={this.submitUserLoginForm}>
                    <FormGroup >
                        <Label for="username">UserName</Label>
                        <Input type="text" name="username" id="username" value={this.state.fields.username} onChange={this.handleChange}/>
                        <div color="danger" className="errorMsg">{this.state.errors.username}</div>
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input type ="password" name="password" id="password" value={this.state.fields.password} onChange={this.handleChange}/>
                        <div color="danger" className="errorMsg">{this.state.errors.password}</div>
                    </FormGroup>
                    <FormGroup>
                        <Button color="primary" type="submit">Login</Button>{''}
                        <Button color="secondary" tag={Link} to='/register'>Register here</Button>
                    </FormGroup>
                    </Form>
                </Container>
        </div> 
        );
    }
}
 
export default Login;