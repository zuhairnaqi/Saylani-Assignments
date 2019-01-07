import React, { Component } from 'react';
import '../../../App.css'
import Quiz_1 from './Quiz 1/Quiz 1'
import Quiz_2 from './Quiz 2/Quiz 2'
import back_btn from '../../../back-btn.png'

class React_Native extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedQuiz: '',
      startQuiz: null,
      quiz1Givenbefore: localStorage.getItem("react native quiz 1") === "done" ? true : false,
      currentQuiz1: this.props.reactNativeQuiz1,
    }
  }
  render() {
    const { selectedQuiz, startQuiz, quiz1Givenbefore, currentQuiz1 } = this.state;
    return (
      <div>
        {/* /******************  MAIN HEADING AND RESET ON CLICK **********/}
        <button id="back-btn" onClick={() => this.props.back()}><img src={back_btn} height="25px" width="25px" /></button>&nbsp;&nbsp;
        <h1 style={{ display: 'inline' }} onClick={() => this.setState({ selectedQuiz: '', startQuiz: null })}>react native Quizzes</h1>


        {/* /******************  QUIZ 1 FUNCTIONALITY **********/}
        <div id='categories'>
          <h2 onClick={() => this.setState({ selectedQuiz: 'Quiz 1' })}>Quiz 1</h2>
          {selectedQuiz === 'Quiz 1' && startQuiz === null && !quiz1Givenbefore &&
            <div>
              <h2>React Native Quiz 1</h2>
              <h4>Passing Score : 50</h4>
              <h4>Quiz Duration : 10 Minutes</h4>
              <h4>No. of Attempts Allowed : 1</h4>
              <button onClick={() => this.setState({ startQuiz: 1 })}>Start Quiz</button>
            </div>}
          {(currentQuiz1 || (startQuiz === 1 || quiz1Givenbefore) && selectedQuiz === 'Quiz 1') && <Quiz_1 quizGivenbefore={quiz1Givenbefore} currentQuiz1={currentQuiz1} />}
          <hr />
        </div>
      </div>
    );
  }
}
export default React_Native;

