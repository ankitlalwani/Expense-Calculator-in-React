import React,{Component} from "react";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText
  } from 'reactstrap';



class AppNav extends Component {
    state = {  }
    render() { 
        return ( 
            <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">Expense Calculator</NavbarBrand>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/">Home</NavLink>
              </NavItem>
            <NavItem>
              <NavLink href="/categories">Categories</NavLink>
              </NavItem>
            <NavItem>
              <NavLink href="/expenses">Expenses</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/login">Login</NavLink>
            </NavItem>
            <NavItem className="d-flex justify-content-end">
              <NavLink href="https://github.com/ankitlalwani">GitHub</NavLink>
            </NavItem>
          </Nav>
      </Navbar>
    </div>

         );
    }
}

 
export default AppNav;