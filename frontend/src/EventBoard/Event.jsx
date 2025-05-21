import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Event.css";


function MainH() {
    const navigate = useNavigate();
  
    return (
     <div className = "element">
        <div className = "div">
            <div className = "view">
                <div className="overlap-group">

                    <div className="view-2"/>
                        
                    <div className="text-wrapper-2">홍보글01</div>

                    <div className="text-wrapper-3">수정하기</div>
                </div>
            </div>

            <div className="view-3">
    

            <div className="text-wrapper-4">홍보글01</div>
                </div>   
            </div>
        </div>
    );
  }
  
  export default MainH;
  