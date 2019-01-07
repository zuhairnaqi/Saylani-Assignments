/* react-live */
import React from 'react'
import '../../App.css'
import Popup from 'reactjs-popup'
import {Button } from 'react-bootstrap';

const Modal =  () => (
    <Popup
    open={true}
      modal
      closeOnDocumentClick
    >
      <div>
        <a className="close" onClick={()=> console.log("close")}>
          &times;
        </a>
        <Button bsStyle="success">Send Request</Button>
        <Button bsStyle="danger">Send Request</Button>
      </div>
    </Popup>
  )
  
  
  export default Modal;



// class ControlledPopup extends React.Component {
//     constructor(props) {
//       super(props)
//       this.state = { open: false }
//       this.openModal = this.openModal.bind(this)
//       this.closeModal = this.closeModal.bind(this)
  
//     }
//     openModal (){
//       this.setState({ open: true })
//     }
//     closeModal () {
//       this.setState({ open: false })
//     }
  
//     render() {
//       return (
//         <div>
//           {/* <button className="button" onClick={this.openModal}>
//             Controlled Popup
//           </button> */}
//           <Popup
//             trigger={<button className="button"> Open Modal </button>}
//             modal
//             closeOnDocumentClick
//             // onClose={this.closeModal}
//             >
//           {/* <Popup
//             open={this.state.open}
//             closeOnDocumentClick
//             onClose={this.closeModal}
//           > */}
//             <div className="modal">
//               <a className="" onClick={this.closeModal}>
//                 &times;
//               </a>
//               Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae magni
//               omnis delectus nemo, maxime molestiae dolorem numquam mollitia, voluptate
//               ea, accusamus excepturi deleniti ratione sapiente! Laudantium, aperiam
//               doloribus. Odit, aut.
//             </div>
//           </Popup>
//         </div>
//       )
//     }
//   }
  
//   export default ControlledPopup;