import React from 'react'
import img from "../assets/Logo.png"
import "../styles/landing.css"
import { useNavigate } from 'react-router-dom'

export default function Landing() {
  
  const navigate = useNavigate();

 function handleLogin() {
    navigate("/home");   
  }

  return (
    <>
      <div className="landing-container">

        <img 
          src={img} 
          alt="Landing Page Logo" 
          className="landing-logo"
        />

        <h4 className="landing-title">
          Where Sports Dreams Connect
        </h4>

       <button className="btn btn-orange" onClick={handleLogin}>
      Get Started <i className="fa-solid fa-arrow-right"></i>
    </button>

      </div>
    </>
  )
}
