import React from "react";
import { useNavigate } from "react-router-dom";
import "./MainDong.css";

function MainDong() {
  const navigate = useNavigate();

  const handleMainHClick = () => {
    navigate("/MainH");
  };

  return (
    <div className="screen">
      <div className="phoneScreen">
        <div className="topBar" />

        <div className="main">
          <div className="myPageButton">{/* <div className="user" /> */}</div>

          {/* <div className="overlap-group"> */}
          <div className="hongBoButton">
            <button className="hongBoPost" onClick={handleMainHClick}>
              홍보게시판
              {/* <div className="text-wrapper">홍보 게시판</div> */}
            </button>
          </div>

          <div className="clubButton">
            <button className="clubPost">
              동아리
              {/* <div className="text-wrapper-2">동아리</div> */}
            </button>
          </div>

          <div className="view-2">
            <div className="view-3">
              <div className="overlap-group-3">
                <div className="text-wrapper-3">모집중</div>
              </div>
            </div>

            <div className="view-4">
              <div className="overlap-3">
                <div className="text-wrapper-4">분야:</div>

                <div className="text-wrapper-5">연구</div>
              </div>
            </div>

            <div className="view-5">
              <div className="overlap-4">
                <div className="text-wrapper-4">영역:</div>

                <div className="text-wrapper-6">중앙동아리</div>
              </div>
            </div>

            <div className="clubList">
              <div className="club">
                <div className="clubName">동아리01</div>

                <div className="shortInfo">한줄소개</div>

                <div className="apply">
                  <button className="applyButton">
                    신청
                    {/* <div className="text-wrapper-9">신청</div> */}
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* </div> */}
        </div>
      </div>
    </div>
  );
}

export default MainDong;
