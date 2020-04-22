import React from 'react';
import { Col, Row, Button, Form, FormGroup, Label, Input, Card } from 'reactstrap';
import axios from 'axios';

class LoginComponent extends React.Component{
    constructor(props){
        super(props);
        this.loginUser = this.loginUser.bind(this);
    }

    loginUser(event){
        var user = {
            email: this.email.value,
            password: this.password.value
        }
        alert(user);
        axios.post('http://localhost:3000/customers/login',{
            user_email: user.email,
            user_pswd: user.password
        })
        .then((response)=>{
            alert(JSON.stringify(response));
            var type = response.data.type;
            alert(type);
            localStorage.setItem("user_email", user.email);
            if(type === 'bidder'){
                window.location = '/browseProduct'
            }
            else if(type === 'tenderer'){
                window.location = '/browseProduct';
            }
        })
        .catch((error)=>{
            console.log(error);
            alert(JSON.stringify(error))
        })
        event.preventDefault();
    }

    render(){
        return(
            <Card style={{padding:"25px", marginTop:"30px"}}>
                <center><Label style={{fontSize:"20px"}}>Login Yourself!</Label></center>
                <Form onSubmit={this.loginUser}>
                    <Row form>
                        <Col md={12}>
                            <FormGroup>
                                <Label for="exampleEmail">Email</Label>
                                <Input type="email" name="email" id="exampleEmail" placeholder="Email" innerRef={(email)=>this.email = email}/>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row form>
                        <Col md={12}>
                            <FormGroup>
                                <Label for="examplePassword">Email</Label>
                                <Input type="password" name="password" id="examplePassword" placeholder="Password" innerRef={(password)=>this.password = password}/>
                            </FormGroup>
                        </Col>
                    </Row>
                    <hr/>
                    <Button>Log in</Button>
                </Form>
            </Card>
        );
    }
}

export default LoginComponent;