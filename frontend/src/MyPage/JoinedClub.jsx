import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./JoinedClub.css";

function JoinedClub() {
  const navigate = useNavigate();
  const [posts, setNoticePosts] = useState([]);
  const [clubName, setClubName] = useState("");

  useEffect(() => {
    // const clubData = JSON.parse(localStorage.getItem("club"));
    const clubData = localStorage.getItem("club");
    if (!clubData) {
      // club 데이터가 없는 경우 처리
      console.error("동아리 정보를 찾을 수 없습니다.");
      navigate("/MyPage"); // MyPage로 돌아가기
      return;
    }

    const club = JSON.parse(clubData);
    // setClubName(club.name);

    const fetchNoticePosts = async () => {
      try {
        const response = await fetch(
          // `http://localhost:3000/db/post?type=notice&club_id=${club.id}`
          `http://localhost:3000/db/club_member/post/club/${club.id}`
        );
        const data = await response.json();
        setNoticePosts(data);
        if (data.length > 0) setClubName(data[0].club_name);
        else setClubName(club.name);
      } catch (error) {
        console.error("가입한 동아리 불러오기 실패", error);
      }
    };
    fetchNoticePosts();
    // setClubName(club.name);

    // axios
    //   .get(`http://localhost:3000/db/post?type=notice&club_id=${club.id}`)
    //   .then((response) => {
    //     console.debug(response);
    //     setNoticePosts(response.data);
    //   });
    // const fetchNoticePosts = async () => {
    //   try {
    //     const response = await fetch(
    //       `http://localhost:3000/db/post?type=notice&club_id=${club.id}`
    //     );
    //     const data = await response.json();
    //     setNoticePosts(data);
    //   } catch (error) {
    //     console.error("가입한 동아리 게시글 불러오기 실패", error);
    //   }
  }, [navigate]);
  // fetchNoticePosts();
  // }, []);

  const handleBackClick = () => {
    navigate("/MyClubList");
  };

  const handleManagerClick = () => {
    navigate("/Manager");
  };

  return (
    <div className="screen">
      <div className="phoneScreen">
        <div className="myClubPosts">
          {posts.map((post, index) => (
            <div key={index} className="element">
              <div className="myClubPost">
                <div className="myClubPostName">{post.title}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="topBar">
          <button className="back" onClick={handleBackClick}></button>
          <div className="joinedClubText">{clubName}</div>
        </div>
        <button className="managerButton" onClick={handleManagerClick}></button>
      </div>
    </div>
  );
}

export default JoinedClub;
