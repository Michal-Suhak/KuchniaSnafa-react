import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppSelector } from "../../Redux/hooks";
import "./style.css";

const Order = () => {
  const [validCode, setValidCode] = useState(false);
  const [codeValue, setCodeValue] = useState("");
  const navigate = useNavigate();

  const user = useAppSelector((state) => state.user);

  const totalPrice = user.offers.reduce(
    (price, offer) => price + offer.price,
    0
  );

  const postOrder = () => {
    axios
      .post("http://localhost:3000/orders/", {
        userId: user.userData.id,
        order: user.offers,
        totalPrice: validCode ? totalPrice * 0.8 : totalPrice,
      })
      .then((response) => {
        toast.success("Zamówiono pomyślnie", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        response.status === 200 && navigate("/");
      });
  };

  const checkCode = (code: string) => {
    axios("http://localhost:3000/codes").then((response) => {
      if (response.data.includes(code)) {
        setValidCode(true);
      }
    });
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
              <button type="button" onClick={() => postOrder()}>
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
