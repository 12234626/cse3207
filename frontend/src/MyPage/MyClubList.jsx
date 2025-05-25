import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./MyClubList.css";

function MyClubList() {
  const navigate = useNavigate();

  const [clubs, setClubs] = useState([]);

  const handleBackClick = () => {
    navigate("/MyPage");
  };

  const handleMyClubClick = (club) => {
    localStorage.setItem("club", JSON.stringify(club));
    navigate("/JoinedClub");
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return;

    const fetchJoinedClubs = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/db/club_member/user?id=${user.id}`
        );
        const data = await response.json();
        setClubs(data);
      } catch (error) {
        console.error("가입한 동아리 불러오기 실패", error);
      }
    };
    fetchJoinedClubs();
  }, []);

  return (
    <div className="screen">
      <div className="phoneScreen">
        {/* <pre>{JSON.stringify(clubs, null, 2)}</pre> */}
        <div className="myClubs">
          {clubs.map((club) => (
            <div className="element" key={club.id || club.club_id}>
              <div className="myClub">
                <div className="myClubName">{club.name}</div>
                <button
                  className="clubCommunity"
                  onClick={() => handleMyClubClick(club)}
                ></button>
              </div>
            </div>
          ))}
        </div>

        <div className="topBar">
          <button className="back" onClick={handleBackClick}></button>
          <div className="myClubListText">내가 가입한 동아리</div>
        </div>
      </div>
    </div>
  );
}

export default MyClubList;
