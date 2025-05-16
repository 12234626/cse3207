import React from "react";
// import image2 from "./image-2.svg";
// import image3 from "./image-3.svg";
// import image4 from "./image-4.svg";
// import image5 from "./image-5.svg";
// import image6 from "./image-6.svg";
// import image from "./image.svg";
import "./MyPage.css";

function MyPage() {
  return (
    <div className="screen">
      <div className="overlap-wrapper">
        <div className="overlap">
          <div className="view">
            <div className="overlap-group-wrapper">
              <div className="overlap-group">
                <div className="text-wrapper">탈퇴</div>

                <div className="image" alt="Image" />
              </div>
            </div>

            <div className="div-wrapper">
              <div className="overlap-group">
                <div className="text-wrapper">문의사항</div>

                <div className="image" alt="Image" />
              </div>
            </div>

            <div className="div">
              <div className="overlap-group">
                <div className="text-wrapper">관리자 권한</div>

                <div className="image" alt="Image" />
              </div>
            </div>

            <div className="view-2">
              <div className="overlap-group">
                <div className="text-wrapper">동아리 가입 요청 현황</div>

                <div className="image" alt="Image" />
              </div>
            </div>

            <div className="view-3">
              <div className="overlap-group">
                <div className="text-wrapper">내가 가입한 동아리</div>

                <div className="image" alt="Image" />
              </div>
            </div>

            <div className="view-4">
              <div className="overlap-2">
                <div className="text-wrapper-2">회원 정보 수정</div>

                <div className="view-5" />

                <div className="text-wrapper-3">학번, 학과</div>

                <div className="text-wrapper-4">이름</div>
              </div>
            </div>
          </div>

          <div className="view-6">
            <div className="view-7">
              <div className="overlap-group-2">
                <div className="text-wrapper-5">마이페이지</div>
              </div>
            </div>

            <div className="img" alt="Image" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyPage;
