import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MemberList.css";

function MemberList() {
  const navigate = useNavigate();
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const club = JSON.parse(localStorage.getItem("club"));
    if (!club) return;
    fetch(`http://localhost:3000/db/club_member?club_id=${club.id}`)
      .then((res) => res.json())
      .then((data) => setMembers(Array.isArray(data) ? data : []));
  }, []);

  const handleDelete = async (member) => {
    if (!window.confirm(`${member.name} 회원을 정말 삭제하시겠습니까?`)) return;
    try {
      const club = JSON.parse(localStorage.getItem("club"));
      const response = await fetch("http://localhost:3000/db/club_member", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ club_id: club.id, user_id: member.user.id }),
      });
      if (response.ok) {
        setMembers(members.filter((m) => m.user.id !== member.user.id));
      } else {
        alert("삭제 실패");
      }
    } catch (error) {
      alert("서버 오류");
    }
  };

  // const fetchMembers = async () => {
  //   try {
  //     const response = await fetch(
  //       `http://localhost:3000/db/club_member/user_id/${club.id}`
  //     );
  //     const data = await response.json();
  //     setMembers(data);
  //   } catch (error) {
  //     console.error("부원 목록 불러오기 실패", error);
  //   }
  // };
  // fetchMembers();
  // }

  const handleBackClick = () => {
    navigate("/Manager");
  };

  return (
    <div className="screen">
      <div className="phoneScreen">
        <div className="members">
          {/* <pre>{JSON.stringify(members, null, 2)}</pre> */}
          {members.map((member, idx) => (
            <div className="element" key={idx}>
              <div className="member">
                <div className="memberName">{member.name}</div>
                <div className="memberInfo">
                  {member.department} {member.user.id}
                </div>
                <button className="delete" onClick={() => handleDelete(member)}>
                  삭제
                </button>
              </div>
            </div>
          ))}
          {/* 예시 부원 */}
          {/* <div className="element">
            <div className="member">
              <div className="memberName">김ㅇㅇ</div>
              <div className="memberInfo">ㅇㅇ학과 학번</div>
              <button className="delete">삭제</button>
            </div>
          </div> */}
        </div>
        <div className="topBar">
          <button className="back" onClick={handleBackClick}></button>
          <div className="memberListText">동아리 부원 명단</div>
        </div>
      </div>
    </div>
  );
}
export default MemberList;
