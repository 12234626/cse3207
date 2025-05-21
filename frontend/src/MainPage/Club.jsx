import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Club.css";


function MainDong() {
    const navigate = useNavigate();
  
    const handleBackClick = () => {
        navigate("/MainDong");
      };

    return (
     <div className = "element">
        <div className = "div">
            <div className = "view">
                <div className="overlap-group">
                    <div className="view-2"></div>   
                    <div className="text-wrapper-2">동아리소개글</div>
                </div>
            </div>

            <div className="view-3">
            <button className="back" onClick={handleBackClick}></button>
            <div className="ClubName">동아리01</div>
                </div>   
            </div>
        </div>
    );
  }
  
  export default MainDong;
  