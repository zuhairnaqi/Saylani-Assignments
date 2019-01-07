import React, { Component } from 'react';
import Count_Down from './../../Count Down/Count_Down';

class Quiz_1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: '',
      checkKey: this.props.currentQuiz1? true : null,
      checkedAns: '',
      questionNum: parseInt(localStorage.getItem('react quiz1 qu')) || 1,
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
      (localStorage.setItem('react quiz1 qu',1),this.setState({ checkKey: true })) :
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
      localStorage.setItem('react quiz1 qu',questionNum+1);
  }
  submitAnswers() {
    const { correctAns, wrongAns, questionNum } = this.state;
    const percentage = Math.round(100 * correctAns / (questionNum - 1));
    localStorage.setItem("react quiz 1", "done");
    localStorage.setItem("react quiz 1 correctAns", correctAns);
    localStorage.setItem("react quiz 1 wrongAns", wrongAns);
    localStorage.setItem("react quiz 1 questions", questionNum - 1);
    localStorage.setItem('react quiz1 qu','');
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
    const correctAns = localStorage.getItem("react quiz 1 correctAns");
    const wrongAns = localStorage.getItem("react quiz 1 wrongAns");
    const questionNum = localStorage.getItem("react quiz 1 questions");
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
            {questionNum === 1 && <li value='1'>What's used to pass data to a component from outside? <br /><br />
              <label><input type="radio" onChange={this.input} checked={checkedAns === "no"} value='no' />setState</label><br /><br />
              <label><input type="radio" onChange={this.input} checked={checkedAns === "false"} value='false' />render with arguments</label><br /><br />
              <label><input type="radio" onChange={this.input} checked={checkedAns === "null"} value='null' />PropTypes</label><br /><br />
              <label><input type="radio" onChange={this.input} checked={checkedAns === "true"} value='true' />props</label><br /><br />
              <button onClick={this.verifyAns.bind(this, 'true')}>Next</button>
            </li>}

            {questionNum === 2 && <li value='2'>How do you access a function fetch() from a h1 element in JSX? <br /><br />
              <label><input type="radio" onChange={this.input} checked={checkedAns === "null"} value='null' />&lt;h1&gt;{'${fetch()}'}&lt;/h1&gt;</label><br /><br />
              <label><input type="radio" onChange={this.input} checked={checkedAns === "no"} value='no' />&lt;h1&gt;{'${fetch}'}&lt;/h1&gt;</label><br /><br />
              <label><input type="radio" onChange={this.input} checked={checkedAns === "false"} value='false' />&lt;h1&gt;{'{fetch}'}&lt;/h1&gt;</label><br /><br />
              <label><input type="radio" onChange={this.input} checked={checkedAns === "true"} value='true' />&lt;h1&gt;{'{fetch()}'}&lt;/h1&gt;</label><br /><br />
              <button onClick={this.verifyAns.bind(this, 'true')}>Next</button>
            </li>}

            {questionNum === 3 && <li value='3'>Which of the following is correct syntax for a button click event handler, foo?<br /><br />
              <label><input type="radio" onChange={this.input} checked={checkedAns === "null"} value='null' />&lt;button onclick={'{this.foo()}'}&gt;</label><br /><br />
              <label><input type="radio" onChange={this.input} checked={checkedAns === "false"} value='false' />&lt;button onClick={'{this.foo()}'}&gt;</label><br /><br />
              <label><input type="radio" onChange={this.input} checked={checkedAns === "true"} value='true' />&lt;button onClick={'{this.foo}'}&gt;</label><br /><br />
              <label><input type="radio" onChange={this.input} checked={checkedAns === "no"} value='no' />&lt;button onclick={'{this.foo}'}&gt;</label><br /><br />
              <button onClick={this.verifyAns.bind(this, 'true')}>Next</button>
            </li>}

            {questionNum === 4 && <li value='4'>What happens when you call setState() inside render() method? <br /><br />
              <label><input type="radio" onChange={this.input} checked={checkedAns === "true"} value='true' />Stack overflow error</label><br /><br />
              <label><input type="radio" onChange={this.input} checked={checkedAns === "false"} value='false' />Repetitive output appears on the screen</label><br /><br />
              <label><input type="radio" onChange={this.input} checked={checkedAns === "null"} value='null' />Duplicate key error</label><br /><br />
              <label><input type="radio" onChange={this.input} checked={checkedAns === "no"} value='no' />Nothing happens. Life goes on!</label><br /><br />
              <button onClick={this.verifyAns.bind(this, 'true')}>Next</button>
            </li>}

            {questionNum === 5 && <li value='5'>Which method in a React Component is called after the component is rendered for the first time? <br /><br />
              <label><input type="radio" onChange={this.input} checked={checkedAns === "false"} value='false' />componentDidUpdate</label><br /><br />
              <label><input type="radio" onChange={this.input} checked={checkedAns === "true"} value='true' />componentDidMount</label><br /><br />
              <label><input type="radio" onChange={this.input} checked={checkedAns === "null"} value='null' />componentMounted</label><br /><br />
              <label><input type="radio" onChange={this.input} checked={checkedAns === "no"} value='no' />componentUpdated</label><br /><br />              <button onClick={this.verifyAns.bind(this, 'true')}>Submit</button>
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
