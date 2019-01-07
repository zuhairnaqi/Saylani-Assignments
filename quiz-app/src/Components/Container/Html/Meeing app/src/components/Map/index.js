import React, { Component } from 'react';
import firebase from './config/firebase';
import {Button,Image} from 'react-bootstrap';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";

var db = firebase.firestore();
var provider = new firebase.auth.FacebookAuthProvider();
class Map extends Component {
  constructor() {
    super();
    this.state = {
      coords:'',
    }

    this.showMapSection = this.showMapSection.bind(this);
    this.location = this.location.bind(this);
  }

  showMapSection(){
    this.setState({showMapSection:true})
  }
  location(){{this.setState({setLocation:true})}}
  setPosition(){
    navigator.geolocation.getCurrentPosition(position => {
      console.log('getCurrentPosition',position.coords);
      this.setState({coords : position.coords})
    })
  }
  updateCoords({latitude,longitude}){
    console.log("updateCoords",latitude);
    console.log("updateCoords",longitude);
    this.setState({coords:{latitude,longitude}});
  }
  locationToDb = ()=>{
    this.setState({dashboard:true})
    // const{coords} = this.state;
    // const result = JSON.parse(localStorage.getItem("result"));
    // var userId = result.user.uid;
    // db.collection("userProfile").add({userId,latitude:coords.latitude,longitude:coords.longitude})
    // .then((resp)=>{
    //   console.log(resp);
    //   alert("Your selected location saved successfully!");
  // })
  // .catch((error) =>{
  //     alert("Error!", ""+error.message+"", "error");
  // })
  }

  render() {
    const {login,coords,showMapSection,setLocation,setLatitude,SetLongitude,dashboard} = this.state;

    const result = JSON.parse(localStorage.getItem("result"));
    if(result){
      var fbName = result.user.displayName;
      var fbProfile = result.user.photoURL}
    
    return (
      <div >
            <header className='App'>
                <h1 id='header-h1'> Welcome to Meeting App</h1>
                <span>{fbName} <Image src={fbProfile} circle /></span>
              </header>
            <br/>
            {/* {!login && <div><h4>Please Login with your facebook account</h4>
              <Button bsStyle="primary" onClick={this.login}>Login</Button>
            </div>} */}

        {showMapSection && !setLocation &&
        <div>
            <h2 style={{color:'green'}}>Your Profile is Completed!</h2>
            <h3>Now set location for Meeting place</h3>
            <Button bsStyle="success" onClick={this.location}>Set Location</Button>
        </div>
         }

       {/* {!showMapSection && login && <Profile showMapSection={this.showMapSection}/>} */}

        {setLocation && <div id="map">
          <MyMapComponent
          isMarkerShown
          googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `600px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          coords={coords}
          updateCoords={this.updateCoords}
        />
        <Button bsStyle="success" onClick={this.locationToDb}>Submit</Button>
        </div>}
        {dashboard && <Dashboard />}

      </div>
    );
  }
}
const MyMapComponent = withScriptjs(withGoogleMap((props) =>
      <GoogleMap
        defaultZoom={15}
        defaultCenter={{ lat: props.coords.latitude, lng: props.coords.longitude }}
      >
        {props.isMarkerShown && <Marker
         position={{ lat: props.coords.latitude, lng: props.coords.longitude }} 
        draggable={true}
        onDragEnd = {(pos)=>{
          console.log('drag end**',pos.latLng.lat(),pos.latLng.lng());
          props.updateCoords({latitude: pos.latLng.lat(), longitude :pos.latLng.lng()});
        }
        }
         />}
      </GoogleMap>
    ))
export default App;