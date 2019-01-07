import React, { Component } from 'react';

class Categories extends Component {
  constructor(props){
    super(props);
    this.state={
      quiz : ['HTML','Css','Javascript','React','React Native'],
    }
  }
  render() {
    const {quiz} = this.state;
    const {category} = this.props;
  return (
      <div>
        <h1>Quiz Categories</h1>
        <br/> 
        <div id='categories'>
       {quiz.map((value,index) => {
         return (<h3 key={index} onClick={category.bind(this,index)}>{value}<hr/></h3>)
       })}
       </div>
      </div>
    );
  }
}

export default Categories;
