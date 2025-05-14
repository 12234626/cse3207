import React from "react";
import "./MemberList.css";

function MemberList() {
  return (
    <div className="screen">
      <div className="phoneScreen">
        <div className="list">
          <div className="element">
            <div className="member">
              <div className="memberName">김ㅇㅇ</div>
              <div className="memberInfo">ㅇㅇ학과 학번</div>
            </div>
          </div>
        </div>
        <div className="view-2">
          <div className="back">화살표</div>
          <div className="text-wrapper-3">동아리 부원 명단</div>
        </div>
      </div>
    </div>
  );
}
export default MemberList;
