import React from "react";
import "./FixMemberInfo.css";

function FixMemberInfo() {
  return (
    <div className="screen">
      <div className="phoneScreen">
        <div className="fixInfoMain">
          {/* <div className="view"> */}
          <div className="infoBox">
            <div className="profileImg"></div>
            <div className="infoBox1">
              <div className="fixNameBox">
                <div className="fixText">이름</div>
                <input type="text" className="fNameInput"></input>
              </div>
              <div className="fixMajorBox">
                <div className="fixText">학과</div>
                <input type="text" className="fMajorInput"></input>
              </div>
              <div className="fixPhoneBox">
                <input type="text" className="fPhoneInput"></input>
                <div className="fixText">전화번호</div>
              </div>
            </div>
          </div>
          {/* </div> */}
          <button className="overlap-group-wrapper">
            수정하기
            {/* <div className="overlap-group">
              수정하기
              <div className="text-wrapper-2">수정하기</div>
            </div> */}
          </button>
        </div>
        <div className="topBar">
          <button className="back"></button>
          <div className="fixMemberInfoText">회원 정보 수정</div>
        </div>
      </div>
    </div>
  );
}

export default FixMemberInfo;
