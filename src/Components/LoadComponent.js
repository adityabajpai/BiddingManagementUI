import React from 'react';
import {Switch, Route} from 'react-router-dom';
import HeaderComponent from './HeaderComponent';
import UploadProduct from './UploadProduct';
import MainComponent from './MainComponent';
import BrowseProduct from './BrowseProduct';
import PostBidComponent from './PostBidComponent';
import AboutUs from './AboutUs';
import ContactUs from './ContactUs';

class LoadComponent extends React.Component{
    render(){
        return(
            <div>
                <HeaderComponent/>
                <Switch>
                    <Route exact path = "/uploadProduct" component = {UploadProduct} />
                    <Route exact path = "/browseProduct" component = {BrowseProduct} />
                    <Route path = "/browseProduct/postBid" component = {PostBidComponent}/>
                    <Route exact path = "/aboutUs" component = {AboutUs} />
                    <Route exact path = "/contactUs" component = {ContactUs} />
                    <Route exact path = "/" component = {MainComponent} />
                </Switch>
            </div>
        );
    }
}

export default LoadComponent;