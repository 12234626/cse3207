import React from "react";
import "./CreateClub.css";

function CreateClub() {
  return (
    <div className="div-wrapper">
      <div className="div">
        <div className="view">
          <div className="URL">
            <div className="overlap-group">
              <div className="text-wrapper">URL</div>
            </div>
          </div>

          <div className="overlap-wrapper">
            <div className="overlap">
              <div className="text-wrapper-2">글 작성</div>
            </div>
          </div>

          <div className=" overlap-group-wrapper">
            <div className="overlap-2">
              <div className="text-wrapper-3">+</div>
            </div>
          </div>

          <div className="view-2">
            <div className="overlap-group">
              <div className="text-wrapper-4">제목을 입력하세요</div>
            </div>
          </div>

          <div className="view-3">
            <div className="overlap-3">
              <div className="text-wrapper-5">정보</div>
              <div className="overlap-group-2">
                <div className="rectangle" />
                <div className="text-wrapper-6">행사</div>
              </div>
            </div>
          </div>

          <div className="view-4">
            <div className="overlap-4">
              <div className="text-wrapper-7">확인</div>
            </div>
          </div>
        </div>

        <div className="view-5">
          <div className="back"></div>
          <div className="text-wrapper-8">게시글 작성성</div>
        </div>
      </div>
    </div>
  );
}
export default CreateClub;
