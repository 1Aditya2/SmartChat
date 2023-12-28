import React, { useEffect, useState } from "react";
import "./Chat.scss";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Contacts from "../../Components/Contacts/Contacts";
import wel from "../../Assets/wel.webp";
import ChatBox from "../../Components/ChatBox/ChatBox";
function Chat() {
  const [contacts, setContacts] = useState(undefined);
  const [currUser, setCurrUser] = useState(undefined);
  const [currChat, setcurrChat] = useState(undefined);
  const toastStyle = {
    position: "bottom-right",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  useEffect(() => {
    async function fetchContacts() {
      console.log("fetchContacts called");
      const id = localStorage.getItem("chatAppUser");
      const allContacts = await axios.post(
        "http://localhost:4000/auth/getContacts",
        { id }
      );
      if (allContacts.data.statusCode !== 200) {
        toast.error(allContacts.data.message, toastStyle);
      } else {
        setContacts(allContacts.data.result.allContacts);
        setCurrUser(allContacts.data.result.user);
      }
    }
    fetchContacts();
  }, []);

  function handleChangeChat(contact) {
    setcurrChat(contact);
  }

  return (
    <div className="chat center">
      <div className="chat-container">
        <div className="contacts">
          <Contacts
            contacts={contacts}
            currentUser={currUser}
            changeChat={handleChangeChat}
          />
        </div>
        <div className="chatter">
          {currChat !== undefined ? (
            // <div className="chat-box">
              <ChatBox currentChat={currChat}/>
            // </div>
          ) : (
            <div className="welcome center">
              <img src={wel} alt="" />
              <h2>
                Welcome! <span>{currUser?.username}</span>,<br /> Please select
                a chat to start messaging
              </h2>
            </div>
          )}
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}

export default Chat;
