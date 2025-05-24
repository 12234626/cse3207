import React, { useState } from "react";
import axios from "axios";
import "./ImageTest.css";

function ImageTest() {
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!image) {
      alert("이미지를 선택해주세요.");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    try {
      const res = await axios.post("http://localhost:3000/api/image_upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("업로드 성공! 이미지 URL: " + res.data.url);
    } catch (err) {
      console.error("업로드 실패:", err);
      alert("업로드 중 오류 발생");
    }
  };

  return (
    <div className="upload-container">
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {previewUrl && <img src={previewUrl} alt="미리보기" className="preview" />}
      <button onClick={handleUpload}>이미지 업로드</button>
    </div>
  );
}

export default ImageTest;
