import React from "react";
import { useNavigate } from "react-router-dom";
import "./JoinedClub.css";

function JoinedClub() {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/MyPage");
  };

  const handleManagerClick = () => {
    navigate("/Manager");
  };

  return (
    <div className="screen">
      <div className="phoneScreen">
        <div className="myClubPosts">
          <div className="element">
            <div className="myClubPost">
              <div className="myClubPostName">게시글01</div>
            </div>
          </div>
        </div>

        <div className="topBar">
          <button className="back" onClick={handleBackClick}></button>
          <div className="joinedClubText">가입한 동아리01</div>
        </div>
        <button className="managerButton" onClick={handleManagerClick}></button>
      </div>
    </div>
  );
}

export default JoinedClub;
