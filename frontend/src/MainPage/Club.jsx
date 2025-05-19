import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Club.css";


function MainDong() {
    const navigate = useNavigate();
  
    return (
     <div className = "element">
        <div className = "div">
            <div className = "view">
                <div className="overlap-group">
                    <div className="text-wrapper">동아리 상세 설명</div>

                    <div className="view-2"/>
                        
                    <div className="text-wrapper-2">동아리01</div>

                    <div className="text-wrapper-3">수정하기</div>
                </div>
            </div>

            <div className="view-3">
    

            <div className="text-wrapper-4">동아리01</div>
                </div>   
            </div>
        </div>
    );
  }
  
  export default MainDong;
  