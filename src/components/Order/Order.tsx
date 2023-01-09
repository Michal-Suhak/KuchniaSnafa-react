import { useState } from "react";
import { getCodes, postOrder } from "../../APICalls";
import { useAppSelector } from "../../Redux/hooks";
import "./style.css";

const Order = () => {
  const [validCode, setValidCode] = useState(false);
  const [codeValue, setCodeValue] = useState("");

  const user = useAppSelector((state) => state.user);

  const totalPrice = user.offers.reduce(
    (price, offer) => price + offer.price,
    0
  );

  const checkCode = (code: string) => {
    getCodes(code, setValidCode)
  };

  return (
    <div className="orderWrapper">
      <div className="productsList">
        {user.offers.map((offer) => (
          <div className="product" key={offer.id}>
            <p>
              <b>Dieta: </b>
              {offer.title}
            </p>
            <p>
              <b>Kaloryczność: </b>
              {offer.calories} Kcal
            </p>
            <p>
              <b>Cena: </b>
              {offer.price} PLN
            </p>
          </div>
        ))}
      </div>
      <div className="orderingWrapper">
        <div className="ordering">
          <p>
            <b>Suma Zamówienia: </b>
            {validCode ? totalPrice * 0.8 : totalPrice} PLN
          </p>
          <div className="formWrapper">
            <form className="form">
              <input
                type="text"
                placeholder="Kod promocyjny"
                onChange={(event) => setCodeValue(event.target.value)}
              />
              <button type="button" onClick={() => checkCode(codeValue)}>
                Dodaj kod
              </button>
              <button type="button" onClick={() => postOrder(user, totalPrice, validCode)}>
                Zamów
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
