import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./MainH.css";

const MainH = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const storedClubData = localStorage.getItem("club");
      if (!storedClubData) {
        console.error("동아리 정보가 없습니다.");
        return;
      }
      const club = JSON.parse(storedClubData);

      const response = await fetch(
        `http://localhost:3000/db/post/club?id=${club.club.id}`
      );
      const data = await response.json();

      // 생성일 기준 내림차순 정렬 (최신 글이 위로)
      const sortedPosts = data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      setPosts(sortedPosts);
    } catch (error) {
      console.error("게시물 요청 실패:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleBackClick = () => {
    navigate("/JoinedClub");
  };

  const handleWriteClick = () => {
    navigate("/WriteHongboPost");
  };

  return (
    <div className="mainHPage">
      <div className="header">
        <div className="backButton" onClick={handleBackClick}>
          ←
        </div>
        <div className="title">홍보 게시판</div>
        <div className="writeButton" onClick={handleWriteClick}>
          글쓰기
        </div>
      </div>
      <div className="postsContainer">
        {posts.map((post) => (
          <div key={post.id} className="postItem">
            <div className="postType">{post.type}</div>
            <div className="postTitle">{post.title}</div>
            <div className="postContent">{post.content}</div>
            <div className="postDate">
              {new Date(post.created_at).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainH; 