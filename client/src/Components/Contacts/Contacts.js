import React, { useState } from "react";
import logo from "../../Assets/logo.png";
import './Contacts.scss'
function Contacts({ contacts,currentUser,changeChat }) {
  const [currSelected,setCurrSelected]=useState(undefined)
  function changeColor(index,contact){
    setCurrSelected(index)
    changeChat(contact)
  }
  return (
    <div className="allContacts">
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>
      <div className="eachContact">
        {contacts?.map((each,index)=>{
          return (
            <div className={`some-user ${index===currSelected?'selected':''}`} onClick={()=>{changeColor(index,each)}} key={each?._id}>
              <div className="image"><img src={each?.avatarImage?.url} alt="userImage" /></div>
              <div className="name">{each?.username}</div>
            </div>
          )
        })}
      </div>
      <div className="currentUser center">
        <div className="currImg"><img src={currentUser?.avatarImage?.url} alt="" /></div>
        <div className="currName">{currentUser?.username}</div>
      </div>
    </div>
  );
}

export default Contacts;
