import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RequestList.css";

function RequestList() {
  const navigate = useNavigate();
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const club = JSON.parse(localStorage.getItem("club"));
    if (!club) return;
    fetch(`http://localhost:3000/db/club_request?club_id=${club.id}`)
      .then((res) => res.json())
      .then((data) => setMembers(data));
  }, []);

  const handleBackClick = () => {
    navigate("/Manager");
  };

  const handleAccept = async (member) => {
    if (!window.confirm(`${member.name}님의 가입 신청을 수락하시겠습니까?`))
      return;
    try {
      // const club = JSON.parse(localStorage.getItem("club"));
      const response = await fetch("http://localhost:3000/db/club_request", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: member.id,

          status: "accepted", // 수락
        }),
      });
      if (response.ok) {
        setMembers((prev) => prev.filter((m) => m.id !== member.id));
      } else {
        alert("수락 실패");
      }
    } catch (error) {
      alert("서버 오류");
    }
  };

  const handleRefuse = async (member) => {
    if (!window.confirm(`${member.name}님의 가입 신청을 거절하시겠습니까?`))
      return;
    try {
      // const club = JSON.parse(localStorage.getItem("club"));
      const response = await fetch("http://localhost:3000/db/club_request", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: member.id,
          status: "rejected",
        }),
      });
      if (response.ok) {
        setMembers(members.filter((m) => m.id !== member.id));
      } else {
        alert("거절 실패");
      }
    } catch (error) {
      alert("서버 오류");
    }
  };

  return (
    <div className="screen">
      <div className="phoneScreen">
        <div className="requests">
          {/* <pre>{JSON.stringify(members, null, 2)}</pre> */}
          {members.map((member, idx) => (
            <div className="element" key={idx}>
              <div className="request">
                <div className="requestName">{member.name}</div>
                <div className="requestInfo">
                  {member.department} <br />
                  {member.user_id}
                </div>
                <button
                  className="refusal"
                  onClick={() => handleRefuse(member)}
                >
                  거절
                  {/* <button className="overlap-group">거절
                  <div className="text-wrapper">거절</div>
                </button> */}
                </button>

                <button
                  className="acceptance"
                  onClick={() => handleAccept(member)}
                >
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
          ))}
        </div>

        <div className="topBar">
          <button className="back" onClick={handleBackClick}></button>
          <div className="requestListText">받은 가입 요청</div>
        </div>
      </div>
    </div>
  );
}
export default RequestList;
