import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Home from './Home';
import Category from './Category';
import './App.css';
import Expenses from './Expenses';
import Login from './Login';

class App extends Component {
  state = {  }
  render() { 
    return ( 
    <Router>
      <Switch>
        <Route path = '/' exact={true} component={Home}/>
        <Route path = '/categories' exact={true} component={Category}/>
        <Route path = '/expenses' exact={true} component={Expenses}/>
        <Route path = '/login' exact={true} component={Login}/>
      </Switch>
    </Router>
     );
  }
}

export default App;
