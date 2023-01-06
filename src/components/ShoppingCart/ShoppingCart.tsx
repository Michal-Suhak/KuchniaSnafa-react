import React, { useState } from "react";
import { useAppSelector } from "../../Redux/hooks";
import "./styles.css";
import { useNavigate } from "react-router-dom";

const ShoppingCart = () => {
  const [visible, setVisible] = useState(false);
  const offers = useAppSelector((state) => state.user.offers);

  const navigate = useNavigate();

  return (
    <div className="checkoutButton">
      <img
        src="/cart_icon.png"
        alt="shoppingCart"
        width="30px"
        height="30px"
        onClick={() => setVisible(!visible)}
      />
      <div style={{ display: visible ? "flex" : "none" }}>
        {offers.map((offer) => (
          <p key={offer.id}>{offer.title}</p>
        ))}
        <button onClick={() => navigate("/podsumowanie")}> podsumowanie</button>
      </div>
    </div>
  );
};

export default ShoppingCart;
