import React from "react";
import { useNavigate } from "react-router-dom";
import "./Manager.css";

function Manager({ clubId }) {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/JoinedClub");
  };

  const handleRequestedClick = () => {
    navigate("/RequestList");
  };

  const handleWritePostClick = () => {
    navigate("/WriteHongboPost");
  };

  const handleMemberListClick = () => {
    navigate("/MemberList");
  };

  const handleFixClubClick = () => {
    navigate("/FixClub");
  };

  // 동아리 삭제 핸들러
  const handleDeleteClubClick = async () => {
    if (!window.confirm("정말로 동아리를 삭제하시겠습니까?")) return;
    try {
      const response = await fetch("http://localhost:3000/db/club", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: clubId }),
      });
      if (response.ok) {
        alert("동아리가 삭제되었습니다.");
        navigate("/JoinedClub"); // 삭제 후 이동할 페이지
      } else {
        alert("삭제에 실패했습니다.");
      }
    } catch (err) {
      alert("오류가 발생했습니다.");
    }
  };

  return (
    <div className="screen">
      <div className="phoneScreen">
        <div className="managerMain">
          <div className="requestsBox">
            {/* <div className="overlap-group"> */}
            <div className="managerListText">받은 가입 요청</div>
            <button
              className="nextButton"
              onClick={handleRequestedClick}
            ></button>
            {/* </div> */}
          </div>
          <div className="memberListBox">
            {/* <div className="overlap-group"> */}
            <div className="managerListText">동아리 부원 명단</div>
            <button
              className="nextButton"
              onClick={handleMemberListClick}
            ></button>
            {/* </div> */}
          </div>
          <div className="writePostBox">
            {/* <div className="overlap-group"> */}
            <div className="managerListText">게시글 작성</div>
            <button
              className="nextButton"
              onClick={handleWritePostClick}
            ></button>
            {/* </div> */}
          </div>
          <div className="fixClubBox">
            {/* <div className="overlap-group"> */}
            <div className="managerListText">동아리 수정</div>
            <button
              className="nextButton"
              onClick={handleFixClubClick}
            ></button>
            {/* </div> */}
          </div>
          <div className="deleteClubBox">
            {/* <div className="overlap-group"> */}
            <div className="managerListText" onClick={handleDeleteClubClick}>
              동아리 삭제
            </div>
            <button className="nextButton"></button>
            {/* </div> */}
          </div>
        </div>
        <div className="topBar">
          <button className="back" onClick={handleBackClick}></button>
          <div className="managerText">관리자 권한</div>
        </div>
      </div>
    </div>
  );
}

export default Manager;
