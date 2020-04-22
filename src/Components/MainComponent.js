import React from 'react';
import {Row, Col} from 'react-bootstrap';
import RegisterComponent from './RegisterComponent';
import LoginComponent from './LoginComponent';
import tryGeolocation from '../Service/location';

class MainComponent extends React.Component{

    componentDidMount(){
        tryGeolocation();
        if(localStorage.length===0) {

        }
        else {
            window.location = '/browseProduct'
        }
    }

    render(){
        return(
            <div className="container">
                <Row>
                    <Col>
                        <RegisterComponent/>
                    </Col>
                    <Col>
                        <LoginComponent/>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default MainComponent;