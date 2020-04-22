import React, { Component } from 'react';
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Button} from 'reactstrap';
import {NavLink} from 'react-router-dom';

class HeaderComponent extends Component {
  constructor(props){
    super(props);
    this.state = {
      isNavOpen: false,
    };
    this.logoutUser = this.logoutUser.bind(this);
    this.toggleNav = this.toggleNav.bind(this);
  }

  componentDidMount(){
    if(window.location.href==="http://localhost:3001/"){
      document.getElementById('logoutButton').style.visibility = 'hidden'
    }
    else {
      document.getElementById('logoutButton').style.visibility = 'visible'
    }
  }

  toggleNav(){
    this.setState({
      isNavOpen: !this.state.isNavOpen,
    });
  }

  logoutUser(){
    localStorage.setItem("user_email","")
    localStorage.setItem("user_id","");
    localStorage.setItem("_id", "");
    localStorage.setItem("product_id", "");
    localStorage.setItem("product_name", "");
    localStorage.setItem("product_img", "");
    localStorage.setItem("product_bidding_price", "");
    localStorage.setItem("product_description", "");
    localStorage.setItem("product_bidding_EndDate", "");
    localStorage.setItem("product_userId", "");
    localStorage.setItem("product_userEmail", "");
    localStorage.removeItem("user_email");
    localStorage.removeItem("user_id");
    localStorage.removeItem("_id");
    localStorage.removeItem("product_id");
    localStorage.removeItem("product_name");
    localStorage.removeItem("product_img");
    localStorage.removeItem("product_bidding_price");
    localStorage.removeItem("product_description");
    localStorage.removeItem("product_bidding_EndDate");
    localStorage.removeItem("product_userId");
    localStorage.removeItem("product_userEmail");
    localStorage.removeItem("product");
    window.location = '/';
  }

  render() {
    return(
    <React.Fragment>
      <Navbar dark expand="md" style={{background:"rgb(143, 95, 226)"}}>
        <div className="container">
          <NavbarToggler onClick={this.toggleNav} />
          <NavbarBrand className="mr-auto" href="/">
            <img src="assets/images/logo.png" height="30" width="41" alt = "Bidding Management"/>
          </NavbarBrand>
          <Collapse isOpen={this.state.isNavOpen} navbar>
            <Nav navbar>
              <NavItem>
                <NavLink className="nav-link" to="/browseProduct">
                  <span style={{color:"#fff"}} className="fa fa-home fa-lg">BrowseProduct</span> 
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link" to="/uploadProduct">
                  <span style={{color:"#fff"}} className="fa fa-list fa-lg">Upload Product</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link" to="/aboutUs">
                  <span style={{color:"#fff"}} className="fa fa-info fa-lg">About Us</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link" to="/contactUs">
                  <span style={{color:"#fff"}} className="fa fa-address-card fa-lg">Contact Us</span>
                </NavLink>
              </NavItem>
            </Nav>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <Button outline onClick={this.logoutUser} id="logoutButton">
                    <span style={{color:"#fff"}} className="fa fa-sign-in fa-lg">Logout</span>
                </Button>
              </NavItem>
            </Nav>
          </Collapse>
        </div>
      </Navbar>
    </React.Fragment>
    );
  }
}

export default HeaderComponent;