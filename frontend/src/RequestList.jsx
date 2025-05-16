import React from "react";
import "./RequestList.css";

function RequestList() {
  return (
    <div className="screen">
      <div className="phoneScreen">
        <div className="requests">
          <div className="element">
            <div className="request">
              <div className="requestName">김ㅇㅇ</div>
              <div className="requestInfo">ㅇㅇ학과 학번</div>
              <button className="refusal">
                거절
                {/* <button className="overlap-group">거절
                  <div className="text-wrapper">거절</div>
                </button> */}
              </button>

              <button className="acceptance">
                수락
                {/* <button className="overlap-group">
                  수락
                  <div className="text-wrapper-2">수락</div>
                </button> */}
              </button>

              {/* <div className="requestName">김ㅇㅇ</div>
              <div className="requestInfo">ㅇㅇ학과 학번</div> */}
            </div>
          </div>
        </div>

        <div className="topBar">
          <button className="back"></button>
          <div className="requestListText">받은 가입 요청</div>
        </div>
      </div>
    </div>
  );
}
export default RequestList;
