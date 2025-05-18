import React from "react";
import { useNavigate } from "react-router-dom";
import "./Manager.css";

function Manager() {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/JoinedClub");
  };

  const handleRequestedClick = () => {
    navigate("/RequestList");
  };
  return (
    <div className="screen">
      <div className="phoneScreen">
        <div className="managerMain">
          <div className="requestsBox">
            {/* <div className="overlap-group"> */}
            <div className="managerListText">받은 가입 요청</div>
            <button
              className="nextButton"
              onClick={handleRequestedClick}
            ></button>
            {/* </div> */}
          </div>
          <div className="memberListBox">
            {/* <div className="overlap-group"> */}
            <div className="managerListText">동아리 부원 명단</div>
            <button className="nextButton"></button>
            {/* </div> */}
          </div>
          <div className="writePostBox">
            {/* <div className="overlap-group"> */}
            <div className="managerListText">게시글 작성</div>
            <button className="nextButton"></button>
            {/* </div> */}
          </div>
        </div>
        <div className="topBar">
          <button className="back" onClick={handleBackClick}></button>
          <div className="managerText">관리자 권한</div>
        </div>
      </div>
    </div>
  );
}

export default Manager;
