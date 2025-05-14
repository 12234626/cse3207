import React from "react";
import image2 from "./image-2.svg";
import image3 from "./image-3.svg";
import image4 from "./image-4.svg";
import image5 from "./image-5.svg";
import image6 from "./image-6.svg";
import image from "./image.svg";
import "./Mypage.css";

function Mypage(){
  return (
    <div className="screen">
      <div className="overlap-wrapper">
        <div className="overlap">
          <div className="view">
            <div className="overlap-group-wrapper">
              <div className="overlap-group">
                <div className="text-wrapper">탈퇴</div>

                <img className="image" alt="Image" src={image5} />
              </div>
            </div>

            <div className="div-wrapper">
              <div className="overlap-group">
                <div className="text-wrapper">문의사항</div>

                <img className="image" alt="Image" src={image4} />
              </div>
            </div>

            <div className="div">
              <div className="overlap-group">
                <div className="text-wrapper">관리자 권한</div>

                <img className="image" alt="Image" src={image3} />
              </div>
            </div>

            <div className="view-2">
              <div className="overlap-group">
                <div className="text-wrapper">동아리 가입 요청 현황</div>

                <img className="image" alt="Image" src={image2} />
              </div>
            </div>

            <div className="view-3">
              <div className="overlap-group">
                <div className="text-wrapper">내가 가입한 동아리</div>

                <img className="image" alt="Image" src={image} />
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

            <img className="img" alt="Image" src={image6} />
          </div>
        </div>
      </div>
    </div>
  );
};