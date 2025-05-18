import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Loginpage/Login";
import SignUp from "./Loginpage/SignUp";
import MainDong from "./MainPage/MainDong";
import MainH from "./PromotionalBoard/MainH";
import MyPage from "./MyPage/MyPage";
import RequestList from "./Manager/RequestList";
import MyClubList from "./MyPage/MyClubList";
import FixMemberInfo from "./MyPage/FixMemberInfo";
import RequestStatus from "./MyPage/RequestStatus";
import CreateClub from "./MyPage/CreateClub";
import JoinedClub from "./MyPage/JoinedClub";
import Manager from "./Manager/Manager";
import WriteHongboPost from "./Manager/WriteHongboPost";
import WriteClubInfoPost from "./Manager/WriteClubInfoPost";
import MemberList from "./Manager/MemberList";

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
      <Route path="/memberlist" element={<MemberList />} />
    </Routes>
  );
}

export default App;
