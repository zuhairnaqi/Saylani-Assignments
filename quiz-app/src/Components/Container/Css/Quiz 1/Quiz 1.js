import React, { Component } from 'react';
import Count_Down from './../../Count Down/Count_Down';

class Quiz_1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: '',
      checkKey:this.props.currentQuiz1? true : null,
      checkedAns: '',
      questionNum: parseInt(localStorage.getItem('css quiz1 qu')) || 1,
      correctAns: 0,
      wrongAns: 0,
      quizGivenbefore: this.props.quizGivenbefore,

    }
    this.input = this.input.bind(this);
    this.timeEnd = this.timeEnd.bind(this);
  }
  /******************  INPUT FOR KEY **********/
  inputText(e) {
    this.setState({ key: e.target.value })
  }
  checkKey() {
    const { key} = this.state;
    key === '123456' ?
      (localStorage.setItem('css quiz1 qu',1),this.setState({ checkKey: true })) :
      alert("Your Key isn't valid");
  }
  /******************  INPUT FOR CHECKED ANSWER **********/
  input(e) { this.setState({ checkedAns: e.target.value }) }

  /******************  NEXT BUTTON AND VERIFICATION OF ANSWER **********/
  verifyAns(answer) {
    const { checkedAns, questionNum, correctAns, wrongAns } = this.state;
    ((answer === checkedAns) ?
      this.setState({ correctAns: correctAns + 1 }) :
      this.setState({ wrongAns: wrongAns + 1 }))
      this.setState({ questionNum: questionNum + 1 })
      this.setState({ checkedAns: "" })
      localStorage.setItem('css quiz1 qu',questionNum+1)
  }
  submitAnswers() {
    const { correctAns, wrongAns, questionNum } = this.state;
    const percentage = Math.round(100 * correctAns / (questionNum - 1));
    localStorage.setItem("css quiz 1", "done");
    localStorage.setItem("css quiz 1 correctAns", correctAns);
    localStorage.setItem("css quiz 1 wrongAns", wrongAns);
    localStorage.setItem("css quiz 1 questions", questionNum - 1);
    localStorage.setItem('css quiz1 qu','');
    var result = "";
    var styles;

    if (percentage >= 50) {
      result = "Congratulation!You are Passed";
      styles = { color: "green" };
    }
    else {
      result = "Sorry you are Failed";
      styles = { color: "red" };
    }

    return (<div>
      <h3 style={styles}>{result}</h3>
      <h4>Correct Answers : {correctAns}</h4>
      <h4>Wrong Answers : {wrongAns}</h4>
      <h4>Your Score : {percentage}%</h4>
    </div>)
  }
  showAnswer() {
    const correctAns = localStorage.getItem("css quiz 1 correctAns");
    const wrongAns = localStorage.getItem("css quiz 1 wrongAns");
    const questionNum = localStorage.getItem("css quiz 1 questions");
    const percentage = Math.round(100 * correctAns / questionNum);
    var result = "";
    var styles;

    if (percentage >= 50) {
      result = "Congratulation!You are Passed";
      styles = { color: "green" };
    }
    else {
      result = "Sorry you are Failed";
      styles = { color: "red" };
    }

    return (<div>
      <h3 style={styles}>{result}</h3>
      <h4>Correct Answers : {correctAns}</h4>
      <h4>Wrong Answers : {wrongAns}</h4>
      <h4>Your Score : {percentage}%</h4>
    </div>)
  }
  timeEnd(){
    this.setState({questionNum:6})
  }

  render() {
    const { key, checkKey, questionNum, quizGivenbefore, checkedAns, correctAns } = this.state;
    return (
      <div>
        {/* /******************  INPUT FOR KEY **********/}
        {!checkKey && !quizGivenbefore && <div>
          <label>Enter a key</label>
          <input type='password' placeholder='Enter a Key' onChange={this.inputText.bind(this)} value={key} />
          <br/><br/>
          <button id='key-btn' onClick={this.checkKey.bind(this)}>Enter</button>
        </div>}

        {/* /******************  qUESTIONS **********/}
        {checkKey && !quizGivenbefore && <div>
          <strong>{questionNum<=5 && <Count_Down minute={10} timeEnd={this.timeEnd}/>}</strong>
          <ol>
            {questionNum === 1 && <li value='1'>Which is the correct CSS syntax? <br /><br />
              <label><input type="radio" onChange={this.input} checked={checkedAns === "true"} value='true' />{"body{color: black;}"}</label><br /><br />
              <label><input type="radio" onChange={this.input} checked={checkedAns === "false"} value='false' />{"{body:color=black;}"}</label><br /><br />
              <label><input type="radio" onChange={this.input} checked={checkedAns === "null"} value='null' />body:color=black;</label><br /><br />
              <button onClick={this.verifyAns.bind(this, 'true')}>Next</button>
            </li>}

            {questionNum === 2 && <li value='2'>What is the correct CSS syntax for making all the &lt;p&gt; elements bold? <br /><br />
              <label><input type="radio" onChange={this.input} checked={checkedAns === "null"} value='null' />{"p {text-size:bold;}"}</label><br /><br />
              <label><input type="radio" onChange={this.input} checked={checkedAns === "false"} value='false' />&lt;p style="text-size:bold;"&gt;</label><br /><br />
              <label><input type="radio" onChange={this.input} checked={checkedAns === "true"} value='true' />{"p {font-weight:bold;}"}</label><br /><br />
              <button onClick={this.verifyAns.bind(this, 'true')}>Next</button>
            </li>}

            {questionNum === 3 && <li value='3'>How do you insert a comment in a CSS file?<br /><br />
              <label><input type="radio" onChange={this.input} checked={checkedAns === "null"} value='null' />{"<!-- this is a comment -->"}</label><br /><br />
              <label><input type="radio" onChange={this.input} checked={checkedAns === "false"} value='false' />{"// this is a comment"}</label><br /><br />
              <label><input type="radio" onChange={this.input} checked={checkedAns === "true"} value='true' />{"/* this is a comment */"}</label><br /><br />
              <button onClick={this.verifyAns.bind(this, 'true')}>Next</button>
            </li>}

            {questionNum === 4 && <li value='4'> Which CSS property is used to change the text color of an element? <br /><br />
              <label><input type="radio" onChange={this.input} checked={checkedAns === "true"} value='true' />color</label><br /><br />
              <label><input type="radio" onChange={this.input} checked={checkedAns === "false"} value='false' />fgcolor</label><br /><br />
              <label><input type="radio" onChange={this.input} checked={checkedAns === "null"} value='null' />text-color</label><br /><br />
              <button onClick={this.verifyAns.bind(this, 'true')}>Next</button>
            </li>}

            {questionNum === 5 && <li value='5'>Which CSS property controls the text size?<br /><br />
              <label><input type="radio" onChange={this.input} checked={checkedAns === "false"} value='false' />text-style</label><br /><br />
              <label><input type="radio" onChange={this.input} checked={checkedAns === "true"} value='true' />front-size</label><br /><br />
              <label><input type="radio" onChange={this.input} checked={checkedAns === "null"} value='null' />text-size</label><br /><br />
              <button onClick={this.verifyAns.bind(this, 'true')}>Submit</button>
            </li>}

            {questionNum === 6 && this.submitAnswers()}

          </ol>

        </div>}

        {quizGivenbefore && this.showAnswer()}

      </div>
    );
  }
}
export default Quiz_1;
