import React, { Component } from 'react';
import firebase from '../../config/firebase';
import {Button} from 'react-bootstrap';
import Wrapper from './Wrapper'
// import Swing from "react-swing"
import {Image} from 'react-bootstrap';
import MeetingPoint from '../Meeting Point';
import PushNotification from "./PushNotification";


const db = firebase.firestore();
db.settings({timestampsInSnapshots : true});
class Dashboard extends Component {
constructor(){
    super();
    this.state={
        matchedUsers : [],
        listOfMeetings:[],
        notificationsList:[],
        endMeeting:true
    }
    this.matchBeverages = this.matchBeverages.bind(this);
}
componentDidMount(){
    const {notificationsList} = this.state;
    var myId = localStorage.getItem("userId");
    db.collection("meetingSet").where("receiverId","==",myId)
    .get()
    .then(querySnapshot =>{
        console.log("query snapshot",querySnapshot)
        querySnapshot.docs.forEach(doc => {
            // console.log(doc.data());
            notificationsList.push(doc.data())
            this.setState({notifyMe : true,notificationsList})
        })
    })
    .catch(error => {
        console.log("Error getting documents: ", error);
    });

    
    // db.collection("meetingSet").doc("Haider")
    // .set({ Name:"Pashha bhai" })
    // .then((resp) => {
    //     console.log(resp);
    //     alert("Request Send!", "Your meeting request is send successfully!", "success");
    // })
    // .catch((error) => {
    //     alert("Error!", "" + error.message + "", "error");
    // })
    // db.collection("meetingSet").doc(myId).update({Name: "hammad"});
}



matchBeverages(){
    const {matchedUsers} = this.state;
    var user_beverages = JSON.parse(localStorage.getItem("beverages"));
    var user_duration = JSON.parse(localStorage.getItem("bev-duration"));

    // db.settings({timestampsInSnapshots : true});
    db.collection("userProfile").get()
    .then(snapshot => {
        snapshot.docs.forEach(doc=> {
            var beverages = doc.data().beverages;
            var duration = doc.data().totalMin;
            var userId = doc.data().userId;
            var myId = localStorage.getItem("userId");
            if((beverages.includes(user_beverages[0]) || beverages.includes(user_beverages[1]) 
            || beverages.includes(user_beverages[2]))
            && 
            (duration.includes(user_duration[0]) || duration.includes(user_duration[1]) 
            || duration.includes(user_duration[2]))
            &&
            (userId !== myId)){
                matchedUsers.push(doc.data());
                console.log(matchedUsers);
                this.setState({matchedUsers,endMeeting:false})
            }
        })
    })

}
selectedTheUser= (items)=>{
    this.setState({selectedTheUser:true,selectedUser:items})
}
meetingEnd = ()=>{
    this.setState({endMeeting:true})
}
dekhao = ()=>{
    const {listOfMeetings} = this.state;
    const myId = localStorage.getItem("userId");
    // const db = firebase.firestore();
    // db.settings({timestampsInSnapshots : true});
    db.collection("meetingSet").get()
    .then(snapshot =>{
        snapshot.docs.forEach(doc=>{
            if(doc.data().senderId === myId){
                console.log("listOfMeetings",doc.data());
                listOfMeetings.push(doc.data());
                this.setState({listOfMeetings})
            }
        })
    })
}
 
render(){
    const {matchedUsers,selectedTheUser,selectedUser,endMeeting,listOfMeetings,notifyMe,notificationsList} = this.state;
    console.log("notificationsList",notificationsList);
    return(
        <div>
             {(matchedUsers.length === 0) && !endMeeting && <div>
             <h4>You haven’t done any meeting yet!”, try creating a new meeting!</h4>
            <Button bsStyle="primary" onClick={this.matchBeverages}>Set a meeting!</Button></div>}

        {(matchedUsers.length !==0) && !selectedTheUser && <Wrapper matchedUsers={matchedUsers} selectedTheUser={this.selectedTheUser}/>}
                
               {!endMeeting && selectedTheUser && <MeetingPoint selectedUser={selectedUser} meetingEnd={this.meetingEnd}/>}
               {endMeeting && <Button bsStyle="primary" onClick={this.matchBeverages}>Set a new meeting!</Button>}
               <br/><br/>
                {endMeeting && <Button bsStyle="info" onClick={this.dekhao}>Show list of meetings</Button>}
                {listOfMeetings.length !== 0 && listOfMeetings.map(value=>{
                    return <div id="list-div">
                            {/* <img src={value.selectedUser.image2Url} style={{display:"inline",width:"30px"}}/> */}
                            <Image src={value.selectedUser.image1Url} circle style={{display:"inline",width:"100px",padding:"5px",marginTop:"10px"}}/>
                            <h3>{value.selectedUser.fbName}</h3>
                            <h4 style={{display:"inline"}}>({value.selectedUser.nickName})</h4>
                            <p>{value.status}</p>
                            <span>Venue : {value.venue.name}</span>
                            <p id="list-time">Date : {value.time} / {value.date}</p>
                        </div>
                })}

                


                {notifyMe && notificationsList.map(value => {
                    return <div>
                            <PushNotification value={value}/>
                        </div>
                })}
        </div>
    );
}
}

export default Dashboard;
