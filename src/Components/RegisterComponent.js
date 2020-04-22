import React from 'react';
import { Col, Row, Button, Form, FormGroup, Label, Input, Card } from 'reactstrap';
import axios from 'axios';

class RegisterComponent extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            register: {
                email: '',
                password: '',
                address: '',
                address2: '',
                city: '',
                stateDetails: '',
                zip: '',
                mobile: '',
                type: ''
            }
        }
        this.registerUser = this.registerUser.bind(this);
    }

    registerUser(event){
        var type = '';
        if(this.bidder.checked){
            type = 'bidder';
        }
        else if(this.tenderer.checked){
            type = 'tenderer';
        }
        var user = {
            email: this.email.value,
            password: this.password.value,
            address: this.address.value,
            address2: this.address2.value,
            city: this.city.value,
            stateDetails: this.stateDetails.value,
            zip: this.zip.value,
            mobile: this.mobile.value,
            type: type
        };
        alert(user);
        // this.setState(prevState=>(
        //     {
        //         register: {
        //             ...prevState.register,
        //             email: this.email.value,
        //             password: this.password.value,
        //             address: this.address.value,
        //             address2: this.address2.value,
        //             city: this.city.value,
        //             stateDetails: this.stateDetails.value,
        //             zip: this.zip.value,
        //             mobile: this.mobile.value,
        //             type: "type"
        //         }
        //     }
        // ))
        // alert(JSON.stringify(this.state.register))

        axios.post('http://localhost:3000/customers/register',{
            user_email: user.email,
            user_pswd: user.password,
            user_address: user.address,
            user_address2: user.address2,
            user_city: user.city,
            user_stateDetails: user.stateDetails,
            user_mobile: user.mobile,
            user_type: user.type
        })
        .then((response)=>{
            alert(JSON.stringify(response))
            if(user.type === 'bidder'){
                localStorage.setItem("user_email",user.email)
                localStorage.setItem("user_id",response.data.user_id);
                window.location = '/browseProduct'
            }
            else if(user.type === 'tenderer'){
                localStorage.setItem("user_email",user.email)
                localStorage.setItem("user_id",response.data.user_id);
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
                <center><Label style={{fontSize:"20px"}}>Register Yourself!</Label></center>
                <Form onSubmit = {this.registerUser}>
                    <Row form>
                        <Col md={12}>
                            <FormGroup>
                                <Label for="exampleEmail">Email</Label>
                                <Input type="email" name="email" id="exampleEmail" placeholder="Email" innerRef={(email)=>this.email = email}/>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row form>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="examplePswd">Password</Label>
                                <Input type="password" name="pswd" id="examplePswd" placeholder="Password" innerRef={(password)=>this.password = password}/>
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="exampleRePswd">Re-Enter Password</Label>
                                <Input type="password" name="rePswd" id="exampleRePswd" placeholder="Re-Enter Password" innerRef={(rePassword)=>this.rePassword = rePassword}/>
                            </FormGroup>
                        </Col>
                    </Row>
                    <FormGroup>
                        <Label for="exampleAddress">Address</Label>
                        <Input type="text" name="address" id="exampleAddress" placeholder="1234 Main St" innerRef={(address)=>this.address = address}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleAddress2">Address 2</Label>
                        <Input type="text" name="address2" id="exampleAddress2" placeholder="Apartment, studio, or floor" innerRef={(address2)=>this.address2 = address2}/>
                    </FormGroup>
                    <Row form>
                        <Col md={5}>
                            <FormGroup>
                                <Label for="exampleCity">City</Label>
                                <Input type="text" name="city" id="exampleCity" placeholder="City" innerRef = {(city)=>this.city = city}/>
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="exampleStateDetails">State</Label>
                                <Input type="text" name="stateDetails" id="exampleStateDetails" placeholder="State" innerRef = {(stateDetails)=>this.stateDetails = stateDetails}/>
                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            <FormGroup>
                                <Label for="exampleZip">Zip</Label>
                                <Input type="text" name="zip" id="exampleZip" placeholder="Zip" innerRef = {(zip)=>this.zip = zip}/>
                            </FormGroup>
                        </Col>
                    </Row>
                    <FormGroup>
                        <Label for="exampleMobile">Mobile Number</Label>
                        <Input type="text" name="mobile" id="exampleMobile" placeholder="+91-XXX-XXX-XXXX" innerRef = {(mobile)=>this.mobile = mobile}/>
                    </FormGroup>
                    <Row>
                        <Col>
                            <Input type="checkbox" name="tenderer" id="exampleTenderer" innerRef = {(tenderer)=>this.tenderer = tenderer}/>
                            <Label for="exampleType">Tenderer</Label>
                        </Col>
                        <Col>
                            <Input type="checkbox" name="bidder" id="exampleBidder" innerRef = {(bidder)=>this.bidder = bidder}/>
                            <Label for="exampleType">Bidder</Label>
                        </Col>
                    </Row>
                    <hr/>
                    <Button>Register</Button>
                </Form>
            </Card>
        );
    }
}

export default RegisterComponent;