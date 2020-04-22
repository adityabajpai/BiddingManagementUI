import React from 'react';
import axios from 'axios';
import { Row, Col, Card, Button, Label} from 'reactstrap';
import tryGeolocation from '../Service/location';

class BrowseProduct extends React.Component{

    componentDidMount(){
        this.getReddit();
        if(localStorage.getItem("lattitude") === null) {
            tryGeolocation();
        }
    }

    getReddit(){
        axios.get("http://localhost:3000/products/retrieveProduct")
        .then(res => {
            console.log(res.data.product);
            console.log(res.data.product.length);
            var length = res.data.product.length;
            this.setState({length})
            // var product = res.data.product.map(obj=>obj);
            // var todayTimeStamp = new Date();
            // var todayDate = todayTimeStamp.toLocaleDateString();
            // var tempBiddingEndDate = obj.product_bidding_EndDate.split("-");
            // var biddingEndDate = new Date(tempBiddingEndDate[2], tempBiddingEndDate[1]-1, tempBiddingEndDate[0]);
            var product = res.data.product.map(obj=>obj);
            // var product = [];
            // for (let i = 0; i < length; i++) {
            //     var temp = res.data.product[i];
            //     var todayTimeStamp = new Date();
            //     var todayDate = todayTimeStamp.toLocaleDateString();
            //     var tempBiddingEndDate = temp.product_bidding_EndDate.split("-");
            //     var biddingEndDate = new Date(tempBiddingEndDate[2], tempBiddingEndDate[1]-1, tempBiddingEndDate[0]);
            //     if(biddingEndDate>todayDate){
            //         product.push(temp);
            //     }
            // }
            // console.log(this.state.product);
            this.setState({product});
            
        })
        .catch(err => {
            console.log(err);
        })
    }

    postBid(product){
        if(localStorage.getItem("user_email")===null){
            alert("User not signed in")
        }
        else{
            var obj = {
                _id : product._id,
                product_id : product.product_id,
                product_name : product.product_name,
                product_img : product.product_img,
                product_bidding_price : product.product_bidding_price,
                product_description : product.product_description,
                product_bidding_EndDate : product.product_bidding_EndDate,
                product_userId : product.product_userId,
                product_userEmail : product.product_userEmail,
            }
            alert(obj);
            alert(JSON.stringify(obj))
            localStorage.setItem("_id", product._id);
            localStorage.setItem("product_id", product.product_id);
            localStorage.setItem("product_name", product.product_name);
            localStorage.setItem("product_img", product.product_img);
            localStorage.setItem("product_bidding_price", product.product_bidding_price);
            localStorage.setItem("product_description", product.product_description);
            localStorage.setItem("product_bidding_EndDate", product.product_bidding_EndDate);
            localStorage.setItem("product_userId", product.product_userId);
            localStorage.setItem("product_userEmail", product.product_userEmail);
            window.location = '/browseProduct/postBid/'+localStorage.getItem("_id");
        }
    }

    constructor(props){
        super(props);
        this.state = {
            product: [],
            length: '',
        };
        this.getReddit = this.getReddit.bind(this);
        // this.postBid = this.postBid.bind(this);
    }

    render(){
        const abc = this.state.product;
        console.log("abc",abc);
        var len = this.state.length;
        console.log("len", len);
        const productList = abc.map((product, idx)=>{
            // if(biddingEndDate>todayDate){
            return(
                <Col md={4} key={idx}>
                    <Card style={{margin:"10px", padding:"10px"}}>
                        <Row>
                            <Col md={12}>
                                <center><Label style={{margin:"10px"}}>{product.product_name}</Label></center>
                                <Card style={{height:"200px"}}>
                                    <img width="100%" height="250px" src="{product.product_img}" style={{padding:"20px"}} alt="Loading..."/>
                                </Card>
                                <Row style={{padding:"10px"}}>
                                    <Col>
                                        <Label><b>End Date</b></Label>&nbsp;&nbsp;
                                        <Label>{product.product_bidding_EndDate}</Label>
                                    </Col>
                                    <Col>
                                        <Label><b>Bidding Price</b></Label>&nbsp;&nbsp;
                                        <Label>{product.product_bidding_price}</Label>
                                    </Col>
                                </Row>
                                <Row style={{padding:"10px"}}>
                                    <Col>
                                        <Button color="primary" style={{width:"100%"}} onClick={this.postBid.bind(this,product, idx)}>Place Bid</Button>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            )
            // }
        })
        return(
            <Row>
                {productList}
            </Row>
        )
    }
}

export default BrowseProduct;