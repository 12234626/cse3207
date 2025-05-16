import React from "react";
import { useNavigate } from "react-router-dom";
import "./MainH.css";

function MainH() {
  const navigate = useNavigate();

  const handleMainDongClick = () => {
    navigate("/MainDong");
  };

  return (
    <div className="screen">
      <div className="phoneScreen">
        <div className="topBar">
          <div className="myPageButton">{/* <div className="user" /> */}</div>

          {/* <div className="overlap-group"> */}
          <div className="hongBoButton">
            <button className="hongBoPostY">
              홍보게시판
              {/* <div className="text-wrapper">행사 게시판</div> */}
            </button>
          </div>

          <div className="clubButton">
            <button className="clubPostN" onClick={handleMainDongClick}>
              동아리
              {/* <div className="text-wrapper-2">동아리</div> */}
            </button>
          </div>

          <div className="hongBoScreen">
            <div className="hongBoList">
              <div className="hongBo">
                <div className="hongBoName">홍보글01</div>

                <div className="hongBoInfo">홍보글내용</div>

                <div className="hongBoImage" />
              </div>
            </div>
          </div>
          {/* </div> */}
        </div>
      </div>
    </div>
  );
}

export default MainH;
