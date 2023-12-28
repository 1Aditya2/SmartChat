import React from 'react'
import './ChatBox.scss'
import Logout from '../Logout/Logout'
import ChatInput from '../ChatInput/ChatInput'
import Conversation from '../Conversation/Conversation'
function ChatBox({currentChat}) {
  return (
    <div className='chat-setup'>
        <div className="chat-header">
          <div className="selected-user center">
            <div className="selected-img">
              <img src={currentChat?.avatarImage?.url} alt="" />
            </div>
            <div className="selected-name">{currentChat?.username}</div>
          </div>
          <Logout/>
        </div>
        <Conversation/>
        <ChatInput/>
    </div>
  )
}

export default ChatBox