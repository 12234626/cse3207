import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate,useLocation } from "react-router-dom";
import "./Event.css";


function Event() {
    const navigate = useNavigate();
    const location = useLocation();
    const eventTitle = location.state?.eventTitle || "홍보글을 불러오는 중..."; // MainH에서 전달된 홍보글 제목
    
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
            <div className="Name">{eventTitle}</div>
                </div>   
            </div>
        </div>
    );
  }
  
  export default Event;
  