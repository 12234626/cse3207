import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Loginpage/Login";
import SignUp from "./Loginpage/SignUp";
import MainDong from "./MainDong";
import MainH from "./MainH";
import MyPage from "./MyPage";
import RequestList from "./RequestList";
import MyClubList from "./MyClubList";
import FixMemberInfo from "./FixMemberInfo";
import RequestStatus from "./RequestStatus";
import CreateClub from "./CreateClub";
import JoinedClub from "./JoinedClub";
import Manager from "./Manager";
import WriteHongboPost from "./WriteHongboPost";
import WriteClubInfoPost from "./WriteClubInfoPost";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/maindong" element={<MainDong />} />
      <Route path="/mainH" element={<MainH />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/requestlist" element={<RequestList />} />
      <Route path="/myclublist" element={<MyClubList />} />
      <Route path="/fixmemberinfo" element={<FixMemberInfo />} />
      <Route path="/requeststatus" element={<RequestStatus />} />
      <Route path="/createclub" element={<CreateClub />} />
      <Route path="/joinedclub" element={<JoinedClub />} />
      <Route path="/manager" element={<Manager />} />
      <Route path="/writehongbopost" element={<WriteHongboPost />} />
      <Route path="/writeclubinfopost" element={<WriteClubInfoPost />} />
    </Routes>
  );
}

export default App;
