import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./FixMemberInfo.css";

function FixMemberInfo() {
  const navigate = useNavigate();

  const [profileImage, setProfileImage] = useState(""); // 이미지 경로 상태 추가
  const [imageId, setImageId] = useState(null);
  const [form, setForm] = useState({
    id: "",
    name: "",
    password: "",
    department: "",
    phone: "",
  });

  // 기본 이미지 URL 가져오는 함수
  const getImageUrlById = (id) => {
    const timestamp = Date.now(); // 캐시 방지용
    if (id === 0 || id === null || id === undefined) {
      return "http://localhost:3000/public/images/default_profile.jpg";
    }
    return `http://localhost:3000/api/image?id=${id}`; // 또는 image_table의 url
  };

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData);
      setForm({
        id: user.id,
        name: user.name || "",
        password: user.password,
        department: user.department || "",
        phone: user.phone || "",
      });
      setImageId(user.image_id || 0); // 이미지 ID 설정
      // setProfileImage(getImageUrlById(user.image_id)); // 이미지 URL 설정
    }
  }, []);

  useEffect(() => {
    if (imageId !== null) {
      setProfileImage(getImageUrlById(imageId));
    }
  }, [imageId]);

  // 이미지 업로드 함수
  // async function handleImageUpload(file) {
  //   const formData = new FormData();
  //   formData.append("image", file);

  //   const res = await fetch("http://localhost:3000/api/upload", {
  //     method: "POST",
  //     body: formData,
  //   });
  //   const data = await res.json();
  //   if (res.ok && data.id && data.url) {
  //     return {
  //       imageId: data.id,
  //       imageUrl: data.url,
  //     };
  //   } else {
  //     alert("이미지 업로드 실패");
  //     return null;
  //   }
  // }

  // 예시: 파일 선택 핸들러
  // const handleFileChange = async (e) => {
  //   const file = e.target.files[0];
  //   if (!file) return;
  //    const imagePath = `/public/images/${file.name}`;
  //     const storedUser = JSON.parse(localStorage.getItem("user"));
  //     await fetch("http://localhost:3000/api/user", {
  //       method: "PUT",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         id: storedUser.id,
  //         name: form.name,
  //         password: storedUser.password,
  //         department: form.department,
  //         phone: form.phone,
  //         image_id: uploaded.imageId,
  //       }),
  //     });
  //     localStorage.setItem(
  //       "user",
  //       JSON.stringify({ ...storedUser, image_id: uploaded.imageId })
  //     );
  //   }
  // };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const imagePath = `/public/images/${file.name}`;

    try {
      // 1. 먼저 이미지 정보를 저장
      const res = await fetch("http://localhost:3000/api/image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ path: imagePath }),
      });

      const data = await res.json();
      if (res.ok && data.id) {
        setImageId(data.id);

        // 2. 회원정보 업데이트 (이미지 ID 제외)
        const storedUser = JSON.parse(localStorage.getItem("user"));
        const updateResponse = await fetch("http://localhost:3000/api/user", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: storedUser.id,
            name: form.name,
            password: storedUser.password,
            department: form.department,
            phone: form.phone,
          }),
        });

        if (updateResponse.ok) {
          // localStorage 업데이트
          localStorage.setItem(
            "user",
            JSON.stringify({ ...storedUser, image_id: data.id })
          );
          setProfileImage(getImageUrlById(data.id));
        } else {
          alert("회원정보 업데이트 실패");
        }
      } else {
        alert("이미지 정보 저장 실패");
      }
    } catch (error) {
      console.error("이미지 처리 오류:", error);
    }
  };

  const handleBackClick = () => {
    navigate("/MyPage");
  };

  // const handleFixClick = () => {
  //   navigate("/MyPage");
  // };

  const handleFixClick = async () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    try {
      const response = await fetch(`http://localhost:3000/api/user`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: storedUser.id,
          name: form.name,
          password: storedUser.password,
          department: form.department,
          phone: form.phone,
          image_id: imageId !== null ? imageId : storedUser.image_id,
        }),
      });

      if (response.ok) {
        const updateUser = {
          ...storedUser,
          name: form.name,
          department: form.department,
          phone: form.phone,
          image_id: imageId,
        };

        localStorage.setItem("user", JSON.stringify(updateUser));

        alert("회원 정보 수정 완료");

        navigate("/MyPage", { replace: true });
        // window.location.reload();
      } else {
        const data = await response.json();
        alert("수정 실패");
      }
    } catch (err) {
      console.error(err);
      alert("서버 오류");
    }
  };

  return (
    <div className="screen">
      <div className="phoneScreen">
        <div className="fixInfoMain">
          {/* <div className="view"> */}
          <div className="infoBox">
            {/* <input
              tyle="file"
              className="profileImage"
              src={handleFileChange}
            ></input> */}
            {/* 업로드된 이미지 미리보기 */}
            {/* {profileImage && (
              <img src={profileImage} alt="프로필" className="profileImage" />
            )} */}
            <div className="profileWrapper">
              <label htmlFor="profileUpload" className="profileCircle">
                <img src={profileImage} alt="프로필" className="profileImg" />
              </label>
              <input
                id="profileUpload"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
            </div>
            <div className="infoBox1">
              <div className="fixNameBox">
                <div className="fixText">이름</div>
                <input
                  type="text"
                  className="fNameInput"
                  name="name"
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, [e.target.name]: e.target.value })
                  }
                ></input>
              </div>
              <div className="fixMajorBox">
                <div className="fixText">학과</div>
                <input
                  type="text"
                  className="fMajorInput"
                  name="department"
                  value={form.department}
                  onChange={(e) =>
                    setForm({ ...form, [e.target.name]: e.target.value })
                  }
                ></input>
              </div>
              <div className="fixPhoneBox">
                <input
                  type="text"
                  className="fPhoneInput"
                  name="phone"
                  value={form.phone}
                  onChange={(e) =>
                    setForm({ ...form, [e.target.name]: e.target.value })
                  }
                ></input>
                <div className="fixText">전화번호</div>
              </div>
            </div>
          </div>
          {/* </div> */}
          <button className="overlap-group-wrapper" onClick={handleFixClick}>
            수정하기
            {/* <div className="overlap-group">
              수정하기
              <div className="text-wrapper-2">수정하기</div>
            </div> */}
          </button>
        </div>
        <div className="topBar">
          <button className="back" onClick={handleBackClick}></button>
          <div className="fixMemberInfoText">회원 정보 수정</div>
        </div>
      </div>
    </div>
  );
}

export default FixMemberInfo;
