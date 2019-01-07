import React, { Component } from 'react';
import Count_Down from './../../Count Down/Count_Down';

class Quiz_2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: '',
      checkKey: this.props.currentQuiz2? true : null,
      checkedAns: '',
      questionNum: parseInt(localStorage.getItem('css quiz2 qu')) || 1,
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
    const { key } = this.state;
    (key === '123456' ?
    (localStorage.setItem('css quiz2 qu',1),this.setState({ checkKey: true })) :
      alert("Your Key isn't valid"));
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
    this.setState({ checkedAns: "" });
    localStorage.setItem('css quiz2 qu',questionNum+1);
  }
  submitAnswers() {
    const { correctAns, wrongAns, questionNum } = this.state;
    const percentage = Math.round(100 * correctAns / (questionNum - 1));
    localStorage.setItem("css quiz 2", "done");
    localStorage.setItem("css quiz 2 correctAns", correctAns);
    localStorage.setItem("css quiz 2 wrongAns", wrongAns);
    localStorage.setItem("css quiz 2 questions", questionNum - 1);
    localStorage.setItem('css quiz2 qu','');
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
    const correctAns = localStorage.getItem("css quiz 2 correctAns");
    const wrongAns = localStorage.getItem("css quiz 2 wrongAns");
    const questionNum = localStorage.getItem("css quiz 2 questions");
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
        <strong>{questionNum<=5 && <Count_Down minute={8} timeEnd={this.timeEnd}/>}</strong>
          <ol>
            {questionNum === 1 && <li value='1'>What does CSS stand for? <br /><br />
              <label><input type="radio" onChange={this.input} checked={checkedAns === "null"} value='null' />Colorful Style Sheets</label><br /><br />
              <label><input type="radio" onChange={this.input} checked={checkedAns === "true"} value='true' />Cascading Style Sheets</label><br /><br />
              <label><input type="radio" onChange={this.input} checked={checkedAns === "false"} value='false' />Computer Style Sheets</label><br /><br />
              <label><input type="radio" onChange={this.input} checked={checkedAns === "no"} value='no' />Creative Style Sheets</label><br /><br />
              <button onClick={this.verifyAns.bind(this, 'true')}>Next</button>
            </li>}

            {questionNum === 2 && <li value='2'>What is the correct HTML for referring to an external style sheet?<br /><br />
              <label><input type="radio" onChange={this.input} checked={checkedAns === "false"} value='false' />&lt;stylesheet&gt;mystyle.css&lt;/stylesheet&gt;</label><br /><br />
              <label><input type="radio" onChange={this.input} checked={checkedAns === "true"} value='true' />&lt;link rel="stylesheet" type="text/css" href="mystyle.css"&gt;</label><br /><br />
              <label><input type="radio" onChange={this.input} checked={checkedAns === "null"} value='null' />&lt;style src="mystyle.css"&gt;</label><br /><br />
              <button onClick={this.verifyAns.bind(this, 'true')}>Next</button>
            </li>}

            {questionNum === 3 && <li value='3'>Where in an HTML document is the correct place to refer to an external style sheet? <br /><br />
              <label><input type="radio" onChange={this.input} checked={checkedAns === "true"} value='true' />In the &lt;head&gt; section</label><br /><br />
              <label><input type="radio" onChange={this.input} checked={checkedAns === "null"} value='null' /> In the &lt;body&gt; section</label><br /><br />
              <label><input type="radio" onChange={this.input} checked={checkedAns === "false"} value='false' />At the end of the document</label><br /><br />
              <button onClick={this.verifyAns.bind(this, 'true')}>Next</button>
            </li>}

            {questionNum === 4 && <li value='4'>Which HTML tag is used to define an internal style sheet?<br /><br />
              <label><input type="radio" onChange={this.input} checked={checkedAns === "false"} value='false' />&lt;script&gt;</label><br /><br />
              <label><input type="radio" onChange={this.input} checked={checkedAns === "null"} value='null' />&lt;css&gt;</label><br /><br />
              <label><input type="radio" onChange={this.input} checked={checkedAns === "true"} value='true' />&lt;style&gt;</label><br /><br />
              <button onClick={this.verifyAns.bind(this, 'true')}>Next</button>
            </li>}

            {questionNum === 5 && <li value='5'> Which HTML attribute is used to define inline styles?<br /><br />
              <label><input type="radio" onChange={this.input} checked={checkedAns === "false"} value='false' />class</label><br /><br />
              <label><input type="radio" onChange={this.input} checked={checkedAns === "true"} value='true' />style</label><br /><br />
              <label><input type="radio" onChange={this.input} checked={checkedAns === "null"} value='null' /> font</label><br /><br />
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
export default Quiz_2;
