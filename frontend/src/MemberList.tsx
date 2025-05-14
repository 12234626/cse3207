import React from "react";
import "./MemberList.css";

function MemberList() {
  return (
    <div className="screen">
      <div className="phoneScreen">
        <div className="members">
          <div className="element">
            <div className="member">
              <div className="memberName">김ㅇㅇ</div>
              <div className="memberInfo">ㅇㅇ학과 학번</div>
              <button className="delete">삭제</button>
            </div>
          </div>
        </div>
        <div className="topBar">
          <div className="back">{"<"}</div>
          <div className="memberListText">동아리 부원 명단</div>
        </div>
      </div>
    </div>
  );
}
export default MemberList;
