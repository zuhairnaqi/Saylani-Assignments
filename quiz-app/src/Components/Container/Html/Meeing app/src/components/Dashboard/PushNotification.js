import React from 'react';
import ReactDom from 'react-dom';
import Notification  from 'react-web-notification';
import Popup from "./Popup";

//allow react dev tools work
window.React = React;

class PushNotification extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ignore: true,
      title: ''
    };
  }

  handlePermissionGranted(){
    console.log('Permission Granted');
    this.setState({
      ignore: false
    });
  }
  handlePermissionDenied(){
    console.log('Permission Denied');
    this.setState({
      ignore: true
    });
  }
  handleNotSupported(){
    console.log('Web Notification not Supported');
    this.setState({
      ignore: true
    });
  }

  handleNotificationOnClick(e, tag){
    console.log(e, 'Notification clicked tag:' + tag);
    this.setState({showPopup : true})
  }

  handleNotificationOnError(e, tag){
    console.log(e, 'Notification error tag:' + tag);
  }

  handleNotificationOnClose(e, tag){
    console.log(e, 'Notification closed tag:' + tag);
  }

  handleNotificationOnShow(e, tag){
    this.playSound();
    console.log(e, 'Notification shown tag:' + tag);
  }

  playSound(filename){
    document.getElementById('sound').play();
  }

  componentDidMount() {
    const {senderPhoto,date,time,venue} = this.props.value;
    clearTimeout(myVar);
    const myVar = setTimeout(()=>{
      console.log("componentDidMount notification==> ",this.state.ignore);
      if(this.state.ignore) {
        return;
      }
  
      const now = Date.now();
  
      const title = 'Meeting Request';
      const body = 'You have a Request to meet at ' + venue.name;
      const tag = now;
      const icon = senderPhoto;
      // const icon = 'http://localhost:3000/Notifications_button_24.png';
  
      // Available options
      // See https://developer.mozilla.org/en-US/docs/Web/API/Notification/Notification
      const options = {
        tag: tag,
        body: body,
        icon: icon,
        lang: 'en',
        dir: 'ltr',
        sound: './sound.mp3'  // no browsers supported https://developer.mozilla.org/en/docs/Web/API/notification/sound#Browser_compatibility
      }
      this.setState({
        title: title,
        options: options
      })
    }, 1200)
  }

  render() {
    console.log(this.props.value);
    const {showPopup} = this.state;

    return (
      <div>
        {/* <button onClick={this.handleButtonClick.bind(this)}>Notif!</button> */}
        <Notification
          ignore={this.state.ignore && this.state.title !== ''}
          notSupported={this.handleNotSupported.bind(this)}
          onPermissionGranted={this.handlePermissionGranted.bind(this)}
          onPermissionDenied={this.handlePermissionDenied.bind(this)}
          onShow={this.handleNotificationOnShow.bind(this)}
          onClick={this.handleNotificationOnClick.bind(this)}
          onClose={this.handleNotificationOnClose.bind(this)}
          onError={this.handleNotificationOnError.bind(this)}
          timeout={5000}
          title={this.state.title}
          options={this.state.options}
        />
        <audio id='sound' preload='auto'>
          <source src='./tone.mp3' type='audio/mpeg' />
          <source src='./sound.ogg' type='audio/ogg' />
          <embed hidden='true' autostart='false' loop='false' src='./tone.mp3' />
        </audio>

        {showPopup &&  <Popup />}
      </div>
    )
  }
};

export default PushNotification;
// ReactDom.render(<App/>, document.getElementById('out'));