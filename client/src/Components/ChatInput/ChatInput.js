import React, { useState } from "react";
import "./ChatInput.scss";
import Picker from 'emoji-picker-react'
function ChatInput() {
  const [msg, setMsg] = useState("");
  const [emojiPicker, setEmojiPicker] = useState(false);

  function handleSend(e) {
    e.preventDefault();
    setMsg("");
  }
  function handleEmojiClick(e,emoji){
    console.log(emoji);
    let message=msg
    message += emoji.emoji
    setMsg(message)
  }
  return (
    <div className="chat-input center">
      <div className="emo-input-send">
        <div className="emoji btn" >
          <i className="fa-solid fa-face-smile" onClick={()=>setEmojiPicker(!emojiPicker)}></i>
          {emojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
 
        </div>
        <form action="submit" onSubmit={handleSend}>
          <div className="input-box">
            <input
              type="text"
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              placeholder="Type your message here!"
            />
          </div>
        </form>

        <div className="send btn" onClick={handleSend}>
          <i className="fa-solid fa-paper-plane"></i>
        </div>
      </div>
    </div>
  );
}

export default ChatInput;
