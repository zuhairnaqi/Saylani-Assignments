import React, { Component } from 'react';
import Count_Down from './../../Count Down/Count_Down';

class Quiz_1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: '',
      checkKey: this.props.currentQuiz1? true : null,
      checkedAns: '',
      questionNum: parseInt(localStorage.getItem('html quiz1 qu')) || 1,
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
      (localStorage.setItem('html quiz1 qu',1),this.setState({ checkKey: true })) :
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
      this.setState({ checkedAns: "" });
      localStorage.setItem('html quiz1 qu',questionNum+1);
  }
  submitAnswers() {
    const { correctAns, wrongAns, questionNum } = this.state;
    const percentage = Math.round(100 * correctAns / (questionNum - 1));
    localStorage.setItem("html quiz 1", "done");
    localStorage.setItem("html quiz 1 correctAns", correctAns);
    localStorage.setItem("html quiz 1 wrongAns", wrongAns);
    localStorage.setItem("html quiz 1 questions", questionNum - 1);
    localStorage.setItem('html quiz1 qu','');
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
    const correctAns = localStorage.getItem("html quiz 1 correctAns");
    const wrongAns = localStorage.getItem("html quiz 1 wrongAns");
    const questionNum = localStorage.getItem("html quiz 1 questions");
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
            {questionNum === 1 && <li value='1'>What does HTML stand for? <br /><br />
              <label><input type="radio" onChange={this.input} checked={checkedAns === "true"} value='true' />Hyper Text Markup Language</label><br /><br />
              <label><input type="radio" onChange={this.input} checked={checkedAns === "false"} value='false' />Home Tool Markup Language</label><br /><br />
              <label><input type="radio" onChange={this.input} checked={checkedAns === "null"} value='null' />Hyperlinks and Text Markup Language</label><br /><br />
              <button onClick={this.verifyAns.bind(this, 'true')}>Next</button>
            </li>}

            {questionNum === 2 && <li value='2'>Choose the correct HTML element for the largest heading: <br /><br />
              <label><input type="radio" onChange={this.input} checked={checkedAns === "null"} value='null' />&lt;heading&gt;</label><br /><br />
              <label><input type="radio" onChange={this.input} checked={checkedAns === "false"} value='false' />&lt;h6&gt;</label><br /><br />
              <label><input type="radio" onChange={this.input} checked={checkedAns === "true"} value='true' />&lt;h1&gt;</label><br /><br />
              <button onClick={this.verifyAns.bind(this, 'true')}>Next</button>
            </li>}

            {questionNum === 3 && <li value='3'>Select the tag for paragraph? <br /><br />
              <label><input type="radio" onChange={this.input} checked={checkedAns === "null"} value='null' />&lt;para&gt;</label><br /><br />
              <label><input type="radio" onChange={this.input} checked={checkedAns === "false"} value='false' />&lt;paragraph&gt;</label><br /><br />
              <label><input type="radio" onChange={this.input} checked={checkedAns === "true"} value='true' />&lt;p&gt;</label><br /><br />
              <button onClick={this.verifyAns.bind(this, 'true')}>Next</button>
            </li>}

            {questionNum === 4 && <li value='4'>&lt;br/&gt;What type of tag is this? <br /><br />
              <label><input type="radio" onChange={this.input} checked={checkedAns === "true"} value='true' />Break tag</label><br /><br />
              <label><input type="radio" onChange={this.input} checked={checkedAns === "false"} value='false' />A broken one</label><br /><br />
              <label><input type="radio" onChange={this.input} checked={checkedAns === "null"} value='null' />An opening tag</label><br /><br />
              <button onClick={this.verifyAns.bind(this, 'true')}>Next</button>
            </li>}

            {questionNum === 5 && <li value='5'>what is the difference in an opening tag and a closing tag? <br /><br />
              <label><input type="radio" onChange={this.input} checked={checkedAns === "false"} value='false' />Opening tag has a / in front</label><br /><br />
              <label><input type="radio" onChange={this.input} checked={checkedAns === "true"} value='true' />Closing tag has a / in front</label><br /><br />
              <label><input type="radio" onChange={this.input} checked={checkedAns === "null"} value='null' />There is no difference</label><br /><br />
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
