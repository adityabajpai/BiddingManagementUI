import React from 'react';
import { Row, Col, Card, Button, Label, Input, Form} from 'reactstrap';
import axios from 'axios';

class PostBidComponent extends React.Component{

    componentDidMount(){

        this.loadList();

        setTimeout(()=>{
            this.loadList();
        },10000);

        this.loadData();

        setTimeout(()=>{
            this.loadData();
        },10000)
    }

    constructor(props){
        super(props);
        this.state = {
            bids: [],
            bidder_email: '',
            bid_price: ''
        }
        this.postBid = this.postBid.bind(this);
        this.loadData = this.loadData.bind(this);
        this.loadList = this.loadList.bind(this);
    }

    loadData(){
        axios.get('http://localhost:3000/bid/maxBid/'+localStorage.getItem("_id"))
        .then(res=>{
            console.log(res);
            var len = res.data.bids.length;
            if(len>0){
                var bidder_email = res.data.bids[len-1].bidder_email;
                var bid_price = res.data.bids[len-1].bid_price;
                this.setState({bidder_email});
                this.setState({bid_price});
            }
            // alert(len);
            // alert(res.data.bids[len-1].bidder_email);
            // alert(res.data.bids[len-1].bid_price);
        })
        .catch(err=>{
            console.log(err);
        })
    }

    loadList(){
        console.log("url",'http://localhost:3000/bid/getBid/'+localStorage.getItem("_id"));
        
        axios.get('http://localhost:3000/bid/getBid/'+localStorage.getItem("_id"))
        .then(res=>{
            var bids = res.data.bids.map(obj=>obj);
            this.setState({bids});
        })
        .catch(err=>{
            alert(err)
        })
    }

    postBid(event){
        alert(this.newBid.value);
        axios.post('http://localhost:3000/bid/postBid',{
            tenderer_email: localStorage.getItem("product_userEmail"),
            bidder_email: localStorage.getItem("user_email"),
            bid_price: this.newBid.value,
            product_id: localStorage.getItem("_id").toString()
        })
        .then((response)=>{
            // var newBid = {
            //     tenderer_email: localStorage.getItem("product_userEmail"),
            //     bidder_email: localStorage.getItem("user_email"),
            //     bid_price: this.newBid.value,
            //     product_id: localStorage.getItem("_id").toString()
            // }
            alert(JSON.stringify(response))
        })
        .catch((error)=>{
            console.log(error);
            alert(JSON.stringify(error))
        })
        event.preventDefault();
        window.location = '/browseProduct/postBid';
    }

    render(){
        const abc = this.state.bids;
        const bidList = abc.map((bids, idx)=>{
            return(
                <tr key={idx}>
                    <th scope="row">{idx+1}</th>
                    <td>{bids.bidder_email}</td>
                    <td>{bids.bid_price}</td>
                </tr>
            )
        })
        setTimeout(()=>{
            this.loadData();
        },10000);
        setTimeout(()=>{
            this.loadList();
        },10000);
        return(
            <div>
                <Col md={12}>
                    <Card style={{margin:"10px", padding:"10px"}}>
                        <Row>
                            <Col md={4}>
                                <center><Label style={{margin:"10px"}}>{localStorage.getItem("product_name")}</Label></center>
                                <Card style={{height:"200px"}}>
                                    <img width="100%" height="250px" src={localStorage.getItem("product_img")} style={{padding:"20px"}} alt="Loading..."/>
                                </Card>
                                <Row style={{padding:"10px"}}>
                                    <Col>
                                        <Label><b>End Date</b></Label>&nbsp;&nbsp;
                                        <Label>{localStorage.getItem("product_bidding_EndDate")}</Label>
                                    </Col>
                                    <Col>
                                        <Label><b>Bidding Price</b></Label>&nbsp;&nbsp;
                                        <Label>{localStorage.getItem("product_bidding_price")}</Label>
                                    </Col>
                                </Row>
                                <Form onSubmit={this.postBid}>
                                    <Row style={{padding:"10px"}}>
                                        <Col>
                                            <Input type="number" name="newBid" id="exampleNewBid" placeholder="newBid" innerRef = {(newBid)=>this.newBid = newBid}/>
                                        </Col>
                                        <Col>
                                            <Button color="primary" style={{width:"100%"}}>Place Bid</Button>
                                        </Col>
                                    </Row>
                                </Form>
                                <Row>
                                    <div style={{margin:"15px"}}>
                                        <Label><b>Highest Bidder</b></Label>
                                        <table className="table table-bordered table-striped mb-0">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Bidder</th>
                                                    <th scope="col">Bid Price</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>{this.state.bidder_email}</td>
                                                    <td>{this.state.bid_price}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </Row>
                            </Col>
                            <Col md={4} style={{marginTop:"10px"}}>
                                <center style={{position:"relative",height:"300px",overflow:"auto", display:"block"}}><Label>{localStorage.getItem("product_description")}</Label></center>
                            </Col>
                            <Col md={4}>
                                <Row style={{margin:"6px"}}>
                                    <label><b>Tenderer-</b></label>&nbsp;&nbsp;
                                    <label>{localStorage.getItem("product_userEmail")}</label>
                                </Row>
                                <div style={{position:"relative",height:"320px",overflow:"auto", display:"block"}}>
                                    <table className="table table-bordered table-striped mb-0">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Bidder</th>
                                                <th scope="col">Bid Price</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {bidList}
                                        </tbody>
                                    </table>
                                </div>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </div>
        )
    }
}

export default PostBidComponent;