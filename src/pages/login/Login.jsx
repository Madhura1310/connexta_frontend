import { useContext, useRef } from "react";
import "./login.css";
import {loginCall} from "../../apicalls";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

export default function Login() {
  const email = useRef();
  const password = useRef();
  const {user,isFetching,error,dispatch} = useContext(AuthContext);
  const navigate = useNavigate();

  const handleClick=(e)=>{  
    e.preventDefault();
    loginCall({email:email.current.value, password:password.current.value}, dispatch)
  };
 
  const handleRegister =()=>{
    navigate("/register");
  }
  console.log(user)
  return (
    <div className='login'
  style={{
    background: "url('/assets/logo.png') center/cover no-repeat"
  }}
    >
        <div className="loginWrapper">
            <div className="loginLeft">
                <h3 className='loginLogo'></h3>
                <span className='loginDesc'></span>
                </div>
                <div className="loginRight" onSubmit={handleClick}>
                    <form className="loginBox">
                    <input placeholder="Email"
                     type="email" 
                     required  
                     className="loginInput"
                     ref={email}/>
                    <input placeholder="Password"
                      type="password" 
                      required 
                      minLength="6"
                      className="loginInput"
                      ref={password}/>
                    <button className="loginButton" type="submit" disabled={isFetching}>{isFetching ? <CircularProgress color="white" size="20px" /> :"Log In"}</button>
                    <span className="loginForgot">Forgot Password?</span>
                    <button className="loginRegisterButton" onClick={handleRegister}>{isFetching ? <CircularProgress color="white" size="20px" /> :"Create a New Account"}</button>
                </form>
                </div>
        </div> 
    </div>
  )
}


