import React from 'react';
import { Col, Row, Button, Form, FormGroup, Label, Input, Card } from 'reactstrap';
import axios from 'axios';

class UploadProduct extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            selectedFile: ''
        }
        this.uploadProduct = this.uploadProduct.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
    }

    uploadProduct(event){
        if(localStorage.getItem("user_email")===null){
            alert("User not signed in")
        }
        else{
            const data = new FormData() 
            console.log("file",this.state.selectedFile);
            data.append('product_img', this.state.selectedFile)
            alert('hrllo')
            var tempDate = this.endDate.value;
            alert(tempDate)
            var dateParts = tempDate.split("-");
            var biddinEndDate = new Date(dateParts[0], dateParts[1]-1, dateParts[2]);
            alert(biddinEndDate.toLocaleDateString());
            var date = biddinEndDate.toLocaleDateString();
            var product = {
                name : this.name.value,
                description : this.description.value,
                date: date,
                biddingPrice : this.biddingPrice.value,
                image: data
            }
            console.log(JSON.stringify(product));
            alert(JSON.stringify(product));
            axios.post('http://localhost:3000/products/uploadImage', data, { 
            })
            .then(res => { // then print response status
                console.log(res)
            })
            .catch(err=>{
                console.log(err);
            })

            axios.post('http://localhost:3000/products/uploadProduct', { 
                product_name: product.name,
                product_bidding_price : product.biddingPrice,
                product_description: product.description,
                product_bidding_EndDate: product.date,
                product_userId: localStorage.getItem("user_id"),
                product_userEmail: localStorage.getItem("user_email")
            })
            .then(res => { // then print response status
                console.log(res)
            })
            .catch(err=>{
                console.log(err);
            })
        }

        event.preventDefault();
    }

    onChangeHandler=event=>{
        console.log("hello","hello");
        console.log(event.target.files[0]);
        this.setState({
            selectedFile: event.target.files[0],
            loaded: 0,
        })
    }
    
    render(){
        return(
            <Card style={{padding:"35px", margin:"30px", borderWidth:"1px"}}>
                <center><Label style={{fontSize:"20px"}}>Upload Product</Label></center>
                <Form onSubmit = {this.uploadProduct}>
                    <Row form>
                        <Col md={12}>
                            <FormGroup>
                                <Label for="exampleName">Name</Label>
                                <Input type="text" name="name" id="exampleName" placeholder="Name of Product" innerRef={(name)=>this.name = name}/>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row form>
                        <Col md={12}>
                            <FormGroup>
                                <Label for="exampleDescription">Description</Label>
                                <Input type="textarea" name="description" id="exampleDescription" placeholder="Description..." innerRef={(description)=>this.description = description}/>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row form>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="exampleEndDate">Bidding End Date</Label>
                                <Input type="date" name="endDate" id="exampleEndDate" innerRef={(endDate)=>this.endDate = endDate}/>
                            </FormGroup>
                        </Col>
                        <Col md={2}>
                            <FormGroup>
                                <Label for="exampleBiddingPrice">Bidding Price</Label>
                                <br/>
                                <Input type="number" name="biddingPrice" id="exampleBiddingPrice" innerRef={(biddingPrice)=>this.biddingPrice = biddingPrice}/>
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="exampleProductImage">Product Image</Label>
                                <br/>
                                <input type="file" name="file" onChange={this.onChangeHandler}/>
                            </FormGroup>
                        </Col>
                    </Row>
                    <hr/>
                    <Button>Upload</Button>
                </Form>
            </Card>
        );
    }
}

export default UploadProduct;