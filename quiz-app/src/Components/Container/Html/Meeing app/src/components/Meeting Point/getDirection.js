/* eslint-disable no-undef */
/* global google */
import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Marker, DirectionsRenderer, withScriptjs } from "react-google-maps"


class GetDirection extends Component {
  constructor() {
    super()
    
    this.state = {
      coords: {}
    };

    this.getDirections = this.getDirections.bind(this);
  }

  componentDidMount() {
    var ourLocation = JSON.parse(localStorage.getItem("ourLocation"))
    this.setState({coords: ourLocation})
  }



  getDirections() {
    const {coords} = this.state;
    const {venue} = this.props;
    const location = venue.location;
    const DirectionsService = new google.maps.DirectionsService();
   
      DirectionsService.route({
        origin: new google.maps.LatLng(coords.lat,coords.lng),
        destination: new google.maps.LatLng(location.lat, location.lng),
        travelMode: google.maps.TravelMode.DRIVING,
      }, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          this.setState({
            directions: result,
          });
        } else {
          alert("Sorry! Can't calculate directions!")
        }
      });
  }

  render() {
    const {coords, directions} = this.state;
    const {venue} = this.props;
    const location = venue.location;
    return(
      <div>
        <MyMapComponent 
          isMarkerShown 
          coords={coords}
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBhfIPH3mLzD0f-lBCkkSXBw8ON2S8SV70&v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `600px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          directions={directions}
          location={location}
          />

          <button onClick={this.getDirections}><h1>Get Directions</h1></button>
      </div>
   )
 }

}

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={14}
    center={{ lat: props.coords.lat, lng: props.coords.lng}}
  >

  <Marker position={{ lat: props.coords.lat, lng: props.coords.lng }} />
  <Marker position={{ lat: props.location.lat, lng:  props.location.lng }} />

  {props.directions && <DirectionsRenderer directions={props.directions} />}

  </GoogleMap>
))

export default GetDirection;