import React, { useEffect, useState } from 'react'
import './Login.scss'
import logo from "../../Assets/logo.png";
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer,toast } from 'react-toastify'
import axios from 'axios';
function Login() {
  const navigate=useNavigate()
  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  useEffect(()=>{
    if(localStorage.getItem('chatAppUser')){
      navigate('/')
    }
  },[])
  const toastStyle = {
    position: "bottom-right",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  function handleChange(e) {
    setValues({ ...values, [e.target.name]: e.target.value });
  }
  async function handleSubmit(e) {
    e.preventDefault();

    if (handleValidation()) {
      const { password, username } = values;
      const resp= await axios.post("http://localhost:4000/auth/login", {
        password,
        username,
      });
      if(resp.data.statusCode!==200){
        toast.error(resp.data.message,toastStyle)
      }
      else{
        const id=resp.data.result
        localStorage.setItem('chatAppUser',id)
        navigate('/')
      }
    }
  }
  function handleValidation() {
    const { password, username } = values;

    console.log("validation called");
    if (password ==="") {
      toast.error("Password is required!", toastStyle);
      return false;
    } else if (username.length ===0) {
      toast.error("Username is required!", toastStyle);
      return false;
    } else {
      return true;
    }
  }
  return (
    <div className="login center">
      <div className="login-box center">
        <div className="chat-img">
          <img src={logo} alt="Logo" />
        </div>
        <div className="form">
          <form className="center" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={handleChange}
              // required={true}
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              // required={true}
              onChange={handleChange}
            />
            <div className="button">
              <button className="btn" type="submit">
                LogIn
              </button>
            </div>
          </form>
        </div>
        <div className="sign-in">
          Don't have an account? <Link className="lnk" to={'/register'}>SignUp</Link>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default Login