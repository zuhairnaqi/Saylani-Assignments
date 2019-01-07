import React, { Component } from 'react';
import '../../App.css'
import Cards from 'react-swipe-deck';
import swal from 'sweetalert';
import blackCircle from '../../images/icons/black-circle.png'
import blueCircle from '../../images/icons/blue-circle.png'

import MUCard from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

import cancel from '../../images/icons/cancel.png';
import check from '../../images/icons/check.png'

// const data = ['Alexandre', 'Thomas', 'Lucien']
class Wrapper extends Component {
  constructor(props){
    super(props);
    this.state = {
      img1:true,
      img2:false,
      img3:false,
      currentIndex:0,
      
    }
  }
  image1 = ()=>{ this.setState({img1:true,img2:false,img3:false}) }
  image2 = ()=>{ this.setState({img1:false,img2:true,img3:false}) }
  image3 = ()=>{ this.setState({img1:false,img2:false,img3:true}) }
 
cancel = ()=>{
  const {currentIndex} = this.state;
 console.log("action('swipe left')");
 this.setState({currentIndex:currentIndex+1})
}


  render(){
    const {img1,img2,img3,currentIndex} = this.state;
    const data = this.props.matchedUsers;
    // const myId = localStorage.getItem("userId")
    console.log("Props matchedUsers",this.props.matchedUsers);
    return (
        <Cards onEnd={()=>console.log("action('end')")} className='master-root'> 
          {data.map((item,index) => 
          <span>
              {(index===currentIndex) && <span className="Card">
              <MUCard >
                    {img1 && <CardMedia style={{height: 0, paddingTop: '56.25%'}}
                    image={item.image1Url}
                    // title={item.fbName}
                    />}
                    {img2 && <CardMedia style={{height: 0, paddingTop: '56.25%'}}
                    image={item.image2Url}
                    // title={item.fbName}
                    />}
                    {img3 && <CardMedia style={{height: 0, paddingTop: '56.25%'}}
                    image={item.image3Url}
                    // title={item.fbName}
                    />}

                    <CardActions>
                    <Button size="small" color="primary" target="_blank" onClick={this.image1} id='card-img1'>
                    {img1 ? <img src={blueCircle} alt="black-circle"/>
                     : <img src={blackCircle} alt="black-circle"/>}
                    </Button>
                    <Button size="small" color="primary" target="_blank" onClick={this.image2} id='card-img2'>
                    {img2 ? <img src={blueCircle} alt="black-circle"/>
                     : <img src={blackCircle} alt="black-circle"/>}         
                    </Button>
                    <Button size="small" color="primary" target="_blank" onClick={this.image3} id='card-img3'>
                    {img3 ? <img src={blueCircle} alt="black-circle"/>
                     : <img src={blackCircle} alt="black-circle"/>}
                    </Button>
                    </CardActions>

                    <CardContent id="card-name">
                    <Typography gutterBottom variant="headline" component="h2">
                        {item.fbName}
                    </Typography>
                    <Typography component="p">
                        {item.nickName}
                    </Typography>

                    </CardContent>
                    <CardActions id="cancel-check">
                        <Button size="small" color="primary" target="_blank"  onClick={this.cancel} id="cancel-btn">
                        <img src={cancel} alt="Cancel"  style={{width:"40px"}}/>
                        </Button>

                        <Button size="small" color="primary" target="_blank" onClick={()=>{
                          swal({
                            title: "Are you sure?",
                            text: `Do you want to meet ${item.fbName}`,
                            icon: "info",
                            buttons: true,
                            dangerMode: true,
                          })
                          .then((willDelete) => {
                            if (willDelete) {
                              swal("Poof! You can meet!", {icon: "success" });
                              this.props.selectedTheUser(item);
                            } else {
                              swal("Your meeting is cancelled!",{ icon: "error" });
                            }
                          });
                        }} id="check-btn">
                        <img src={check} alt="Check" style={{width:"40px"}}/>
                        </Button>
                    </CardActions>
                </MUCard>








                {/* <Grid>
                  <Row className="Thumbnail">
                    <Col xs={6} md={4} className="car-col">
                      {img1 && <Thumbnail src={item.image1Url} alt="242x200">
                      <img src={blueCircle} className='card-img1' alt="black-circle"/>
                      <img src={blackCircle} onClick={this.image2} className='card-img2' alt="black-circle"/>             
                      <img src={blackCircle} onClick={this.image3} className='card-img3' alt="black-circle"/>
                      
                        <h3 className="card-names">{item.fbName}</h3>
                        <p className="card-names">{item.nickName}</p>
                      </Thumbnail>}
                      </Col>

                    <Col xs={6} md={4} className="car-col">
                      {img2 && <Thumbnail src={item.image2Url} alt="242x200">
                      <img src={blackCircle} onClick={this.image1} className='card-img1' alt="black-circle"/>
                      <img src={blueCircle} className='card-img2' alt="black-circle"/>               
                      <img src={blackCircle} onClick={this.image3} className='card-img3' alt="black-circle"/>
                      
                        <h3 className="card-names">{item.fbName}</h3>
                        <p className="card-names">{item.nickName}</p>
                      </Thumbnail>}
                      </Col>

                     <Col xs={6} md={4} className="car-col">
                      {img3 && <Thumbnail src={item.image3Url} alt="242x200">
                      <img src={blackCircle} onClick={this.image1} className='card-img1' alt="black-circle"/>
                      <img src={blackCircle} onClick={this.image2} className='card-img2' alt="black-circle"/>              
                      <img src={blueCircle} className='card-img3' alt="black-circle"/>
                      
                        <h3 className="card-names">{item.fbName}</h3>
                        <p className="card-names">{item.nickName}</p>
                      </Thumbnail>}
                    </Col>
                    </Row>
                </Grid> */}
      
                    </span>}
           
            </span>
          )}
        </Cards>
    )
  }
}
export default Wrapper;