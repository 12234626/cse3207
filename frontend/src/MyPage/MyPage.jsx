import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
// import { useLocation } from "react-router-dom";
// import image2 from "./image-2.svg";
// import image3 from "./image-3.svg";
// import image4 from "./image-4.svg";
// import image5 from "./image-5.svg";
// import image6 from "./image-6.svg";
// import image from "./image.svg";
import "./MyPage.css";

function MyPage() {
  const [user, setUser] = useState(null);
  const [club, setClub] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profileImage, setProfileImage] = useState("");
  const location = useLocation();

  const loadUserData = async () => {
    const userData = localStorage.getItem("user");
    const clubData = localStorage.getItem("club");

    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        const finalUser = parsedUser.user ? parsedUser.user : parsedUser;
        setUser(finalUser);
        console.log("Loaded user data:", finalUser);

        // image_id를 기반으로 프로필 이미지 설정
        if (finalUser.image_id) {
          try {
            const response = await fetch(
              `http://localhost:3000/api/image?id=${finalUser.image_id}`
            );
            const imageData = await response.json();
            console.log("Image data:", imageData);
            if (imageData && imageData.length > 0) {
              // 이미지 경로를 public URL로 변환
              const imagePath = imageData[0].path;
              const imageUrl = `http://localhost:3000/${imagePath}`;
              console.log("Setting image URL:", imageUrl);
              setProfileImage(imageUrl);
            } else {
              setProfileImage(
                "http://localhost:3000/public/images/default_profile.jpg"
              );
            }
          } catch (error) {
            console.error("이미지 로딩 에러:", error);
            setProfileImage(
              "http://localhost:3000/public/images/default_profile.jpg"
            );
          }
        } else {
          setProfileImage(
            "http://localhost:3000/public/images/default_profile.jpg"
          );
        }
      } catch (error) {
        console.error("user 데이터 파싱 에러:", error);
      }
    }

    if (clubData) {
      try {
        const parsedClub = JSON.parse(clubData);
        setClub(parsedClub);
      } catch (error) {
        console.error("club 데이터 파싱 에러:", error);
      }
    }

    setLoading(false);
  };

  // 컴포넌트가 마운트될 때와 location이 변경될 때 데이터 로드
  useEffect(() => {
    loadUserData();
  }, [location]);

  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate("/MainDong");
  };

  const handleFixInfoButton = () => {
    navigate("/FixMemberInfo");
  };

  const handleJoinedClub = () => {
    navigate("/MyClubList");
  };

  const handleRequestStatus = () => {
    navigate("/RequestStatus");
  };

  const handleCreateClub = () => {
    navigate("/CreateClub");
  };

  const handleLogout = () => {
    navigate("/");
  };

  const handleWithdraw = async () => {
    if (!user) return;

    const confirmWithdraw = window.confirm("정말 탈퇴하시겠습니까?");
    if (!confirmWithdraw) return;

    try {
      const response = await fetch(`http://localhost:3000/db/user/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: user.id }),
      });

      if (response.ok) {
        localStorage.removeItem("user");
        localStorage.removeItem("club");
        alert("탈퇴 완료");
        navigate("/");
      } else {
        alert("탈퇴에 실패했습니다.");
      }
    } catch (error) {
      alert("탈퇴 처리 중 오류가 발생했습니다.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>로그인이 필요합니다.</div>;
  }

  return (
    <div className="screen">
      <div className="phoneScreen">
        <div className="myPageMain">
          <div className="myPageScreen">
            {/* <div className="overlap-group-wrapper">
              <div className="overlap-group">
                <div className="text-wrapper">탈퇴</div>

                <div className="image" alt="Image" />
              </div>
            </div> */}

            {/* <div className="div-wrapper">
              <div className="overlap-group">
                <div className="text-wrapper">문의사항</div>

                <div className="image" alt="Image" />
              </div>
            </div> */}

            <div className="fixMemberInfo">
              <div className="fixMemberInfo1">
                <div className="fixInfoButton" onClick={handleFixInfoButton}>
                  회원 정보 수정
                </div>
                {profileImage && (
                  <img
                    src={profileImage}
                    alt="프로필 이미지"
                    className="profileImage"
                  />
                )}
                <div className="sidAndMajor">
                  {user.department} <br />
                  {user.id}
                </div>
                <div className="name">{user.name}</div>
                {/* {club && (
                  <div className="clubInfo">
                    <div className="clubIntroduction">{club.introduction}</div>
                  </div>
                )} */}
              </div>
            </div>
            <div className="joinedClub">
              <div className="listBox">
                <div className="textMyPage">내가 가입한 동아리</div>

                <button
                  className="enterButton"
                  alt="Image"
                  onClick={handleJoinedClub}
                />
              </div>
            </div>
            <div className="requestStatus">
              <div className="listBox">
                <div className="textMyPage">동아리 가입 요청 현황</div>

                <button
                  className="enterButton"
                  alt="Image"
                  onClick={handleRequestStatus}
                />
              </div>
            </div>
            <div className="createClub">
              <div className="listBox">
                <div className="textMyPage">동아리 생성</div>

                <button
                  className="enterButton"
                  alt="Image"
                  onClick={handleCreateClub}
                ></button>
              </div>
            </div>

            <div className="logout">
              <div className="listBox">
                <div className="textMyPage">로그아웃</div>

                <button
                  className="enterButton"
                  alt="Image"
                  onClick={handleLogout}
                />
              </div>
            </div>
          </div>

          <div className="top">
            {/* <div className="view-7"> */}
            <button className="myPageY">
              마이페이지
              {/* <div className="text-wrapper-5">마이페이지</div> */}
            </button>
            {/* </div> */}

            <button
              className="home"
              alt="Image"
              onClick={handleHomeClick}
            ></button>
          </div>
          <button className="withdraw" onClick={handleWithdraw}>
            탈퇴하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default MyPage;
