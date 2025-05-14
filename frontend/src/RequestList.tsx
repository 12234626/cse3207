import React from "react";
import "./RequestList.css";

function RequestList() {
  return (
    <div className="div-wrapper">
      <div className="div">
        <div className="view">
          <div className="element">
            <div className="overlap">
              <div className="overlap-group-wrapper">
                <div className="overlap-group">
                  <div className="text-wrapper">거절</div>
                </div>
              </div>

              <div className="overlap-wrapper">
                <div className="overlap-group">
                  <div className="text-wrapper-2">수락</div>
                </div>
              </div>

              <div className="text-wrapper-3">김ㅇㅇ</div>
              <div className="text-wrapper-4">ㅇㅇ학과 학번</div>
            </div>
          </div>
        </div>

        <div className="view-2">
          <div className="back">화살표</div>
          <div className="text-wrapper-5">받은 가입 요청</div>
        </div>
      </div>
    </div>
  );
}
export default RequestList;
