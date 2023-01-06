import { useNavigate } from "react-router-dom";
import Profile from "../Profile/Profile";
import ShoppingCart from "../ShoppingCart/ShoppingCart";
import "./styles.css";

const NavBar = () => {
  const navigate = useNavigate();
  return (
    <div className="navbarWrapper">
      <a style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
        <h1>Kuchnia Snafa</h1>
      </a>
      <div className="iconsWrapper">
        <Profile />
        <ShoppingCart />
      </div>
    </div>
  );
};

export default NavBar;
