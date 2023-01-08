import React, { useState } from "react";
import { useAppSelector } from "../../Redux/hooks";
import "./styles.css";
import { useNavigate } from "react-router-dom";

const ShoppingCart = () => {
  const [visible, setVisible] = useState(false);
  const offers = useAppSelector((state) => state.user.offers);

  const navigate = useNavigate();

  const totalPrice = offers.reduce((price, offer) => price + offer.price, 0);

  return (
    <>
      <a className="checkoutButton">
        <img
          src="/cart_icon.png"
          alt="shoppingCart"
          width="30px"
          height="30px"
          onClick={() => setVisible(!visible)}
        />
      </a>

      {offers.length > 0 && !visible ? (
        <div className="itemsCount">
          <span>{offers.length > 9 ? "9+" : offers.length}</span>
        </div>
      ) : null}

      {offers.length > 0 && visible ? (
        <div
          className="shoppingCartWrapper"
          style={{ display: visible ? "flex" : "none" }}
        >
          {offers.map((offer) => (
            <div key={offer.id} style={{ padding: "0.25em" }}>
              {offer.title.toUpperCase()} <b>{offer.price} PLN\dzień</b>
            </div>
          ))}
          <div className="orderInfo">
            <div>
              SUMA: <b>{totalPrice} PLN\dzień</b>
            </div>
            <button
              onClick={() => {
                navigate("/podsumowanie");
                setVisible(false);
              }}
            >
              Złóż zamówienie
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ShoppingCart;
