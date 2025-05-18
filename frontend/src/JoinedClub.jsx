import React from "react";
import { useNavigate } from "react-router-dom";
import "./JoinedClub.css";

function JoinedClub() {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/MyPage");
  };

  return (
    <div className="screen">
      <div className="phoneScreen">
        <div className="myClubs">
          <div className="element">
            <div className="myClub">
              <div className="myClubName">게시글01</div>
            </div>
          </div>
        </div>

        <div className="topBar">
          <button className="back" onClick={handleBackClick}></button>
          <div className="myClubListText">가입한 동아리01</div>
        </div>
      </div>
    </div>
  );
}

export default JoinedClub;
