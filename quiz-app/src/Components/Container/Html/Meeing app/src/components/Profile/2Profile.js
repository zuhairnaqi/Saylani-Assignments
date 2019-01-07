import React, { Component } from 'react';
import {Button} from 'react-bootstrap';
import firebase from '../../config/firebase';
class SecondProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    
        this.firstImg = this.firstImg.bind(this);
        this.secondImg = this.secondImg.bind(this);
        this.thirdImg = this.thirdImg.bind(this);
        this.Next = this.Next.bind(this);
    }
    firstImg(e){ 
        console.log("file value",e.target.files[0]);
        console.log("image property",e.target.files[0].name);
        console.log("image property",e.target.files[0].type);
        this.setState({firstImg:e.target.files[0]}) 
    }
    secondImg(e){ this.setState({secondImg:e.target.files[0]}) }
    thirdImg(e){ this.setState({thirdImg:e.target.files[0]}) }
    
    Next(){
        const {firstImg,secondImg,thirdImg} = this.state;
        if(firstImg && secondImg && thirdImg){ 
            // var storage = firebase.storage();
            var storageRef = firebase.storage().ref();
            var imagesRef1 = storageRef.child('images/photo' +Math.random().toString().substring(2,6));
            var imagesRef2 = storageRef.child('images/photo' +Math.random().toString().substring(2,6));
            var imagesRef3 = storageRef.child('images/photo' +Math.random().toString().substring(2,6));
            
            this.props.getSecondData(true);


        // FIRST IMAGE UPLOAD
        new Promise((resolve, reject) =>{
        imagesRef1.put(firstImg)
        .then(function(snapshot){
            console.log("snapshot",snapshot)
            imagesRef1.getDownloadURL()
            .then((downloadURL)=> {
                console.log("Image done",downloadURL);
                localStorage.setItem("image1URL",downloadURL);
            resolve(downloadURL);
            })
            .catch((error)=>{
                reject(error);
            })
        })
        .catch((e) => {
            console.log('Error while uploading', e)
        });
    })

        // SECOND IMAGE UPLOAD
        new Promise((resolve, reject) =>{
        imagesRef2.put(secondImg)
        .then(function(snapshot){
            console.log("snapshot",snapshot)
            imagesRef2.getDownloadURL()
            .then((downloadURL)=> {
                console.log("Image done",downloadURL);
                localStorage.setItem("image2URL",downloadURL);
            resolve(downloadURL);
            })
            .catch((error)=>{
                reject(error);
            })
        })
        .catch((e) => {
            console.log('Error while uploading', e)
        });
    })

        // THIRD IMAGE UPLOAD
        new Promise((resolve, reject) =>{
        imagesRef3.put(thirdImg)
        .then(function(snapshot){
            console.log("snapshot",snapshot)
            imagesRef3.getDownloadURL()
            .then((downloadURL)=> {
                console.log("Image done",downloadURL);
                localStorage.setItem("image3URL",downloadURL);
            resolve(downloadURL);
            })
            .catch((error)=>{
                reject(error);
            })
        })
        .catch((e) => {
            console.log('Error while uploading', e)
        });
    })

        }
        else{
            alert("please Upload three pictures in boxes")
        }
    }

render() {
    const {firstImg} = this.state;
    return (
        <div >
            <strong>Upload your three pictures for complete profile.</strong>
        <input type="file" onChange={this.firstImg} required/>
        <input type="file" onChange={this.secondImg} required/>
        <input type="file" onChange={this.thirdImg} required/>
          <br/>
          <Button bsStyle="primary" onClick={this.Next}>Next</Button>
          {/* {firstImg && <img type={firstImg.type} src={firstImg.name}/>} */}
        </div>
    );
    }
}

export default SecondProfile;