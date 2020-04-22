import jQuery from 'jquery';

var apiGeolocationSuccess = function(position) {
    console.log("apiGeolocationSuccess");
    // localStorage.setItem("lattitude",position.coords.latitude);
    // localStorage.setItem("longitude",position.coords.longitude);
    alert("API geolocation success!\n\nlat = " + position.coords.latitude + "\nlng = " + position.coords.longitude);
};
var tryAPIGeolocation = function() {
    jQuery.post( "https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyDCa1LUe1vOczX1hO_iGYgyo8p_jYuGOPU", function(success) {
        apiGeolocationSuccess({coords: {latitude: success.location.lat, longitude: success.location.lng}});
    })
        .fail(function(err) {
            alert("API Geolocation error! \n\n"+JSON.stringify(err));
        });
};

var browserGeolocationSuccess = function(position) {
    console.log("browserGeolocationSuccess");
    // localStorage.setItem("lattitude",position.coords.latitude);
    // localStorage.setItem("longitude",position.coords.longitude);
    alert("Browser geolocation success!\n\nlat = " + position.coords.latitude + "\nlng = " + position.coords.longitude);
};

var browserGeolocationFail = function(error) {
    console.log("browserGeolocationFail");
    console.log("error", error);
    if(error.code===1) {
        console.log("if statement");
        // tryAPIGeolocation();
    }
    switch (error.code) {
        case "3":
            alert("Browser geolocation error !\n\nTimeout.");
            break;
        case "1":
            if(error.message.indexOf("Only secure origins are allowed") === 0) {
                console.log("Permission Denied");
                tryAPIGeolocation();
            }
            break;
        case "2":
            // dirty hack for safari
            if(error.message.indexOf("Origin does not have permission to use Geolocation service") === 0) {
                tryAPIGeolocation();
            } else {
                alert("Browser geolocation error !\n\nPosition unavailable.");
            }
            break;
        default:
            console.log("default");
            // tryAPIGeolocation();
    }
};

var tryGeolocation = function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            browserGeolocationSuccess,
            browserGeolocationFail,
            {maximumAge: 50000, timeout: 20000, enableHighAccuracy: true});
    }
};


export default tryGeolocation;