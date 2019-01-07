import React, { Component } from 'react';
import '../../App.css';
import {Button} from 'react-bootstrap';
import coffee from '../../images/coffee.jpg'
import juice from '../../images/juice.jpg'
import cocktail from '../../images/cocktail.jpg'

class ThirdProfile extends Component {
    constructor(){
        super();
        this.state={
            img1:false,
            img2:false,
            img3:false,
            totalImg:[],
            min20:false,
            min60:false,
            min120:false,
            totalMin:[],
        }        
        this.Next = this.Next.bind(this);
        this.Minutes = this.Minutes.bind(this);
    }
    selectImg1(text){ 
        const {img1,totalImg} = this.state;
        if(!img1){
            this.setState({img1:true,totalImg:totalImg.concat(text)})
        }
        else{
            const index = totalImg.indexOf(text);
            totalImg.splice(index,1)
            this.setState({img1:false,totalImg:totalImg})
        }
    }
    selectImg2(text){ 
        const {img2,totalImg} = this.state;
        if(!img2){
            this.setState({img2:true,totalImg:totalImg.concat(text)})
        }
        else{
            const index = totalImg.indexOf(text);
            totalImg.splice(index,1)
            this.setState({img2:false,totalImg:totalImg})
        }
    }
    selectImg3(text){ 
        const {img3,totalImg} = this.state;
        if(!img3){
            this.setState({img3:true,totalImg:totalImg.concat(text)})
        }
        else{
            const index = totalImg.indexOf(text);
            totalImg.splice(index,1)
            this.setState({img3:false,totalImg:totalImg})
        }
    }

    Minutes(e){
        const{totalMin,min20,min60,min120} = this.state;
        const min = parseInt(e.target.value);
        if(min === 20){
            if(!min20){
                this.setState({totalMin:totalMin.concat(min),min20:true})
            } 
            else{
                const index = totalMin.indexOf(min);
                totalMin.splice(index,1)
                this.setState({totalMin:totalMin,min20:false})
            }
        }
        else if(min === 60){
            if(!min60){
                this.setState({totalMin:totalMin.concat(min),min60:true})
            } 
            else{
                const index = totalMin.indexOf(min);
                totalMin.splice(index,1)
                this.setState({totalMin:totalMin,min60:false})
            }
        }
        else if(min === 120){
            if(!min120){
                this.setState({totalMin:totalMin.concat(min),min120:true}) 
            } 
            else{
                const index = totalMin.indexOf(min);
                totalMin.splice(index,1)
                this.setState({totalMin:totalMin,min120:false})
            }
        }
    }
    Next(){
        const {totalMin,totalImg} = this.state;
        if(totalMin && totalImg){
            this.props.getThirdData(totalImg,totalMin);
        }
        else{
            alert("Please select both phases");
        }
    }
render() {
    const {img1,img2,img3} = this.state;
    console.log(this.state.totalMin);
    console.log(this.state.totalImg);
    return (
        <div >
            <h2>Select Beverages</h2>
            

            <div className='pic-categories'>
                <img src={coffee} width='32%' onClick={this.selectImg1.bind(this,'coffee')} alt="coffee"/>
                <img src={juice} width='32%' onClick={this.selectImg2.bind(this,'juice')} value='2' alt="juice"/>
                <img src={cocktail} width='32%' onClick={this.selectImg3.bind(this,'cocktail')} value='3' alt="cocktail"/>
            </div>
            <div id='img-caption'>
                {!img1 ?<p id='coffe-text'>Coffee</p>: <p id='coffe-text'>&#10004; Coffee</p>}
                {!img2 ? <p className='juice-cocktail'>Juice</p>:<p className='juice-cocktail'>&#10004; Juice</p>}
                {!img3?<p className='juice-cocktail'>Cocktail</p>:<p className='juice-cocktail'>&#10004; Cocktail</p>}
                </div>

                <h2>Duration of Meeting</h2>


                <input type='checkbox' onChange={this.Minutes} value='20'/>20 Min
                <input type='checkbox' onChange={this.Minutes} value='60'/>60 Min
                <input type='checkbox' onChange={this.Minutes} value='120'/>120 Min

                <br/>            
          <Button bsStyle="primary" onClick={this.Next}>Next</Button>


        </div>
    );
    }
}

export default ThirdProfile;