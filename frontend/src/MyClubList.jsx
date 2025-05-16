import React from "react";
import { useNavigate } from "react-router-dom";
import "./MyClubList.css";

function MyClubList() {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/MyPage");
  };

  return (
    <div className="screen">
      <div className="phoneScreen">
        <div className="myClubs">
          <div className="element">
            <div className="request">
              <div className="myClubName">가입한 동아리01</div>
            </div>
          </div>
        </div>

        <div className="topBar">
          <button className="back" onClick={handleBackClick}></button>
          <div className="myClubListText">내가 가입한 동아리</div>
        </div>
      </div>
    </div>
  );
}

export default MyClubList;
