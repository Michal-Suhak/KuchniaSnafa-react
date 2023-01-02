const Profile = () => {
  return (
    <img
      src="/profile_icon.png"
      alt="profile"
      width="50px"
      height="50px"
      style={{ marginRight: "15px", cursor: "pointer" }}
      onClick={() => console.log("profile click")}
    />
  );
};

export default Profile;
