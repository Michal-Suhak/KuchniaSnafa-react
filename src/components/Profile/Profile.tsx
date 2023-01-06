import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../Redux/hooks";

const Profile = () => {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user.userData);

  return (
    <img
      src="/profile_icon.png"
      alt="profile"
      width="50px"
      height="50px"
      style={{ marginRight: "15px", cursor: "pointer" }}
      onClick={() => navigate(user.id === undefined ? "login" : "profile")}
    />
  );
};

export default Profile;
