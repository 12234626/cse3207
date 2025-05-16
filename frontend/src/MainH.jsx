import React from "react";
import "./MainH.css";

function MainH() {
  return (
    <div className="div-wrapper">
      <div className="overlap-wrapper">
        <div className="overlap">
          <div className="view">
            {/* <img className="user" alt="User" src={user} /> */}
          </div>

          <div className="overlap-group">
            <div className="overlap-group-wrapper">
              <div className="div">
                <div className="text-wrapper">행사 게시판</div>
              </div>
            </div>

            <div className="view-2">
              <div className="overlap-2">
                <div className="text-wrapper-2">동아리</div>
              </div>
            </div>

            <div className="view-wrapper">
              <div className="view-3">
                <div className="overlap-group-2">
                  <div className="text-wrapper-3">홍보글01</div>

                  <div className="text-wrapper-4">홍보글내용</div>

                  <div className="view-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainH;
