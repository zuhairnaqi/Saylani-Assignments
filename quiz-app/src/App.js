import React, { Component } from 'react';
import './App.css';
import logout from './logout.png'
import user_shield from './user-shield.png'
import Login from './Components/Container/Login/Login'
import Categories from './Components/Container/Categories/Categories'
import Html from './Components/Container/Html/Html'
import Css from './Components/Container/Css/Css'
import Javascript from './Components/Container/Javascript/Javascript'
import Apna_React from './Components/Container/React/React'
import React_Native from './Components/Container/React Native/React Native'

class App extends Component {
  constructor() {
    super();
    this.state = {
      loginChecked: localStorage.getItem('userEmail') ? true : false,
      quiz: ['HTML', 'Css', 'Javascript', 'React', 'React Native'],
      currentCategory: '',
      htmlQuiz1:localStorage.getItem('html quiz1 qu')?true:'',
      htmlQuiz2:localStorage.getItem('html quiz2 qu')?true:'',
      cssQuiz1:localStorage.getItem('css quiz1 qu')?true:'',
      cssQuiz2:localStorage.getItem('css quiz2 qu')?true:'',
      javascriptQuiz1:localStorage.getItem('javascript quiz1 qu')?true:'',
      javascriptQuiz2:localStorage.getItem('javascript quiz2 qu')?true:'',
      reactQuiz1:localStorage.getItem('react quiz1 qu')?true:'',
      reactQuiz2:localStorage.getItem('react quiz2 qu')?true:'',
      reactNativeQuiz1:localStorage.getItem('react native quiz1 qu')?true:'',
    }
    this.category = this.category.bind(this);
    this.checkLogin = this.checkLogin.bind(this);
    this.back = this.back.bind(this);
    this.logout = this.logout.bind(this);
  }
  ///******************** BACK BUTTON ******************/
  back() { 
    localStorage.setItem('html quiz1 qu','');
    localStorage.setItem('html quiz2 qu','')
    localStorage.setItem('css quiz1 qu','');
    localStorage.setItem('css quiz2 qu','')
    localStorage.setItem('javascript quiz1 qu','');
    localStorage.setItem('javascript quiz2 qu','');
    localStorage.setItem('react quiz1 qu','');
    localStorage.setItem('react quiz2 qu','');
    localStorage.setItem('react native quiz1 qu','');
    localStorage.setItem('react native quiz2 qu','');
    this.setState({ currentCategory: '',htmlQuiz1:'',htmlQuiz2:'',
    cssQuiz1:'',cssQuiz2:'',javascriptQuiz1:'',javascriptQuiz2:'',
    reactQuiz1:'',reactQuiz2:'',reactNativeQuiz1:'',
  })
  }
    ///******************** LOGOUT BUTTON ******************/
  logout() {
    localStorage.clear();
    this.setState({ loginChecked: false })
  }
  ///******************** CATEGORIES AND CHECKING LOGIN ******************/
  category(index) { this.setState({ currentCategory: this.state.quiz[index] }) }
  checkLogin(confirm) { this.setState({ loginChecked: confirm }) }


    ///******************** RENDURING JSX ******************/
  render() {
    const { quiz, currentCategory, loginChecked ,htmlQuiz1,htmlQuiz2,cssQuiz1,cssQuiz2,javascriptQuiz1,javascriptQuiz2,reactQuiz1,reactQuiz2,reactNativeQuiz1} = this.state;
    return (
      <div>
        <div className="App">
          <header className="App-header">
            <h1 id="main-heading">Quiz App</h1>
            {loginChecked && <span id='float-heading'>
              <strong>{localStorage.getItem("user-name")}</strong>
              <br />
              <img src={user_shield} height='30px' width='30px' />
              <br />
              <strong onClick={this.logout}>Logout <img src={logout} /></strong>
            </span>}
          </header>
        </div>

        {/* ///******************** LOGIN COMPONENT ******************/}
        {loginChecked ? console.log("Your account is saved!")
          : <Login login={this.checkLogin} />}
        <br />
        {/* ///******************** CATEGORIES COMPONENT ******************/}
        {!currentCategory && loginChecked && !htmlQuiz1 && !htmlQuiz2 && !cssQuiz1 && !cssQuiz2 && !javascriptQuiz1 && !javascriptQuiz2 && !reactQuiz1 && !reactQuiz2 && !reactNativeQuiz1 &&
        <Categories category={this.category} />}

          {/* ///******************** QUIZZES COMPONENT ON SELECTING ******************/}
        {(htmlQuiz1 || htmlQuiz2 || (currentCategory === 'HTML' && loginChecked)) && 
        <Html back={this.back} htmlQuiz1={htmlQuiz1} htmlQuiz2={htmlQuiz2} />}

        {(cssQuiz1 || cssQuiz2 || (currentCategory === 'Css' && loginChecked)) && 
        <Css back={this.back} cssQuiz1={cssQuiz1} cssQuiz2={cssQuiz2} />}

        {(javascriptQuiz1 || javascriptQuiz2 || (currentCategory === 'Javascript' && loginChecked)) && 
        <Javascript back={this.back} javascriptQuiz1={javascriptQuiz1} javascriptQuiz2={javascriptQuiz2}/>}

        {(reactQuiz1 || reactQuiz2 || (currentCategory === 'React' && loginChecked)) && 
        <Apna_React back={this.back} reactQuiz1={reactQuiz1} reactQuiz2={reactQuiz2}/>}

        {(reactNativeQuiz1 || (currentCategory === 'React Native' && loginChecked)) &&
        <React_Native back={this.back} reactNativeQuiz1={reactNativeQuiz1}/>}

      </div>
    );
  }
}

export default App;
