import React, { useEffect, useState } from "react";
import "./Avatar.scss";
import userImg from "../../Assets/userImage.png";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
function Avatar() {
  const [avatar, setAvatar] = useState(null);
  const navigate = useNavigate();
  const toastStyle = {
    position: "bottom-right",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    async function fetchAvatar() {
      const id = localStorage.getItem("chatAppUser");
      if (id) {
        const user = await axios.post("http://localhost:4000/auth/getAvatar", {
          id,
        });
        console.log(user);
        if (user.data.statusCode !== 200) {
          toast.error(user.data.message, toastStyle);
        } else {
          if (user.data.result.isAvatarSet === true) {
            setAvatar(user.data.result.avatarImage.url);
          } else {
            setAvatar(userImg);
          }
        }
      }
    }
    fetchAvatar()
  }, []);
  function handleImageChange(e) {
    const file = e.target.files[0];
    const filereader = new FileReader();
    filereader.readAsDataURL(file);
    filereader.onload = () => {
      if (filereader.readyState === filereader.DONE) {
        setAvatar(filereader.result);
      }
    };
  }
  async function handleClick() {
    const id = localStorage.getItem("chatAppUser");
    const resp = await axios.post("http://localhost:4000/auth/setAvatar", {
      avatar,
      id,
    });
   
    if (resp.data.statusCode !== 200) {
      toast.error(resp.data.message, toastStyle);
    } else {
      toast.success(resp.data.result.message, toastStyle);
      navigate("/");
    }
  }
  return (
    <div className="set-avatar center">
      <div className="avatar-box center">
        <div className="head">Set Your Avatar!</div>
        <div className="avatar center">
          <label htmlFor="inputImg" className="labelImg">
            {avatar && <img src={avatar} alt="Profile picture" />}
          </label>

          <input
            type="file"
            className="inputImg"
            id="inputImg"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        <div className="two-btns">
          <button className="btn" onClick={handleClick}>
            Set Avatar
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Avatar;
