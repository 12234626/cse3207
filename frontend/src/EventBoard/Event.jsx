import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Event.css";


function Event() {
    const navigate = useNavigate();
  
    const handleBackClick = () => {
        navigate("/MainH");
      };

    return (
     <div className = "element">
        <div className = "div">
            <div className = "view">
                <div className="overlap-group">

                    <div className="imageBox"/>
                        
                    <div className="ex">홍보내용</div>

                 
                </div>
            </div>

            <div className="view-3">
    
            <button className="back" onClick={handleBackClick}></button>
            <div className="Name">홍보글01</div>
                </div>   
            </div>
        </div>
    );
  }
  
  export default Event;
  