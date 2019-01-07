import React, { Component } from 'react';
import firebase from '../../config/firebase';
import { FormControl, Button } from 'react-bootstrap';
import TimePicker from 'react-time-picker';
import swal from 'sweetalert';
import GetDirection from "./getDirection"


var searchTimeout = "hello";
class MeetingPoint extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showButtons: false,
            showTime: false,
            showDirection: false,
            time: '10:00',
        }
        // this.search = this.search.bind(this);
        // this.searching = this.search.bind(this);
        this.sendReqforMeeting = this.sendReqforMeeting.bind(this);
    }


    componentDidMount() {
        const ourLocation = JSON.parse(localStorage.getItem("ourLocation"));
        const lat = ourLocation.lat;
        const lng = ourLocation.lng;
        const endPoint = "https://api.foursquare.com/v2/venues/explore?";
        const params = {
            client_id: "MX0NJKH5YJ4MZ40XEFXOJT2CVZSNDAS0CWJTA1YYQQ3QLWY4",
            client_secret: "GM0D225EODV0PC1FK0GUAG0V31TDL13AMWCFRIVHGERPFDP5",
            ll: `24.8832759,67.0643432`,
            query: "biryani",
            v: "20182507"
        }
        fetch(`${endPoint}client_id=${params.client_id}&client_secret=${params.client_secret}&ll=${lat},${lng}&v=20182507`)
            .then(resp => resp.json())
            .then(value => {
                this.setState({ recommendedVenues: value.response.groups[0].items });
            })
            .catch(err => console.log(err))

    }
    search = (event) => {
        var value = event.target.value;
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            this.searching(value);
        }, 500);
    }

    searching = (value) => {
        const ourLocation = JSON.parse(localStorage.getItem("ourLocation"));
        const lat = ourLocation.lat;
        const lng = ourLocation.lng;
        const endPoint = "https://api.foursquare.com/v2/venues/search?";
        const params = {
            client_id: "MX0NJKH5YJ4MZ40XEFXOJT2CVZSNDAS0CWJTA1YYQQ3QLWY4",
            client_secret: "GM0D225EODV0PC1FK0GUAG0V31TDL13AMWCFRIVHGERPFDP5",
            ll: `24.8832759,67.0643432`,
            query: value,
            v: "20182507"
        }
        fetch(`${endPoint}client_id=${params.client_id}&client_secret=${params.client_secret}&ll=${lat},${lng}&v=20182507&query=${params.query}`)
            .then(resp => resp.json())
            .then(items => {
                this.setState({ searchedVenue: (items.response.venues) });
            })
            .catch(err => console.log(err))
    }

    // componentDidMount(){
    //     const db = firebase.firestore();
    // }

    showDate(venue) {
        const { showTime } = this.state;
        console.log(venue);
        this.setState({ showTime: !showTime, venue })
    }
    onChange = time => {
        console.log("time--->", time);
        this.setState({ time });
    }
    calendar = (e) => {
        console.log(e.target.value);
        this.setState({ date: e.target.value })
    }
    sendReqforMeeting() {
        const { venue, time, date } = this.state;
        const { selectedUser } = this.props;
        const receiverToken = selectedUser.token;
        const receiverId = selectedUser.userId;
        const receiverPhoto = selectedUser.fbProfile
        console.log("receiver==>", receiverToken, receiverId, receiverPhoto);
        const result = JSON.parse(localStorage.getItem("result"));
        console.log("result", result);
        const senderToken = result.credential.accessToken;
        const senderId = result.user.uid;
        const senderName = result.user.displayName;
        const senderPhoto = result.user.photoURL
        const status = "Pending";
        console.log("sender==>", senderId);
        const db = firebase.firestore();
        db.collection("meetingSet").doc(senderId)
            .set({ selectedUser, receiverPhoto, receiverId, receiverToken, senderPhoto, senderId,senderName, senderToken, venue, time, date,status })
            .then((resp) => {
                console.log(resp);
                swal("Request Send!", "Your meeting request is send successfully!", "success");
            })
            .catch((error) => {
                alert("Error!", "" + error.message + "", "error");
            })
            this.props.meetingEnd();
            
    }


    render() {
        const { recommendedVenues, searchedVenue, showButtons, venueIndex, showTime, showDirection } = this.state;
        // console.log("recommendedVenues",recommendedVenues)
        console.log("searchedVenue", searchedVenue);
        return (
            <div>
                <strong>Search for any other places if want</strong>
                <FormControl type="text" placeholder="Search for other Venues" onChange={this.search} />



                {!searchedVenue && <h3>Nearest 3 Venues from your location</h3>}
                {recommendedVenues && !searchedVenue && recommendedVenues.map((value, index) => {
                    return (index < 3) &&
                        <div>
                            <h3 className="location-venue" onClick={() => this.setState({ showButtons: !showButtons, venueIndex: index })}>
                                Venue : {value.venue.name}</h3>
                            <li className="location-address">Address : {value.venue.location.address}</li>
                            {venueIndex === index && showButtons && <span><br />
                                <Button bsStyle="success" onClick={this.showDate.bind(this, value.venue)} style={{ margin: "0px 4px 0 4px" }}>Next</Button>
                                <Button bsStyle="primary" onClick={() => this.setState({ showDirection: !showDirection })}>Get direction</Button></span>}
                            {showTime && showButtons && venueIndex === index &&
                                <div><br />
                                    <strong>Select the date and time for meeting</strong><br />
                                    <TimePicker onChange={this.onChange} value={this.state.time} />
                                    <FormControl type="date" bsSize="sm" onChange={this.calendar} /><br />
                                    <Button bsStyle="success" onClick={this.sendReqforMeeting}>Send Request</Button>
                                </div>}<br />
                            {showDirection && venueIndex === index && showButtons && <GetDirection venue={value.venue} />}
                        </div>
                })}
                {searchedVenue && searchedVenue.map((value, index) => {
                    return <div>
                        <h3 className="location-venue" onClick={() => this.setState({ showButtons: !showButtons, venueIndex: index })}>
                            Venue : {value.name}</h3>
                        <li className="location-address">Address : {value.location.address}</li>
                        {venueIndex === index && showButtons && <span><br />
                            <Button bsStyle="success" onClick={this.showDate.bind(this, value)} style={{ margin: "0px 4px 0 4px" }}>Next</Button>
                            <Button bsStyle="primary" onClick={() => this.setState({ showDirection: !showDirection })}>Get direction</Button></span>}
                        {showTime && showButtons && venueIndex === index &&
                            <div><br />
                                <strong>Select the date and time for meeting</strong><br />
                                <TimePicker onChange={this.onChange} value={this.state.time} />
                                <FormControl type="date" bsSize="sm" onChange={this.calendar} /><br />
                                <Button bsStyle="success" onClick={this.sendReqforMeeting}>Send Request</Button>
                            </div>}<br />
                        {showDirection && venueIndex === index && showButtons && <GetDirection venue={value} />}
                        <br/>
                    </div>
                })}



            </div>
        );
    }
}

export default MeetingPoint;