import React from "react";
import { useNavigate } from "react-router-dom";
import "./CreateClub.css";

function CreateClub() {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/MyPage");
  };

  return (
    <div className="screen">
      <div className="phoneScreen">
        <div className="createClubMain">
          <input type="text" className="URLBox" placeholder="URL">
            {/* <div className="overlap-group">
              <div className="text-wrapper">URL</div>
            </div> */}
          </input>

          <input type="text" className="clubInfoInput" placeholder="글 작성">
            {/* <div className="overlap">
              <div className="text-wrapper-2">글 작성</div>
            </div> */}
          </input>

          <input type="text" className="clubImgInput" placeholder="+">
            {/* <div className="overlap-2">
              <div className="text-wrapper-3">+</div>
            </div> */}
          </input>

          <input
            type="text"
            className="clubNameInput"
            placeholder="동아리명을 입력하세요"
          >
            {/* <div className="overlap-group">
              <div className="text-wrapper-4">동아리명을 입력하세요</div>
            </div> */}
          </input>

          {/* <div className="view-3">
            <div className="overlap-3">
              <div className="text-wrapper-5">정보</div>
              <div className="overlap-group-2">
                <div className="rectangle" />
                <div className="text-wrapper-6">행사</div>
              </div>
            </div>
          </div> */}

          <button className="okButton">
            확인
            {/* <div className="overlap-4">
              <div className="text-wrapper-7">확인</div>
            </div> */}
          </button>
        </div>

        <div className="topBar">
          <button className="back" onClick={handleBackClick}></button>
          <div className="createClubText">동아리 생성</div>
        </div>
      </div>
    </div>
  );
}
export default CreateClub;
