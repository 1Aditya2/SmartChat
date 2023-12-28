import React, { useEffect, useState } from "react";
import logo from "../../Assets/logo.png";
import "./Register.scss";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
function Register() {
  const navigate=useNavigate()
  useEffect(()=>{
    if(localStorage.getItem('chatAppUser')){
      navigate('/')
    }
  },[])
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
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
      const { email, password, username } = values;
      const resp= await axios.post("http://localhost:4000/auth/register", {
        email,
        password,
        username,
      });
      if(resp.data.statusCode!==200){
        toast.error(resp.data.message,toastStyle)
      }
      else{
        const id=resp.data.result
        localStorage.setItem('chatAppUser',id)
        navigate('/setAvatar')
      }
      
      
      console.log(resp);
    }
  }
  function handleValidation() {
    const { password, confirmPassword, username } = values;

    console.log("validation called");
    if (password !== confirmPassword) {
      toast.error("Password and Confirm Password should be same!", toastStyle);
      return false;
    } else if (username.length < 4) {
      toast.error("Username should be greater than 3 characters!", toastStyle);
      return false;
    } else if (password.length < 4) {
      toast.error(
        "Password should be greater than or equal to 4 characters!",
        toastStyle
      );
      return false;
    } else {
      return true;
    }
  }
  return (
    <div className="register center">
      <div className="register-box center">
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
              required={true}
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              required={true}
              onChange={handleChange}
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              required={true}
              onChange={handleChange}
            />

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              required={true}
              onChange={handleChange}
            />
            <div className="button">
              <button className="btn" type="submit">
                SignUp
              </button>
            </div>
          </form>
        </div>
        <div className="sign-in">
          Already have an account? <Link className="lnk" to={'/login'}>SignIn</Link>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Register;
