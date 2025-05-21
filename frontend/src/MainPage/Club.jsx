import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation} from "react-router-dom";
import "./Club.css";


function Club() {
    const navigate = useNavigate();
    const location = useLocation();
    const clubName = location.state?.clubName; // 전달된 동아리명 가져오기
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
            <div className="ClubName">{clubName || "동아리명을 불러오는 중..."}</div>
                </div>
                </div>   
            </div>
    );
  }
  
  
  export default Club;
  