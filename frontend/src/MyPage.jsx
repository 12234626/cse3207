import React from "react";
// import image2 from "./image-2.svg";
// import image3 from "./image-3.svg";
// import image4 from "./image-4.svg";
// import image5 from "./image-5.svg";
// import image6 from "./image-6.svg";
// import image from "./image.svg";
import { useNavigate } from "react-router-dom";
import "./MyPage.css";

function MyPage() {
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

            <div className="createClub">
              <div className="listBox">
                <div className="textMyPage">동아리 생성</div>

                <button
                  className="enterButton"
                  alt="Image"
                  onClick={handleCreateClub}
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

            <div className="fixMemberInfo">
              <div className="fixMemberInfo1">
                <div className="fixInfoButton" onClick={handleFixInfoButton}>
                  회원 정보 수정
                </div>

                <div className="profileImage" />

                <div className="sidAndMajor">학번, 학과</div>

                <div className="name">이름</div>
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
        </div>
      </div>
    </div>
  );
}

export default MyPage;
