import React, { Component } from 'react';
import '../../../App.css';
import swal from 'sweetalert';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      setEmail: '',
      setPassword: '',
      email: '',
      password: '',
      loginConfirmed: false,
      signIn:true,
    }
    // this.checkLogin = this.checkLogin.bind(this);
    this.userName = this.userName.bind(this);
    this.setEmail = this.setEmail.bind(this);
    this.setPassword = this.setPassword.bind(this);
    this.signUp = this.signUp.bind(this);
    this.turnForm=this.turnForm.bind(this);

  }
  /********************SIGN UP FORM******************** */
  userName(e) { this.setState({ userName: e.target.value }) };
  setEmail(e) { this.setState({ setEmail: e.target.value.toLowerCase() }) };
  setPassword(e) { this.setState({ setPassword: e.target.value.toLowerCase() }) };
  signUp() {
    const {userName,setEmail,setPassword} = this.state;
    console.log(setEmail);
    console.log(setEmail.indexOf('@'));
    console.log(setEmail.indexOf('.'));
    if(userName && setEmail && setPassword){
      (setEmail.includes('@') && setEmail.includes('.') && (setEmail.indexOf('.com')>setEmail.indexOf('@')+1))?
        this.setState({ signIn: true }):
        alert("Your Email isn't valid");
    }
    else{
      alert("Please fill the form");
    } 
  };

  /*****************LOGIN FORM ******************/
  email(e) {this.setState({ email: e.target.value.toLowerCase() })}
  password(e) {this.setState({ password: e.target.value.toLowerCase() })}
  submit() {
    const { email, password, loginConfirmed,userName,setEmail,setPassword } = this.state;
    ((email === setEmail) && (password === setPassword) && userName && setEmail && setPassword && email && password) ?
      (
        swal("Welcome", "Select your quiz!", "success"), this.setState({ loginConfirmed: true }),
        localStorage.setItem('userEmail', email),localStorage.setItem('userPassword', password),
        localStorage.setItem('user-name', userName)
      )
      : swal("Wrong Credential", "Your account isn't in our record!", "error");
  }
  turnForm(){
    const {signIn} = this.state;
    this.setState({signIn:!signIn})
  }

  render() {
    const { loginConfirmed,signIn } = this.state;
    const { login } = this.props;
    return (
      <div className="">
      {!signIn?
        <fieldset>
          <legend>Sign Up</legend>
          <label>Your name :</label>
          <input type='text' placeholder='e.g:Zuhair Naqi' onChange={this.userName} />
          <br /><br />
          <label>Email :</label>
          <input type='email' placeholder='e.g:zuhair@fb.com' onChange={this.setEmail} />
          <br /><br />
          <label>Password :</label>
          <input type='password' placeholder='e.g:****...' onChange={this.setPassword} />
          <br /><br />
          <button onClick={this.signUp}>Sign Up</button>
          <p>Want to <a onClick={this.turnForm}>Sign In</a> ?</p>
        </fieldset>
        :      
        <fieldset>
          <br />
          <legend>Sign In</legend>
          <label>Email:</label>
          <input type='email' onChange={this.email.bind(this)} />
          <br /><br />
          <label>Password :</label>
          <input type='password' onChange={this.password.bind(this)} />
          <br /><br />
          <button onClick={this.submit.bind(this)}>Submit</button>
          {loginConfirmed && login(true)}
          <p>If you have not account please <a onClick={this.turnForm}>Sign Up</a></p>
        </fieldset>}

      </div>
    );
  }
}

export default Login;
