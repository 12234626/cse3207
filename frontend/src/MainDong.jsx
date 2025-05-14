import React from "react";
import "./MainDong.css";

function MainDong() {
  return (
    <div className="div-wrapper">
      <div className="div">
        <div className="image" />

        <div className="overlap">
          <div className="view">
            <div className="user" />
          </div>

          <div className="overlap-group">
            <div className="overlap-group-wrapper">
              <div className="overlap-group-2">
                <div className="text-wrapper">행사 게시판</div>
              </div>
            </div>

            <div className="overlap-wrapper">
              <div className="overlap-2">
                <div className="text-wrapper-2">동아리</div>
              </div>
            </div>

            <div className="view-2">
              <div className="view-3">
                <div className="overlap-group-3">
                  <div className="text-wrapper-3">모집중</div>
                </div>
              </div>

              <div className="view-4">
                <div className="overlap-3">
                  <div className="text-wrapper-4">분야:</div>

                  <div className="text-wrapper-5">연구</div>
                </div>
              </div>

              <div className="view-5">
                <div className="overlap-4">
                  <div className="text-wrapper-4">영역:</div>

                  <div className="text-wrapper-6">중앙동아리</div>
                </div>
              </div>

              <div className="view-6">
                <div className="overlap-5">
                  <div className="text-wrapper-7">동아리01</div>

                  <div className="text-wrapper-8">한줄소개</div>

                  <div className="view-7">
                    <div className="overlap-group-4">
                      <div className="text-wrapper-9">신청</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainDong;
