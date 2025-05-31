import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./JoinedClub.css";

function JoinedClub() {
  const navigate = useNavigate();
  const [posts, setNoticePosts] = useState([]);
  const [clubName, setClubName] = useState("");
  const [isManager, setIsManager] = useState(false);

  useEffect(() => {
    // const clubData = JSON.parse(localStorage.getItem("club"));
    const clubData = localStorage.getItem("club");
    const user = JSON.parse(localStorage.getItem("user"));
    if (!clubData) {
      // club 데이터가 없는 경우 처리
      console.error("동아리 정보를 찾을 수 없습니다.");
      navigate("/MyPage"); // MyPage로 돌아가기
      return;
    }

    const club = JSON.parse(clubData);
    // setClubName(club.name);

    // 관리자 권한 확인
    if (club.club.admin_user_id !== undefined) {
      setIsManager(club.club.admin_user_id === user.id);
    } else {
      // 만약 club에 admin 정보가 없다면 백엔드에서 admin 정보 요청
      fetch(`http://localhost:3000/db/club?id=${club.id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data && data[0] && data[0].club.admin_user_id === user.id) {
            setIsManager(true);
          } else {
            setIsManager(false);
          }
        });
    }

    const fetchNoticePosts = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/post?club_id=${club.club_id}`
        );
        const data = await response.json();
        // 공지 타입만 필터링
        const noticePosts = data.filter(post => post.type === "공지")
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // ✅ 최신순 정렬;

        setNoticePosts(noticePosts);

        // const detailPost = data.find((post) => post.type === "상세 설명");
        // if (detailPost) {
        //   setClubName(detailPost.club.name);
        //   localStorage.setItem("post", JSON.stringify(detailPost));
        // } else {
        //   setClubName(club.club.name);
        //   localStorage.removeItem("post");
        // }
      } catch (error) {
        console.error("가입한 동아리 불러오기 실패", error);
      }
    };
    fetchNoticePosts();
    // setClubName(club.name);

    // axios
    //   .get(`http://localhost:3000/db/post?type=공지&club_id=${club.id}`)
    //   .then((response) => {
    //     console.debug(response);
    //     setNoticePosts(response.data);
    //   });
    // const fetchNoticePosts = async () => {
    //   try {
    //     const response = await fetch(
    //       `http://localhost:3000/db/post?type=공지&club_id=${club.id}`
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

  const handleNoticeClick = (noticeId) => {
    navigate(`/notice-club/${noticeId}`); // 공지 ID를 URL에 포함
  };

  return (
    <div className="screen">
      <div className="phoneScreen">
      <div className="myClubPosts">
          {posts.length === 0 ? (
            <div className="emptyNotice">아직 작성된 공지글이 없습니다</div>
          ) : (
            posts.map((post, index) => (
              <div
                key={index}
                className="element"
                onClick={() => handleNoticeClick(post.id)}
                style={{ cursor: "pointer" }}
              >
                <div className="myClubPost">
                  <div className="myClubPostName">{post.title}</div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="joinedClubTop">
          {clubName}
          <button className="back" onClick={handleBackClick}></button>
          {/* <div className="joinedClubText">{clubName}</div> */}
        </div>
        {isManager && (
          <button
            className="managerButton"
            onClick={handleManagerClick}
          ></button>
        )}
      </div>
      
    </div>
  );
}

export default JoinedClub;
