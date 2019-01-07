import React, { Component } from 'react';
import FirstProfile from './1Profile'
import SecondProfile from './2Profile'
import ThirdProfile from './3Profile'
import firebase from '../../config/firebase';
import {Button} from 'react-bootstrap';

class Profile extends Component {
    constructor(){
        super();
        this.state={

        }
        this.getFirstData =this.getFirstData.bind(this);
        this.getSecondData = this.getSecondData.bind(this);
        this.getThirdData = this.getThirdData.bind(this);
        this.uploadData = this.uploadData.bind(this);
    }
    getFirstData(nickName,phoneNum){this.setState({nickName:nickName,phoneNum:phoneNum})}
    getSecondData(distroy2nd){ this.setState({distroy2nd:distroy2nd}) }
    getThirdData(totalImg,totalMin){
        localStorage.setItem("beverages",JSON.stringify (totalImg));
        localStorage.setItem("bev-duration",JSON.stringify (totalMin));
        console.log(totalImg);
        console.log(totalMin);
        this.setState({beverages:totalImg,totalMin:totalMin})
    }

    uploadData(){
        const {nickName,phoneNum,beverages,totalMin} = this.state;
        const result = JSON.parse(localStorage.getItem("result"));
        const token = result.credential.accessToken;
        const fbName = result.user.displayName; 
        const fbEmail = result.user.email;
        const userId = result.user.uid;
        localStorage.setItem("userId",userId);
        const fbProfile = result.user.photoURL;
        const image1Url = localStorage.getItem("image1URL");
        const image2Url = localStorage.getItem("image2URL");
        const image3Url = localStorage.getItem("image3URL");


        var db = firebase.firestore();

        db.settings({ timestampsInSnapshots: true});
        db.collection("userProfile")
        .add({fbName,fbEmail,fbProfile,nickName,phoneNum,beverages,totalMin,image1Url,image2Url,image3Url,token,userId})
        .then((resp)=>{
            console.log(resp);
            alert("Your Ads successfully submitted!");
            this.props.showMapSection();
        })
        .catch((error) =>{
            alert("Error!", ""+error.message+"", "error");
        })
     
    }




render() {
    const {nickName,distroy2nd,beverages,showMapSection} = this.state;
    return (
        <div >
        {!nickName && <FirstProfile getFirstData={this.getFirstData}/>}
        {!distroy2nd && nickName && <SecondProfile getSecondData = {this.getSecondData}/>}
        {!beverages && distroy2nd && <ThirdProfile getThirdData = {this.getThirdData}/>}
        {beverages && !showMapSection &&
            <div>
            <h2>Now let's Go to your Profile</h2>
            <Button bsStyle="success" onClick={this.uploadData}>Go</Button>
        </div>
        }
        </div>
    );
    }
}

export default Profile;