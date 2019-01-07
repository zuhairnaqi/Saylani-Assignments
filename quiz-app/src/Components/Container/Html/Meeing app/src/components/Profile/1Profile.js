import React, { Component } from 'react';
import {Button,FormControl} from 'react-bootstrap';

class FirstProfile extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
        };
    
        this.nickName = this.nickName.bind(this);
        this.phoneNum = this.phoneNum.bind(this);
        this.Next = this.Next.bind(this);
      }



    nickName(e) {this.setState({ nickName: e.target.value })}
    phoneNum(e){this.setState({phoneNum : e.target.value})}
    Next(){
        const {nickName,phoneNum} = this.state;
        (nickName && phoneNum)?
        this.props.getFirstData(nickName,phoneNum):
        alert("Please fill the form");
    }

render() {
    
    return (
        <div >   

          <FormControl
            type="text"
            value={this.state.nickName}
            placeholder="Enter your nick name"
            onChange={this.nickName}
          />
          <br/>
          <FormControl
            type="number"
            value={this.state.phoneNum}
            placeholder="Enter phone number"
            onChange={this.phoneNum}
          />
          <br/>
          <Button bsStyle="primary" onClick={this.Next}>Next</Button>
        </div>
    );
    }
}

export default FirstProfile;